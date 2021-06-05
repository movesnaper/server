
import Dbs from '@/view/Dbs'
import store from '@/setup/store-setup'

export default {
  path: '/dbs',
  name: 'dbs',
  component: Dbs,
  beforeEnter: async (to, from, next) => {
    await store.dispatch('updateUser')
    next()
  }
}
