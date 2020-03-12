import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const base = axios.create({
  baseURL: 'http://localhost/vuetiAPI'
})

export default new Vuex.Store({
  state: {
    params: {
      data: [],
      currentUnit: '',
      year: '',
      currentTable: ''
    }
  },
  actions: {
    async fetchData({ commit }, payload) {
      const response = await base.get(
        `getTables.php?name=${payload.currentTable}&years=${payload.years}`
      )
      payload.data = response.data
      commit('SET_DATA', payload)
    },
    async deleteItems({ commit }, payload) {
      await base.post('delete.php', payload)
      commit('DELETE_ITEMS', payload.ids)
    },

    async updateTable({ commit }, payload) {
      await base.post('update.php', payload)
      commit('UPDATE_TABLE', payload)
    }
  },
  mutations: {
    DELETE_ITEMS: (state, incoming) =>
      (state.params.data = state.params.data.filter(item => {
        return !incoming.includes(item.id)
      })),
    SET_DATA: (state, incoming) => {
      state.params = incoming
    },
    UPDATE_TABLE: (state, incoming) => {
      state.params.data.forEach(item => {
        if (item.id == incoming.id) {
          Object.assign(item, incoming)
        }
      })
    }
  }
})
