import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Songs {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        }
      })
    })
  }
}

// 在这里直接实例一个songs类，工厂包装
export function createSongs(musicData) {
  return new Songs({
    id: musicData.songid,
    mid: musicData.songmid,
    // 歌手可能不唯一，是个数组，处理歌手数组
    singer: filtersSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    // 歌曲播放时间长度
    duration: musicData.interval,
    // 歌曲封面图片
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // 歌曲播放地址
    url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=38`
  })
}

// 处理歌手数组的方法
function filtersSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}