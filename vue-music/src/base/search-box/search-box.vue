<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder" />
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: ''
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    created() {
      // 把query以事件的参数暴露出去
      this.$watch('query', (newQuery) => {
        this.$emit('query', newQuery)
      })
    },
    methods: {
      // 清空搜索框的内容
      clear() {
        this.query = ''
      },
      // 组件扩展方法
      setQuery(query) {
        this.query = query
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
