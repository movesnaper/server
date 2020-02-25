import Vue from 'vue'
import App from './App.vue'
import { store, router, i18n, mixins, bootstrapVue } from '@/setup'
Vue.use(bootstrapVue)
Vue.use(mixins)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
