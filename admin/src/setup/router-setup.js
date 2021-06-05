
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/routes/login'
import register from '@/routes/register'
import profile from '@/routes/profile'
import lombard from '@/routes/lombard'
import user from '@/routes/user'
import home from '@/routes/home'
import dbs from '@/routes/dbs'
import lombards from '@/routes/lombards'
import users from '@/routes/users'

Vue.use(Router)

const routes = [
  login,
  register,
  profile,
  lombard,
  user,
  home,
  dbs,
  lombards,
  users
]

export default new Router({
  mode: 'history',
  routes
})
