import { db } from '@/db'
const { get, post } = db('/lombard')

const state = {
  lombards: []
}
const getters = {
  lombards ({ lombards }) {
    return lombards || []
  },
  map({ lombards }) {
    return lombards.reduce((res, v) => ({...res, [v._id]: v }), {})
  }
}
const mutations = {
  lombards (state, v) {
    state.lombards = v || []
  }
}
const actions = {

  async remove ({ dispatch }, v) {
    await post('/remove', v)
    await dispatch('update')
  },

  async save ({ dispatch }, v) {
    await post('/', v)
    await dispatch('update')
  },

  async update ({ commit, dispatch }) {
    dispatch('updateCompany', null, { root: true })
    commit('lombards', await get('/'))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
