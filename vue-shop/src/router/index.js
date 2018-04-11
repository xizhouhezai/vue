import Vue from 'vue'
import Router from 'vue-router'
import goodList from '@/components/good-list/good-list'
import Home from '@/components/home/home'
import City from '@/components/city/city'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/goods',
      component: goodList
    },
    {
      path: '/city',
      component: City
    }
  ]
})
