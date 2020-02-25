
import Login from '@/view/auth/Login'
// import { store } from '@/setup'

export default {
  path: '/login',
  name: 'login',
  component: Login
  // beforeEnter: async (to, from, next) => {
  //   await store.dispatch('update')
  //   const { isAuth } = store.getters
  //   isAuth ? next('/profile')
  //     : next()
  // }

}
