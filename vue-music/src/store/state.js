import {playMode} from 'common/js/config'
import {localsearch} from 'common/js/cache'
/**
 * @param {boolean} playing 播放状态
 * @param {boolean} fullScreen 播放器是否充满屏幕
 * @param {array} playlist 播放列表
 * @param {array} sequenceList
 * @param {number} mode 播放的方式
 */
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  mode: playMode.sequence,
  playlist: [],
  sequenceList: [],
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: localsearch()
}

export default state