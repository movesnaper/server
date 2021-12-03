import Main from '@/view/settings/Main'
import store from '../setup/store-setup'

export default {
  path: '/lombard/:id',
  component: Main,
  beforeEnter: async (to, from, next) => {
    const user = await store.dispatch('updateUser')
    !user ? next('/') : next()
  }
}
