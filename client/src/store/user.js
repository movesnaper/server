import { db } from '@/db'
const { get, post } = db('/user')

const state = {
  users: []
}
const getters = {
  users ({ users }) {
    return users || []
  }
}
const mutations = {
  users (state, v) {
    state.users = v || []
  }
}
const actions = {

  async remove ({ dispatch }, v) {
    await post('/remove', v)
    return dispatch('update')
  },

  async save ({ dispatch }, v) {
    await post('/', v)
    return dispatch('update')
  },

  async update ({ commit }) {
    commit('users', await get('/'))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
