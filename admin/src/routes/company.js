
import store from '../setup/store-setup'

export default {
  path: '/company',
  component: () => import('@/view/company/index.vue'),
  name: 'company',
  beforeEnter: async (to, from, next) => {
    const user = await store.dispatch('updateUser')
    !user ? next('/') : next()
  }
}