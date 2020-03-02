<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">Update</v-card-title>
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
            <v-col cols="12" sm="6">
              <v-menu>
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="formattedDate"
                    label="Date"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  class="mt-12"
                  no-title
                  v-model="dagur"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = !dialog">Close</v-btn>
          <v-btn color="primary lighten-1" @click="save()">Save</v-btn>
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
          <v-card-title class="text-uppercase text-center">{{
            unit
          }}</v-card-title>
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
              <v-icon class="mr-2 pt-2" @click="updateItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon class="pt-2" @click.stop="openDelete(item)">
                mdi-trash-can
              </v-icon>
            </template>
            <template v-if="selected.length > 0" #top>
              <v-row>
                <v-btn small class="primary ml-8 mr-4" @click="downloadExcel()">
                  Download selected</v-btn
                >

                <v-btn small class="error" @click="deleteMany()"
                  >Delete selected</v-btn
                >
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <!--                      DELETE DIALOG                 -->
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Deleting!</v-card-title>

        <v-card-text>
          Are you sure? This can not be undone.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Close
          </v-btn>
          <v-btn color="warning" text @click="deleteFromTable()">
            Delete
          </v-btn>
          <!-- <v-btn color="warning" text @click="deleteItem(itemToDelete)">
            Delete
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--                      Download excel                -->
    <vue-excel-xlsx
      :data="selected"
      :columns="excelColumns"
      :filename="excelFilename"
      :sheetname="excelSheetname"
      ref="downExcel"
    >
    </vue-excel-xlsx>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  props: ['table', 'unit'],
  data() {
    return {
      excelData: [],
      excelFilename: 'sig',
      excelSheetname: 'sheet',
      postdata: {
        ids: [],
        tablename: ''
      },
      indexes: [],
      invSortedIndex: [],
      dagur: null,
      deleteDialog: false,
      itemToDelete: [],
      editedItem: {
        fullName: '',
        email: '',
        id: '',
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
      if (this.editedIndex > -1) {
        this.editedItem.date = this.formattedDate
        Object.assign(this.tableData[this.editedIndex], this.editedItem)

        this.updateTable()
      }
    },
    close() {
      this.dialog = false
      this.formattedDate = null
    },
    openDelete(item) {
      this.itemToDelete = item
      this.indexes.push(this.tableData.indexOf(item))
      this.editedItem = Object.assign({}, item)
      // this.tableData.splice(this.editedIndex, 1)
      this.postdata.ids.push(this.editedItem.id)
      this.deleteDialog = true
    },

    deleteFromTable() {
      this.deleteDialog = false
      this.postdata.tablename = this.table

      this.indexes.forEach(item => {
        this.tableData.splice(item, 1)
      })
      this.indexes = []
      this.$http.post('delete.php', this.postdata).then(response => {
        console.log(response.data)
        this.postdata.ids = []
      })
    },
    updateItem(item) {
      this.editedIndex = this.tableData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    updateTable() {
      this.editedItem.tablename = this.table
      this.$http
        .post('update.php', this.editedItem)
        .then(response => console.log(response.data))
      this.dagur = null
    },
    getData(tablename) {
      this.$http.get(`getTables.php?name=${tablename}`).then(resp => {
        this.tableData = resp.data
      })
    },
    downloadExcel() {
      this.$refs.downExcel.$el.click()
      this.selected = []
    },

    deleteMany() {
      this.selected.forEach(item => {
        this.indexes.push(this.tableData.indexOf(item))
        this.postdata.ids.push(item.id)
      })
      this.indexes.sort((a, b) => b - a)
      this.selected = []
      this.deleteDialog = true
    }
  },
  computed: {
    excelColumns() {
      let columns = [
        { label: 'Name', field: 'fullName' },
        { label: 'Date', field: 'date' },
        { label: 'Status', field: 'status' },
        { label: 'Email', field: 'email' },
        { label: 'Account', field: 'account' },
        { label: 'Supervisor', field: 'supervisor' },
        { label: 'Comments', field: 'comments' }
      ]
      return columns
    },
    formattedDate() {
      return this.dagur
        ? moment(this.dagur).format('DD-MM-YYYY')
        : this.editedItem.date
    }
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
