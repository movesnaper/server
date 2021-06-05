
import Profile from '@/view/profile/index.vue'
import store from '../setup/store-setup'

export default {
  path: '/profile',
  name: 'profile',
  component: Profile,
  beforeEnter: async (to, from, next) => {
    // store.dispatch('updateDbs')
    const user = await store.dispatch('updateUser')
    !user ? next('/') : next()
  }
}
