import { db } from '@/db'
const { get, post } = db('/user')

const state = {
  user: {}
}
const getters = {
  user ({ user }) {
    return user
  }
}
const mutations = {
  user (state, v) {
    state.user = v
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
    commit('user', await get('/'))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
