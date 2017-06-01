<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="isActive">
       <a href="javascript: void(0)" v-for="article in articleId" @click="skipArt(article.id)" v-text="article.id + article.title"></a>
    </div>
    <div v-html="article" v-show="!isActive"></div>
    <h2>{{count}}</h2>
    <h3>{{doneTodos}}</h3>
    <Test></Test>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      articleId: [],
      id: '',
      article: [],
      isActive: true
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
    this.getArticle()
    console.log(this.id)
  },
  methods: {
    skipArt: function (id) {
      let url = '/id=' + id
      this.$router.push({path: url})
      this.isActive = false
    },
    getArticleId: function () {
      let that = this
      let url = 'http://127.0.0.1:8088/articles?cid=35'
      that.$http.get(url).then((data) => {
        that.articleId = data.body.items
      })
    },
    getArticle: function () {
      let that = this
      let url = 'http://127.0.0.1:8088/articles?expand=content&id=' + that.id
      that.$http.get(url).then((data) => {
        that.article = data.body.items.content
        // console.log(data.body.items.content)
      })
    },
    increment: () => {
      this.$store.commit('increment', {amount: Number(this.$route.params.id.substring(3))})
    }
  },
  watch: {
    $route: {
      handler: function (val, oldval) {
        let that = this
        that.id = val.path.substring(4)
        console.log(that.id)
        let url = 'http://127.0.0.1:8088/articles?expand=content&id=' + that.id
        console.log(url)
        that.$http.get(url).then((data) => {
          that.article = data.body.items[0].content
        })
      },
      deep: true
    }
  },
  components: {
    Test: () => import('@/components/Test')
  }
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
