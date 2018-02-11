<template>
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isAuth'
    ])
  },
  mounted() {
    if (!this.isAuth) {
      this.$router.push('/login')
    }
  },
  watch: {
    $route (newVal, oldVal) {
      if (!this.isAuth) {
        this.$router.push('/login')
      }
    }
  }
}
</script>
