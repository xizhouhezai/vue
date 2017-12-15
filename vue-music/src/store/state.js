/**
 * @param playing 播放状态
 * @param fullScreen 播放器是否充满屏幕
 * @param playlist 播放列表
 * @param sequenceList
 */
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  currentIndex: -1,
  disc: {},
  topList: {}
}

export default state