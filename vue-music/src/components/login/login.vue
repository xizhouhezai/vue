<template>
  <div class="login">
    <div class="login-box">
      <h1 class="login-title">登录</h1>
      <mt-field label="用户名" placeholder="请输入用户名"></mt-field>
      <wing-space></wing-space>
      <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
      <wing-space></wing-space>
      <mt-button size="large" @click="login" type="primary">登录</mt-button>
    </div> 
  </div>
</template>

<script>
import { Toast, Button, Field, IndexList } from 'mint-ui'
import WingSpace from 'base/wing-space/wing-space'
import { mapMutations } from 'vuex'

const MtButton = Button
const MtField = Field

export default {
  methods: {
    myToast() {
      Toast('提示信息')
    },
    login() {
      this.setIsAuth(true)
      this.$router.push('/recommend')
    },
    ...mapMutations({
      setIsAuth: 'SET_IS_AUTH'
    })
  },
  mounted() {},
  components: {
    MtButton,
    MtField,
    IndexList,
    WingSpace
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .login
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background: #fff
    color: #000
    .login-box
      padding: 0 20px
      .login-title
        padding: 20px
        text-align: center
        font-size: 20px
        font-weight: bolder

  .red
    color: red;
  .green
    color: green;
  .weui-label
    color: #000
</style>
