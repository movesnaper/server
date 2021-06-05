
import Home from '@/view/Home'
import store from '@/setup/store-setup'

export default {
  path: '/',
  name: 'home',
  component: Home,
  beforeEnter: async (to, from, next) => {
    // store.dispatch('updateDbs')
    await store.dispatch('updateUser')
    next()
  }
}
