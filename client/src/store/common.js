// import { router } from '@/setup'
import { db } from '@/db'
const { get, post } = db()
import { reduce, filters } from '@/functions'

const state = {
  logo: 'PS'
}
const getters = {

  user ({ user }) {
    return user
  },
  logo ({ company, logo }) {
    return company.name || logo
  },
  isAuth ({ company }) {
    return !!company.name
  }
}
const mutations = {
  user (state, v) {
    state.user = v
  }
}
const actions = {

  async register ({}, v) {
    await post('/register', v)
    window.location.reload()
  },


  async login ({ dispatch }, user) {
      const { name } = await post('/login', user)
      localStorage.setItem('user', name)
      dispatch('updateUser')
  },

  async updateUser ({ commit }) {
    const user = localStorage.getItem('user')
    commit('user', user)
    return user
  },

  async logout () {
    await post('/logout')
    localStorage.removeItem('user')
    window.location.reload()
  },

  async update ({ commit }, v) {
    await get('/')
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
