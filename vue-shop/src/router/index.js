import Vue from 'vue'
import Router from 'vue-router'
import goodList from '@/components/good-list/good-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: goodList
    }
  ]
})
