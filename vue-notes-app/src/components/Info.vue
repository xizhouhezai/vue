<template>
  <div id="info">
    <button class="alert" @click="Infomation">alert</button>
    <div>
      <img v-for="src in Img" v-bind:src="src" alt="">
    </div>
  </div>
</template>

<script>
  import Notyf from 'notyf'
  import 'notyf/dist/notyf.min.css'

  let notyf = new Notyf({
    delay: 4000,
    alertIcon: 'fa fa-exclamation-circle',
    comfirmIcon: 'fa fa-check-circle'
  })
  export default {
    data () {
      return {
        Img: []
      }
    },
    mounted () {
      this.getImg()
    },
    methods: {
      Infomation () {
        notyf.confirm('Please fill out the form')
      },
      getImg () {
        let that = this
        let url = 'http://localhost:3000/'
        that.$http.get(url).then((data) => {
          that.Img = JSON.parse(data.body.message)
          console.log(that.Img)
          // for (var i = 0; i < that.Img.length; i++) {
          //   console.log(that.Img[i])
          // }
        })
      }
    }
  }
</script>
