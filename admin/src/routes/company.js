
import store from '../setup/store-setup'

export default {
  path: '/company',
  component: () => import('@/view/company/index.vue'),
  name: 'company',
  children: [
    { path: '/company',  component: () => import('@/view/company/company')},
    { path: '/company/accounts',  component: () => import('@/view/company/accounts')},
    { path: '/company/price',  component: () => import('@/view/company/price')},
    { path: '/company/reestr',  component: () => import('@/view/company/reestr')},
  ],
  beforeEnter: async (to, from, next) => {
    const user = await store.dispatch('updateUser')
    !user ? next('/') : next()
  }
}