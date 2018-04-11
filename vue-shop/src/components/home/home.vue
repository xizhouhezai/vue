<template>
  <div class="home">
    <m-header></m-header>
    <h1 @click="selectCity">选择城市</h1>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
export default {
  name: 'home',
  methods: {
    selectCity () {
      this.$router.push('/city')
    }
  },
  components: {
    MHeader
  }
}
</script>
