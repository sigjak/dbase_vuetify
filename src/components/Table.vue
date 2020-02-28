<template>
  <v-container>
    <v-btn @click="dialog = true">open</v-btn>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>Update</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="editedItem.fullName"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="editedItem.email"
                label="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="editedItem.account"
                label="Account"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = !dialog">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row justify="end">
      <v-col cols="6">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-btn @click="sel">sel</v-btn>

          <v-card-title class="text-uppercase">{{ unit }}</v-card-title>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="tableData"
            :single-select="singleSelect"
            :custom-sort="customSort"
            item-key="id"
            calculate-widths
            locale="es"
            show-select
            :search="search"
            class="elevation-1"
          >
            <template #item.action="{ item }">
              <v-icon class="mr-2 pt-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon class="pt-2" @click="deleteItem(item)">
                mdi-trash-can
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  props: ['table', 'unit'],
  data() {
    return {
      editedItem: {
        fullName: '',
        email: '',
        account: '',
        date: '',
        supervisor: '',
        tablename: ''
      },
      editedIndex: -1,
      dialog: false,
      search: '',
      singleSelect: false,
      selected: [],
      tableData: [],
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'fullName'
        },
        { text: 'Email', value: 'email' },
        { text: 'Account', value: 'account', width: '100' },
        { text: 'Date', value: 'date', width: '40', sortable: true },
        { text: 'Supervisor', value: 'supervisor' },
        { text: 'Comments', value: 'comments', width: 150, sortable: false },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  methods: {
    customSort: function(items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] == 'date') {
          if (!isDesc[0]) {
            return moment(b[index], 'DDMMYYYY') - moment(a[index], 'DDMMYYYY')
          } else {
            return moment(a[index], 'DDMMYYYY') - moment(b[index], 'DDMMYYYY')
          }
        } else {
          if (typeof a[index] !== 'undefined') {
            if (!isDesc[0]) {
              return a[index]
                .toLowerCase()
                .localeCompare(b[index].toLowerCase())
            } else {
              return b[index]
                .toLowerCase()
                .localeCompare(a[index].toLowerCase())
            }
          }
        }
      })
      return items
    },
    save() {
      //console.log(this.editedItem.id)
      this.updateTable()
      if (this.editedIndex > -1) {
        Object.assign(this.tableData[this.editedIndex], this.editedItem)
      }
    },
    deleteItem(item) {
      this.editedIndex = this.tableData.indexOf(item)
      this.tableData.splice(this.editedIndex, 1)
    },
    editItem(item) {
      console.log(item)
      this.editedIndex = this.tableData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    getData(tablename) {
      this.$http.get(`getTables.php?name=${tablename}`).then(resp => {
        this.tableData = resp.data
      })
    },
    updateTable() {
      // console.log(this.editedItem.id)
      this.editedItem.tablename = this.table
      this.$http
        .post('update.php', this.editedItem)
        .then(response => console.log(response.data))
    },
    sel() {}
  },
  created() {
    if (!this.table) {
      this.table = localStorage.getItem('table')
    } else {
      localStorage.setItem('table', this.table)
    }

    this.getData(this.table)
  }
}
</script>
>

<style scoped>
::v-deep .v-data-table tr td:nth-last-child(2) {
  display: inline-block;
  font-size: 0.6rem;
  overflow: auto;
}
/* ::v-deep.v-data-table tr th:nth-child(4) {
  display: none;
}
::v-deep .v-data-table tr td:nth-child(4) {
  display: none;
} */
</style>
