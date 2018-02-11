<template>
  <div class="child_page">
    <div class="login">
      <div class="useid">
        <div class="mark">帐号</div>
        <div class="input_mark"><input type="text" placeholder="微信号(随便输入)" v-model="inputaccounts" ref="inputaccounts"/></div>
        <span>{{inputaccounts}}</span>
      </div>
      <div class="useid">
        <div class="mark">密码</div>
        <div class="input_mark"><input type="password" placeholder="密码(随便输入)" maxlength="16" v-model="inputcode" /></div>
      </div>
      <div class="login_botton" @click="send">
        登 录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputaccounts: '',
      inputcode: ''
    }
  },
  created () {
    console.log(this.inputaccounts)
  },
  methods: {
    send () {
      
    }
  }
}
</script>

<style lang="css" ref="stylesheet/css" scoped>
.child_page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 203;
  background-color: #fff;
}
.login {
  padding-top: 2.6rem;
  width: 18.3786666667rem;
  margin: 0 auto;
}
.useid {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d4d4d4;
  align-items: center;
  justify-content: space-between;
}
.useid .mark {
  font-size: 0.64rem;
  color: #333;
  letter-spacing: 0.5546666667rem;
  line-height: 2.0266666667rem;
  padding-left: 0.4266666667rem;
}
.useid .input_mark {
  margin-right: 0.34rem;
  margin-left: 1rem;
  width: 9.1rem;
  height: 2.02667rem;
}
.login .useid .input_mark input {
  display: inline-block;
  width: 9.1rem;
  line-height: 2rem;
  border: none;
  font-size: 0.64rem;
  color: #333;
}
.login .login_botton {
  margin-top: 1.536rem;
  text-align: center;
  background: #1aad19;
  border: 1px solid #179e16;
  border-radius: 5px;
  line-height: 1.6rem;
  font-size: 0.7rem;
  color: #fff;
}
</style>
