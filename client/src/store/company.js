import { router } from '@/setup'
import { db, getToken } from '@/db'
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
    return !!company.id
  }
}
const mutations = {
  company (state, v) {
    state.company = v || {}
  }
}
const actions = {

  async register (s, v) {
    const res = await post('/register', v)
    console.log(res)
    router.push('/login')
  },

  async login ({ dispatch }, v) {
    const token = await post('/login', v)
    console.log(token)
    localStorage.setItem('x-token', token)
    await dispatch('update')
    router.push('/profile')
  },

  async save ({ dispatch }, v) {
    await post('/', v)
    dispatch('update')
  },

  async logout ({ dispatch }) {
    localStorage.removeItem('x-token')
    await dispatch('update')
    router.push('/login')
  },

  async update  ({ commit }) {
    getToken('x-token')
    commit('company', await get('/'))
  }

}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}
