<template>
  <div id="app">
    <auth-route></auth-route>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
import AuthRoute from 'components/auth-route/auth-route'

export default {
  name: 'app',
  components: {
    MHeader,
    Tab,
    Player,
    AuthRoute
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  
</style>
