<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1 ref="nums">{{getCount}}</h1>
    <div @click="add">add</div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapGetters([
      'getCount'
    ])
  },
  methods: {
    ...mapMutations({
      increment: 'increment'
    }),
    add () {
      this.increment(this.$refs.nums.textContent)
      console.log(this.$refs.nums.textContent)
    }
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
  color: #42b983;
}
</style>
