import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const base = axios.create({
  baseURL: 'http://localhost/vuetiAPI'
})

export default new Vuex.Store({
  state: {
    data: []
  },
  getters: {
    tableData: state => {
      return state.data
    }
  },
  actions: {
    async deleteItems({ commit }, payload) {
      await base.post('delete.php', payload)
      commit('DELETE_ITEMS', payload.ids)
    },
    async fetchData({ commit }, payload) {
      const response = await base.get(
        `getTables.php?name=${payload.tablename}&years=${payload.years}`
      )
      commit('SET_DATA', response.data)
    },
    async updateTable({ commit }, payload) {
      await base.post('update.php', payload)
      commit('UPDATE_TABLE', payload)
    }
  },
  mutations: {
    DELETE_ITEMS: (state, incoming) =>
      (state.data = state.data.filter(item => {
        return !incoming.includes(item.id)
      })),
    SET_DATA: (state, incoming) => (state.data = incoming),
    UPDATE_TABLE: (state, incoming) => {
      state.data.forEach(item => {
        if (item.id == incoming.id) {
          Object.assign(item, incoming)
        }
      })
    }
  }
})
