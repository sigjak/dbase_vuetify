import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

// TODO check this  table location Create new folder for tableapi on server site
let base = axios.create({
    baseURL: 'https://microprobe.hi.is/admin/tableApi/',
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
})
if (process.env.NODE_ENV === 'development') {
    base = axios.create({
        baseURL: 'http://localhost/vuetiAPI',
    })
}

export default new Vuex.Store({
    state: {
        updateModal: false,
        users: [],
        confirmCheck: true,
        buttCheck: true,
        mtTable: false,
        tableData: [],
        paramsHelluhr: {
            currentUnit: 'Helluhraun',
            years: false,
            title: 'Last Two Years',
            currentTable: 'helluhraun',
            index: 'house',
        },
        paramsBlue: {
            currentUnit: 'Blue Hilux',
            years: false,
            title: 'Last Two Years',
            currentTable: 'blue_hilux',
            index: 'vehicle',
        },
        paramsThin: {
            currentUnit: 'Thin Sections',
            years: false,
            title: 'Last Two Years',
            currentTable: 'thin_sections',
            index: 'thin',
        },
        paramsVidi: {
            currentUnit: 'Viðimelur',
            years: false,
            title: 'Last Two Years',
            currentTable: 'vidimelur',
            index: 'house',
        },
        paramsOes: {
            currentUnit: 'ICP-OES',
            years: false,
            title: 'Last Two Years',
            currentTable: 'icpoes',
            index: 'instr',
        },
        params: {
            currentUnit: '',
            years: false,
            currentTable: '',
            index: '',
        },
        editedItem: {
            fullName: '',
            email: '',
            id: '',
            account: '',
            date: '',
            supervisor: '',
            tablename: '',
        },
    },
    actions: {
        async confirm(context, payload) {
            const toBeConfirmed = {
                confirmArray: payload,
                currentTable: context.state.params.currentTable,
                currentUnit: context.state.params.currentUnit,
            }
            const response = await base.post('confirm.php', toBeConfirmed)
            let confirmIds = []
            payload.forEach((item) => {
                confirmIds.push(item.id)
            })
            if (response.data == 'sent') {
                context.commit('CONFIRM_VEHICLE', confirmIds)
            }
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
        async fetchUsers({ commit }, payload) {
            const response = await base.get('getUsers.php')
            payload = response.data
            commit('SET_USERS', payload)
        },
        async deleteItems({ commit }, payload) {
            await base.post('delete.php', payload)
            commit('DELETE_ITEMS', payload.ids)
        },

        async updateTable({ commit }, payload) {
            this.state.editedItem.tablename = this.state.params.currentTable

            await base.post('update.php', payload)

            commit('UPDATE_TABLE', payload)
        },
        updateItem({ commit }, item) {
            let payload = Object.assign({}, item)
            commit('UPDATE_ITEM', payload)
        },
    },
    mutations: {
        CONFIRM_VEHICLE: (state, Ids) => {
            state.tableData.forEach((item) => {
                if (Ids.includes(item.id)) item.status = 'Yes'
            })
            state.confirmCheck = true
        },
        TRIGGER: (state) => {
            state.mtTable = !state.mtTable
        },
        DELETE_ITEMS: (state, incoming) =>
            (state.tableData = state.tableData.filter((item) => {
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
            state.tableData.forEach((item) => {
                if (item.id == incoming.id) {
                    Object.assign(item, incoming)
                }
            })
            state.updateModal = false
        },
        SET_CONFIRM_CHECK: (state) => (state.confirmCheck = false),
        SET_USERS: (state, incoming) => (state.users = incoming),
        UPDATE_ITEM: (state, incoming) => {
            state.editedItem = incoming
            state.updateModal = true
        },
        CLOSE: (state) => (state.updateModal = false),
    },
})
