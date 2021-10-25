import store from '../setup/store-setup'

export default {
  path: '/report/:key?/:period?',
  name: 'report',
  component: () => import('@/view/reports'),
  beforeEnter: async (to, from, next) => {
    const user = await store.dispatch('updateUser')
    !user ? next('/') : next()
  }
}
