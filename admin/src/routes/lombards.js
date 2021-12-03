import Lombards from '@/view/Lombards.vue'
import store from '../setup/store-setup'

export default {
  path: '/lombard',
  component: Lombards,
  beforeEnter: async (to, from, next) => {
    const user = await store.dispatch('updateUser')
    !user ? next('/') : next()
  }
}
