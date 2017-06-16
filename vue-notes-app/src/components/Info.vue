<template>
  <div id="info">
    <button class="alert" @click="Infomation">alert</button>
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
    methods: {
      Infomation () {
        notyf.confirm('Please fill out the form')
      }
    }
  }
</script>
