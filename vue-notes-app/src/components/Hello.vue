<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
       <a href="javascript: void(0)" v-for="article in articleId" @click="skipArt(article.id)" v-text="article.id + article.title"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      articleId: [],
      id: ''
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    },
    doneTodos () {
      return this.$store.getters.doneTodos
    }
  },
  created () {
    this.getArticleId()
  },
  methods: {
    skipArt: function (id) {
      let url = '/article/id=' + id
      this.$router.push({path: url})
    },
    getArticleId: function () {
      let that = this
      let url = 'http://127.0.0.1:8088/articles?cid=35'
      that.$http.get(url).then((data) => {
        that.articleId = data.body.items
      })
    }
  }
  // watch: {
  //   // 深度监听路由的参数变化
  //   // 问题：
  //     // 1.刷新页面，页面回到初始页面，
  //     //  2.浏览器返回，返回路由的上级参数页面，非初始页面
  //   $route: {
  //     handler: function (val, oldval) {
  //       let that = this
  //       that.id = val.path.substring(4)
  //       that.getArticle(that.id)
  //     },
  //     deep: true
  //   }
  // },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  display: block;
  text-align: center;
  color: #42b983;
}
</style>
