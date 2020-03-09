
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/routes/login'
import register from '@/routes/register'
import profile from '@/routes/profile'
import lombard from '@/routes/lombard'
import user from '@/routes/user'

Vue.use(Router)

const routes = [
  login,
  register,
  profile,
  lombard,
  user
  // {
  //   path: '*',
  //   redirect: '/login'
  // }
]

export default new Router({
  mode: 'history',
  routes
})
