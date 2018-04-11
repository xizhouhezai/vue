<template>
  <div class="listbox">
    <p class="city-item" v-for="item in cityItemList" :key="item.id">{{item.name}}</p>
  </div>
</template>

<script>
export default {
  props: {
    cityItemList: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.listbox
  width 100%
  background #fff
  .city-item
    background #fff
    margin 0px 10px
    height 35px
    line-height 35px
    border-bottom 1px solid #ccc
    box-sizing border-box
  .city-item:last-child
    border none
</style>
