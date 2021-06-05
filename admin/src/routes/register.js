
import Register from '@/view/auth/Register'

export default {
  path: '/register',
  name: 'register',
  component: Register,
  // beforeEnter: async (to, from, next) => {
  //   const login = localStorage.getItem('login')
  //   !login ? next('/login') : next()
  // }
}
