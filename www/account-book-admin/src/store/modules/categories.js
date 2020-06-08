import { getCategories } from '@/api/csv'

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
    getCategories().then((res) => {
      commit('SET_CATEGORIES', {
        key: 'data',
        value: res
      })
    }).catch((e) => {
      console.log(e)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

