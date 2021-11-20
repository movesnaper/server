
import store from '@/setup/store-setup'
export default {
  path: '/program',
  name: 'program',
  component: () => import('@/view/program'),
  beforeEnter: async (to, from, next) => {
    await store.dispatch('updateUser')
    next()
  }
}
