
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/view')
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
          localStorage.removeItem('jwt')
          next('/')
      }
  },
  ]
})
