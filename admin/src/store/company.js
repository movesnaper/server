// import { router } from '@/setup'
import { db } from '@/db'
const { get, post } = db()
import { reduce, filters } from '@/functions'

const state = {
  logo: 'PS',
  company: {},
  docs: {},
  dbs: [],
  user: ''
}
const getters = {
  company ({ company }) {
    return company
  },
  user ({ user }) {
    return user
  },
  dbs ({ dbs }) {
    return dbs
  },
  docs ({ docs }) {
    return (docs.rows || []).map(({ doc }) => doc)
  },
  reestr ({}, { docs }) {
    return docs.filter(filters['reestr'])
  },
  users ({}, { docs }) {
    return docs.filter(filters['users'])
  },
  klients ({}, { docs }) {
    return docs.filter(filters['klients'])
  },
  lombards ({}, { docs }) {
    return docs.filter(filters['lombards'])
  },
  payed ({}, { reestr }) {
    return reestr.filter(filters['ct377'])
  },
  issued ({}, { reestr }) {
    return reestr.filter(filters['dt377'])
  },
  pendings ({}, { payed, issued }) {
    const ids = payed.map(v => v.ref)
    return issued.filter(v => !ids.includes(v._id))
  },
  lombardsMap ({}, { lombards }) {
    return reduce(lombards, '_id')
  },
  klientsMap ({}, { klients }) {
    return reduce(klients, '_id')
  },
  logo ({ company, logo }) {
    return company.name || logo
  },
  isAuth ({ company }) {
    return !!company.name
  }
}
const mutations = {
  company (state, v) {
    state.company = v
  },
  dbs (state, v) {
    state.dbs = v
  },
  user (state, v) {
    state.user = v
  },
  docs (state, v) {
    state.docs = v
  }
}
const actions = {

  //  replicate ({}, { name, docs }) {
  //   const doc_ids = docs.filter(v => !v.deleted).map(v => v._id)
  //   return post('/replicate', { name, doc_ids })
  // },

  async register ({}, v) {
    await post('/register', v)
    window.location.reload()
  },

  async updateDbs ({ state, commit }, force) {
    const { length } = state.dbs
    if (force || !length) {
      const dbs = await get('/dbs')
      commit('dbs', dbs)
    }
  },

  async login ({ dispatch }, v) {
      const { name } = await post('/login', v)
      localStorage.setItem('login', name)
      dispatch('updateUser')
  },

  async updateUser ({ commit }) {
    const user = localStorage.getItem('login')
    commit('user', user)
    return user
  },

  async updateCompany ({ commit }) {
    const company = await get('/profile')
    commit('company', company)
    return company
  },

  async save ({ dispatch }, v) {
    await post('/profile', v)
    dispatch('update')
  },

  async logout () {
    await post('/logout')
    localStorage.removeItem('login')
    window.location.reload()
  },

  async update ({ commit }, v) {
    // await get('/')
    // commit('company', v || await get('/profile'))
    // commit('docs', v || await get('/'))
  }

}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}
