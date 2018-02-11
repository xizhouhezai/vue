<template>
  <div class="hello">
    <h1>群聊</h1>
    <div class="send">
        输入:<input type="text" id="msginput">
        <button id="msgbtn">发送</button>
    </div>
    <div id="showbox"></div>
  </div>
</template>

<script>
import * as io from 'socket.io-client'
const socket = io.connect('http://localhost:3003')

export default {
  name: 'HelloWorld',
  data () {
    return {
      id: ''
    }
  },
  mounted () {
    let msginput = document.getElementById('msginput')
    let btn = document.getElementById('msgbtn')
    let showbox = document.getElementById('showbox')
    btn.addEventListener('click', (event) => {
      let msg = msginput.value
      let data = {msg: msg}
      socket.emit('sendMessage', data)
    })
    socket.on('receiveMessage', (data) => {
      console.log('收到')
      let message = document.createElement('div')
      message.innerHTML = `${data.id}: ${data.msg}`
      showbox.appendChild(message)
    })
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
.send {
  width: 30%;
  float: left
}
#showbox {
  width: 65%;
  float: right
}
</style>
