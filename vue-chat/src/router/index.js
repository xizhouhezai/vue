import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import chatGroup from '@/components/chat-group/chat-group'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/chatgroup',
      component: chatGroup
    }
  ]
})
