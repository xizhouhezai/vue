<template>
  <h1>{{count}}</h1>
</template>

<script>
  export default {
    computed: {
      count () {
        return this.$store.state.count
      }
    }
  }
</script>
