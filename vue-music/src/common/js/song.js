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
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
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