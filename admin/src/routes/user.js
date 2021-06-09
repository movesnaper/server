import User from '@/view/user'
// import { Main, Passport } from '@/view/user-settings'
import store from '../setup/store-setup'

export default {
  path: '/user/:id',
  component: User,
  // children: [
  //   { path: '', redirect: 'settings/main' },
  //   { path: 'settings/main', component: Main, meta: { current: 'settings'} },
  //   { path: 'settings/passport', component: Passport, meta: { current: 'settings'} }
  // ],
  beforeEnter: async (to, from, next) => {
    // store.dispatch('updateDbs')
    const user = await store.dispatch('updateUser')
    !user ? next('/') : next()
  }
}
