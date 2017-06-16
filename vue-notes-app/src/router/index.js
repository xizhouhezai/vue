import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
// import Hello from '@/components/Hello'
// import Test from '@/components/Test'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: resolve => require(['@/components/Hello'], resolve)
    },
    {
      path: '/article/:id',
      component: resolve => require(['@/components/Test'], resolve)
    },
    {
      path: '/info',
      component: resolve => require(['@/components/Info'], resolve)
    }
  ]
})
