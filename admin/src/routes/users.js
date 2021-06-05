import Users from '@/view/Users.vue'
import store from '../setup/store-setup'

export default {
  path: '/users',
  name: 'users',
  component: Users,
  beforeEnter: async (to, from, next) => {
    // store.dispatch('updateDbs')
    const user = await store.dispatch('updateUser')
    !user ? next('/') : next()
  }
}
