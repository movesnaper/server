import { router } from '@/setup'
import { db } from '@/db'
const { get, post } = db()

const state = {
  logo: 'PS',
  company: {},
  docs: {}
}
const getters = {
  company ({ company }) {
    return company
  },
  docs ({ docs }) {
    return (docs.rows || []).map(({ doc }) => doc)
  },
  reestr ({}, { docs }) {
    return docs.filter(({ type }) => type === 'reestr')
  },
  users ({}, { docs }) {
    return docs.filter(({ type }) => type === 'user')
  },
  klients ({}, { docs }) {
    return docs.filter(({ type }) => type === 'klient')
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
    state.company = v
  },
  klients (state, v) {
    state.klients = v
  },
  docs (state, v) {
    state.docs = v
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
        .catch(err => console.log(err))
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
    console.log('update');
    
    commit('company', v || await get('/profile'))
    commit('docs', v || await get('/'))
    // commit('klients', v || await get('/klients/'))
    // commit('reestr', v || await get('/reestr/'))
  }

}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}
