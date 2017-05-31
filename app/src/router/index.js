import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import members from '@/members/members'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/members',
      name: 'Members',
      component: members
    }
  ]
})
