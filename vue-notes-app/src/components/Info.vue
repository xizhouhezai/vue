<template>
  <div id="info">
    <div class="alert" @click="Infomation">alert</div>
  </div>
</template>

<script>
  import Notyf from 'notyf'
  import 'notyf/dist/notyf.min.css'

  let notyf = new Notyf()
  export default {
    methods: {
      Infomation () {
        notyf.alert('Please fill out the form')
      }
    }
  }
</script>
