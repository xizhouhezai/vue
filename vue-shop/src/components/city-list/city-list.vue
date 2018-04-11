<template>
  <div class="lists">
    <div v-for="(list, index) in citylist" :key="index">
      <p class="city-title">{{list[0]}}</p>
      <city-item :cityItemList="list[1]"></city-item>
    </div>
  </div>
</template>

<script>
import CityItem from '@/base/city-item/city-item'

export default {
  props: {
    citylist: {
      type: Array,
      default: null
    }
  },
  components: {
    CityItem
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.lists
  width 100%
  background #fff
  div
    .city-title
      height 30px
      border-top 1px solid #ccc
      background #f0efed
      line-height 29px
      padding-left 10px
      box-sizing border-box
</style>
