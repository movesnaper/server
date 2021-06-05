import Lombards from '@/view/Lombards.vue'
import store from '../setup/store-setup'

export default {
  path: '/lombards',
  name: 'lombards',
  component: Lombards,
  beforeEnter: async (to, from, next) => {
    // store.dispatch('updateDbs')
    const user = await store.dispatch('updateUser')
    !user ? next('/') : next()
  }
}
