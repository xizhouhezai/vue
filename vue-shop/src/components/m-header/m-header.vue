<template>
  <div class="header">
    <div class="nav">
      <div class="logo">
        <img src="@/common/images/logo1.png">
      </div>
      <div class="cart-container">
        <div class="login">
          <span>Login</span>
        </div>
        <div class="cart">
          <i class="icon iconfont icon-gouwuche"></i>
        </div>
      </div>
    </div>
    <div class="bread">
      <span>Home</span>
      <span> / </span>
      <span>{{path}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      path: this.$route.fullPath.slice(1)
    }
  },
  mounted () {
    console.log(this.$route.fullPath)
  },
  watch: {
    $route: {
      handler: function (val, oldval) {
        if (val) {
          this.path = val.fullPath.slice(1)
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .header
    overflow: hidden
    background: #fff
    .nav
      overflow: hidden
      .logo
        float: left
      .cart-container
        float: right
        display: flex
        height: 83px
        padding-right: 40px
        align-items: center;
        justify-content: space-between;
        .login
          flex: 1
          padding-right: 15px
          font-size: 16px
        .cart
          flex: 1
          .icon
            color: green;
            font-size: 30px;
    .bread
      height: 60px
      line-height: 60px
      padding-left: 20px
      background: #f0f0f0
      font-size: 14px
      color: #a1a1a1
</style>
