<template>
  <div class="home">
    <m-header></m-header>
    <h1 @click="selectCity">选择城市</h1>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import axios from 'axios'

export default {
  name: 'home',
  mounted () {
    this.getSinger()
  },
  methods: {
    selectCity () {
      this.$router.push('/city')
    },
    getSinger () {
      axios.get('http://localhost:9999/singer?page=1').then((res) => {
        if (res.status === 200) {
          console.log(res.data)
        }
      })
    }
  },
  components: {
    MHeader
  }
}
</script>
