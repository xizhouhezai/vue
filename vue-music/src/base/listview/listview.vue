<template>
  <scroll class="listview"
          :data="data"
          ref="listview"
          @scroll="scroll"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          >
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li v-for="item in group.items" class="list-group-item" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove="onShortcutTouchMove">
      <ul>
        <li
          class="item"
          v-for="(item, index) in shortcutList"
          :data-index="index"
          :class="{'current': currentIndex === index}"
          >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="listTilte">
      <div class="fixed-title">
        {{listTilte}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'

  const ANCHOR_HEIGHT = 18

  export default {
    created() {
      // scroll的依赖组件better-scroll的属性，为3是会实时监听滚动
      this.probeType = 3
      // 用于存放shortcut的y轴位置
      this.touch = {}
      // scroll的依赖组件better-scroll的属性，为true时就会监听scroll的滚动
      this.listenScroll = true
      this.listHeight = []
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0
      }
    },
    // 计算属性
    computed: {
      // 获得listview的data.title
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      // 获取listtitle
      listTilte() {
        if (this.scrollY > 0) {
          return
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      // 基础组件只派发一个点击事件，不处理业务逻辑
      selectItem(item) {
        this.$emit('select', item)
      },
      // shortcut的触摸事件，当点击某个字母时，就索引到那个歌手组
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      // shortcut的触摸事件，当滚动shortcut时，歌手组随着滚动
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      // 监听listview滚动
      scroll(pos) {
        this.scrollY = pos.y
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      // 提取的跳转方法
      _scrollTo(index) {
        console.log(index)
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scroll.scrollToElement(this.$refs.listGroup[index], 0)
      },
      // 获取每一个listgroup的高度
      _calculateHeight() {
        this.listHeight = []
        let height = 0
        this.listHeight.push(height)
        const list = this.$refs.listGroup
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当列表滚动到顶部
        if (newY > 0) {
          this.currentIndex = 0
          return
        }

        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if ((-newY >= height1) & (-newY < height2)) {
            this.currentIndex = i
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = this.listHeight.length - 2
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: -2px
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
