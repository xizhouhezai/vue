<template>
  <div class="header">
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
</template>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .header
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
</style>
