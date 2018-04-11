<template>
  <div class="search-box">
    <div class="ipt-box">
      <input type="text" class="ipt" placeholder="城市名称/拼音" />
      <div class="icon-box">
        <i class="iconfont icon-sousuo icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/css.styl'

.search-box
  height 50px
  background $color-background
  display flex
  flex-direction column
  justify-content center
  align-items center
  .ipt-box
    width 80%
    position relative
    .ipt
      display block
      width 100%
      height 40px
      border none
      outline none
      border-radius 20px
      box-sizing border-box
      padding-left 40px
      line-height 40px
      font-size $font-size-l
    .icon-box
      position absolute
      top 0
      left 0
      z-index 50
      width 40px
      height 40px
      line-height 40px
      text-align center
      .icon
        font-size 22px
        font-weight 900
        color #4395ff
</style>
