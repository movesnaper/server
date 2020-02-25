
import Profile from '@/view/Profile'
// import { store } from '@/setup'

export default {
  path: '/profile',
  name: 'profile',
  component: Profile
  // beforeEnter: async (to, from, next) => {
  //   const { isAuth } = store.getters
  //   await store.dispatch('update')
  //   !isAuth ? next('/login')
  //     : next()
  // }
}
