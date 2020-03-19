import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const base = axios.create({
  baseURL: 'http://localhost/vuetiAPI'
})

export default new Vuex.Store({
  state: {
    buttCheck: true,
    mtTable: false,
    tableData: [],
    params: {
      currentUnit: '',
      years: false,
      currentTable: '',
      index: ''
    }
  },
  actions: {
    async confirm(context, payload) {
      console.log(payload)
      const toBeConfirmed = {
        confirmArray: payload,
        currentTable: context.state.params.currentTable
      }
      console.log(toBeConfirmed)
      let confirmIds = []
      payload.forEach(item => {
        confirmIds.push(item.id)
      })

      const response = await base.post('confirm.php', toBeConfirmed)
      console.log(response.data)

      context.commit('CONFIRM_VEHICLE', confirmIds)
    },
    async fetchData({ commit }, payload) {
      const response = await base.get(
        `getTables.php?name=${payload.currentTable}&years=${payload.years}`
      )
      if (response.data == 'empty table') {
        commit('TRIGGER')
        return
      }
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
    CONFIRM_VEHICLE: (state, Ids) => {
      state.tableData.forEach(item => {
        if (Ids.includes(item.id)) item.status = 'Yes'
      })
    },
    TRIGGER: state => {
      state.mtTable = !state.mtTable
    },
    DELETE_ITEMS: (state, incoming) =>
      (state.tableData = state.tableData.filter(item => {
        return !incoming.includes(item.id)
      })),
    SET_DATA: (state, incoming) => {
      state.params.currentUnit = incoming.currentUnit
      state.params.title = incoming.title
      state.params.currentTable = incoming.currentTable
      state.params.years = incoming.years
      state.params.index = incoming.index
      state.tableData = incoming.data
      if (incoming.years === true) {
        state.buttCheck = true
      } else {
        state.buttCheck = false
      }
    },
    UPDATE_TABLE: (state, incoming) => {
      state.tableData.forEach(item => {
        if (item.id == incoming.id) {
          Object.assign(item, incoming)
        }
      })
    }
  }
})
