import { router } from '@/setup'
import { db } from '@/db'
const { get, post } = db()

const state = {
  logo: 'PS',
  company: {}
}
const getters = {
  company ({ company }) {
    return company
  },

  logo ({ company, logo }) {
    return company.name || logo
  },

  isAuth ({ company }) {
    return !!localStorage.getItem('x-token')
  }
}
const mutations = {
  company (state, v) {
    state.company = v || {}
  }
}
const actions = {

  async register ({ dispatch }, v) {
    await post('/register', v)
    router.push('/login')
  },

  async login ({ dispatch }, v) {
    await post('/login', v)
      .then(() => dispatch('update'))    
    router.push('/profile')
  },

  async save ({ dispatch }, v) {
    await post('/', v)
    dispatch('update')
  },

  async logout ({ dispatch }, silent) {
    await post('/logout')
      .then(() => dispatch('update', {}))
    router.push('/login')
  },

  async update ({ commit }, v) {
    commit('company', v || await get('/'))
  }

}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}
