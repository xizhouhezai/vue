<template>
  <div id="app">
    <m-header/>
    <router-view/>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
export default {
  name: 'App',
  components: {
    MHeader
  }
}
</script>

<style>
#app {
  max-width: 1280px;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
