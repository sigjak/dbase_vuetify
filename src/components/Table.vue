<template>
  <v-container>
    <v-btn @click="changePage()">Page</v-btn>
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
          <v-card-title class="text-uppercase text-center"
            >{{ params.currentUnit }} {{ params.startingPage }}</v-card-title
          >
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="params.data"
            :single-select="singleSelect"
            :custom-sort="customSort"
            item-key="id"
            calculate-widths
            show-select
            :options.sync="options"
            :search="search"
            class="elevation-1"
          >
            <template #item.comments="{ item }">
              <div class="overfl">
                {{ item.comments }}
              </div>
            </template>
            <template #item.action="{ item }">
              <v-icon class="mr-2 pt-2" @click="updateItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon class="pt-2" @click.stop="showAlert(item)">
                mdi-trash-can
              </v-icon>
            </template>

            <template v-if="selected.length > 0" #top>
              <v-row>
                <v-btn small class="primary ml-8 mr-4" @click="downloadExcel()">
                  Download selected</v-btn
                >

                <v-btn small class="error" @click="showAlert()"
                  >Delete selected</v-btn
                >
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!--                      Download excel                -->
    <vue-excel-xlsx
      :data="selected"
      :columns="excel.Columns"
      :filename="excel.Filename"
      :sheetname="excel.Sheetname"
      ref="downExcel"
    >
    </vue-excel-xlsx>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment/moment'
export default {
  data() {
    return {
      options: {},

      yearsToGet: 'lastTwo',

      excelData: [],

      postdata: {
        ids: [],
        tablename: '',
        data: []
      },
      dagur: null,
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
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'fullName',
          width: 200
        },
        { text: 'Date', value: 'date', width: '150' },
        { text: 'Email', value: 'email', width: '200' },
        { text: 'Account', value: 'account' },

        { text: 'Supervisor', value: 'supervisor' },
        {
          text: 'Comments',
          value: 'comments',
          width: 150,
          sortable: false
        },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchData', 'updateTable', 'deleteItems']),
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
        this.editedItem.tablename = this.params.currentTable
        this.updateTable(this.editedItem).then((this.dagur = null))
        this.dialog = false
      }
    },
    close() {
      this.dialog = false
      this.formattedDate = null
    },

    updateItem(item) {
      this.editedIndex = this.params.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    downloadExcel() {
      this.$refs.downExcel.$el.click()
      this.selected = []
    },
    showAlert(item) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          if (item) this.postdata.ids.push(item.id)
          this.selected.forEach(item => {
            this.postdata.ids.push(item.id)
          })
          this.postdata.tablename = this.params.currentTable

          // call vuex then zero postdata and selected
          this.deleteItems(this.postdata).then(() => {
            this.selected = []
            this.postdata.ids = []
            this.postdata.tablename = ''
            this.$swal('Deleted!', 'Item(s) deleted.', 'success')
          })
        }
      })
    }
  },
  computed: {
    params() {
      return this.$store.state.params
    },
    excel() {
      return {
        Sheetname: this.params.currentUnit,
        Filename:
          this.params.currentUnit + '_' + new Date().toLocaleDateString(),
        Columns: [
          { label: 'Name', field: 'fullName' },
          { label: 'Date', field: 'date' },
          { label: 'Status', field: 'status' },
          { label: 'Email', field: 'email' },
          { label: 'Account', field: 'account' },
          { label: 'Supervisor', field: 'supervisor' },
          { label: 'Comments', field: 'comments' }
        ]
      }
    },
    formattedDate() {
      return this.dagur
        ? moment(this.dagur).format('DD-MM-YYYY')
        : this.editedItem.date
    }
  },
  watch: {
    params() {
      this.options = { page: 1, itemsPerPage: 10 }
    }
  },

  created() {
    // console.log('CREATEDD')
    // if (this.table) {
    //   localStorage.setItem('storedTable', this.table)
    //   localStorage.setItem('storedUnit', this.unit)
    //   this.currentTable = this.table
    //   this.currentUnit = this.unit
    // } else {
    //   this.currentTable = localStorage.getItem('storedTable')
    //   this.currentUnit = localStorage.getItem('storedUnit')
    // }
    // console.log('hi')
    // let payload = { tablename: this.currentTable, years: this.yearsToGet }
    // // this.getData(this.currentTable, this.yearsToGet)
    // this.fetchData(payload)
  }
}
</script>
>

<style scoped>
.overfl {
  overflow-y: auto;
  font-size: 0.6rem;
  max-height: 48px;
}
/* ::v-deep .v-data-table tr td:nth-last-child(2) {
  display: block;

  font-size: 0.6rem;
  overflow-y: auto;
} */
/* ::v-deep.v-data-table tr th:nth-child(4) {
  display: none;
}
::v-deep .v-data-table tr td:nth-child(4) {
  display: none;
} */
</style>
