import Login from '@/view/auth/Login'
import store from '../setup/store-setup'

export default {
  path: '/login',
  name: 'login',
  component: Login,
  beforeEnter: async (to, from, next) => {
    // store.dispatch('updateDbs')
    const user = await store.dispatch('updateUser')
    user ? next('/profile') : next()
  }

}
