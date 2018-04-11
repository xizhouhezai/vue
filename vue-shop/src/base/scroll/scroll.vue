<template>
  <div ref="wrapper" class="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    // 是否触发滚动时间
    probeType: {
      type: Number,
      default: 1
    },
    // 是否监听滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        scrollY: true, // 滚动方向为Y轴
        click: true, // 是否派发click事件，通常判断浏览器派发的click还是betterscroll派发的click，可以用event._constructed，若是bs派发的则为true
        momentum: true, // 当快速滑动时是否开启滑动惯性
        bounce: false, // 是否启用回弹动画效果
        bounceTime: 700, // 弹力动画持续的毫秒数
        deceleration: 0.001, // 滚动动量减速越大越快，建议不大于0.01
        momentumLimitTime: 300, // 符合惯性拖动的最大时间
        momentumLimitDistance: 15, // 符合惯性拖动的最小拖动距离
        resizePolling: 60 // 重新调整窗口大小时，重新计算better-scroll的时间间隔
      })
      // 监听滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
    },
    // 滚向某个位置
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    // 滚向某个元素
    scrollToElement () {
      // arguments是传进来的参数列表，apply把arguments绑定到this.scroll.scrollToElement的参数列表上
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    // 刷新滚动视图
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.scroll
  position fixed
  top 50px
  bottom 0
  width 100%
  overflow hidden
</style>
