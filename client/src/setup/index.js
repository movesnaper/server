import router from './router-setup'
import store from './store-setup'
import { i18n } from './i18n-setup'
import mixins from './mixins-setup'
// import db from './db-setup'
import bootstrapVue from './bootstrapVue-setup'

// db({
//   onResponseErr: ({ status, data }) => {
//     if (status === 401) {
//       Object.keys(data).forEach(name => {
//         // store.dispatch('logout')
//       })
//     }
//   }
// })

export {
  router,
  store,
  i18n,
  mixins,
  bootstrapVue
}
