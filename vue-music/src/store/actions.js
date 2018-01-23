import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/cache'

/**
 * 查找索引的方法
 * @param {object} list
 * @param {object} song
 * @returns {string} 返回索引
 */
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_PLAYING_STATE, true)
}

// 搜索列表点击歌曲播放的方法
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  // let sequenceList = state.sequenceList.slice()
  let currentIndex = parseInt(state.currentIndex)

  // 记录当前播放歌曲
  // let currentSong = playlist[currentIndex]

  // 查询播放列表中是否有这首歌曲
  let fpIndex = findIndex(playlist, song)

  // 因为要插入歌曲，所以索引要加一
  currentIndex++
  // 插入歌曲到当前索引
  playlist.splice(currentIndex, 0, song)
  // 如果列表中存在插入歌曲，则删除原来的歌曲
  if (fpIndex > -1) {
    // 如果要删除的歌曲的Index小于正在播放的歌曲的Index，则直接删除,如果大于，则要在fpIndex加一，删除
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, playlist)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYING_STATE, true)
}

// 保存搜索历史
export function saveSearchHistory({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 删除搜索历史
export function deleteSearchHistory({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 删除所有搜索历史
export function clearSearchHistory({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// 删除playlist列表的歌曲
export function deleteSong({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = parseInt(state.currentIndex)

  const pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  const sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  // 判断当前播放的列表索引大于删除歌曲索引或者
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  // 如果列表删除完了，则将播放状态设为false
  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

// 删除palylist所有歌曲

export function deleteSongList({commit}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
  commit(types.SET_CURRENT_INDEX, -1)
}
