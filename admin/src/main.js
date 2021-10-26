import Vue from 'vue'
import App from './App.vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import { store, router, i18n, mixins, BootstrapVue, IconsPlugin } from '@/setup'
import VueHtmlToPaper from 'vue-html-to-paper';
import VModal from 'vue-js-modal'

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    './custom.css'
  ]
}
 
Vue.use(VueHtmlToPaper, options);
Vue.use(VModal, { dynamic: true, injectModalsContainer: true, height: 'auto' })
Vue.use(VueSidebarMenu)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(mixins)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
