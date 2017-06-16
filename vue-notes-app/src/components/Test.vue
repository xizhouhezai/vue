<template>
  <div id="article">
    <div v-if="isActive">
      <img src="/static/images/loading.gif" alt="picture">
    </div>
    <div v-html="article" v-show="!isActive">
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        article: [],
        isActive: true
      }
    },
    mounted () {
      this.getArticle()
    },
    methods: {
      getArticle: function () {
        let that = this
        let id = that.$route.params.id.substring(3)
        let url = 'http://127.0.0.1:8088/articles?expand=content&id=' + id
        if (this.article.length === 0) {
          this.isActive = true
        }
        that.$http.get(url).then((data) => {
          that.article = data.body.items[0].content
          // console.log(that.article)
          // console.log(that.article.length)
          if (this.article.length !== 0) {
            this.isActive = false
          }
        })
      }
    }
  }
</script>
