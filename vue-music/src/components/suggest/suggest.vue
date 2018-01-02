<template>
  <scroll ref="suggest" 
          class="suggest" 
          :data="result"
          @scrollToEnd="searchMore"
          :pullup="pullup"
          >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="loading" title=""></loading>
    </ul>
  </scroll>
</template>

<script>
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSongs} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import {mapMutations} from 'vuex'

  const perpage = 20
  const TYPE_SINGER = 'singer'

  export default {
    data() {
      return {
        page: 1,
        result: [],
        pullup: true,
        // 初始化是否有更多数据
        hasMore: true,
        loading: false
      }
    },
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    methods: {
      // 点击跳转的方法
      selectItem(item) {
        // 如果搜索是歌手
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        }
      },
      // 判断这个返回数据是一个歌手还是歌曲
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      // 监听是否滚动到底部的事件,并判断是否加载更多数据
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.loading = true
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._getResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      // 检查有没有更多数据
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
          this.hasMore = false
          this.loading = false
        }
      },
      _search() {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._getResult(res.data)
            this._checkMore(res.data)
          }
        })
      },
      _getResult(data) {
        let ret = []
        if (data.zhida && data.zhida.type) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      // 处理data.song.list的singer
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          if (item.songid && item.albummid) {
            ret.push(createSongs(item))
          }
        })
        return ret
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    watch: {
      query(newQuery) {
        this._search()
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
