const state = {
  data: []
}

const mutations = {
  SET_CATEGORIES: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  setCategories({ commit }, data) {
    commit('SET_CATEGORIES', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

