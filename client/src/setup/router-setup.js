
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/routes/login'
import register from '@/routes/register'
import home from '@/routes/home'

Vue.use(Router)

const routes = [
  login,
  register,
  home,
]

export default new Router({
  mode: 'history',
  routes
})
