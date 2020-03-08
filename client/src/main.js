import Vue from 'vue'
import App from './App.vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import { store, router, i18n, mixins, bootstrapVue } from '@/setup'
Vue.use(VueSidebarMenu)
Vue.use(bootstrapVue)
Vue.use(mixins)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
