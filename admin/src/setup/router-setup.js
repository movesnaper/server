
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/routes/login'
import register from '@/routes/register'
import company from '@/routes/company'
import lombard from '@/routes/lombard'
import user from '@/routes/user'
import home from '@/routes/home'
import lombards from '@/routes/lombards'
import users from '@/routes/users'
import reports from '@/routes/reports'

Vue.use(Router)

const routes = [
  login,
  register,
  company,
  lombard,
  user,
  home,
  lombards,
  users,
  reports
]

export default new Router({
  mode: 'history',
  routes
})
