import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user'
import company from '@/store/company'
import lombard from '@/store/lombard'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { company, lombard, user }
})
