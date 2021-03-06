<template>
  <v-container fluid px-12>
    >
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
          <v-card-title class="text-uppercase"
            >{{ params.currentUnit }}
          </v-card-title>
          <v-card-subtitle>{{ params.title }} </v-card-subtitle>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="tableData"
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

                <v-btn small class="error mr-4" @click="showAlert()"
                  >Delete selected</v-btn
                >
                <v-btn
                  small
                  class="success"
                  v-if="params.index == 'vehicle'"
                  @click="confirming()"
                  >Confirm Selected</v-btn
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
import { mapActions, mapState } from 'vuex'
import moment from 'moment/src/moment'
export default {
  data() {
    return {
      options: {},
      postdata: {
        ids: [],
        tablename: '',
        data: [],
      },
      dagur: null,
      editedItem: {
        fullName: '',
        email: '',
        id: '',
        account: '',
        date: '',
        supervisor: '',
        tablename: '',
      },
      editedIndex: -1,
      dialog: false,
      search: '',
      singleSelect: false,
      selected: [],
    }
  },
  methods: {
    ...mapActions(['fetchData', 'updateTable', 'deleteItems', 'confirm']),
    customSort: function (items, index, isDesc) {
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
      this.editedIndex = this.tableData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    downloadExcel() {
      this.$refs.downExcel.$el.click()
      this.selected = []
    },
    empty() {
      this.$swal({
        icon: 'error',
        title: 'Empty table !',
        showConfirmButton: false,
        timer: 1500,
      })
    },
    showAlert(item) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          if (item) this.postdata.ids.push(item.id)
          this.selected.forEach((item) => {
            this.postdata.ids.push(item.id)
          })
          this.postdata.tablename = this.params.currentTable

          // call vuex then zero postdata and selected
          this.deleteItems(this.postdata).then(() => {
            this.selected = []
            this.postdata.ids = []
            this.postdata.tablename = ''
            this.$swal('Deleted!', 'success')
          })
        }
      })
    },
    confirming() {
      this.$store.commit('SET_CONFIRM_CHECK')
      this.$swal({
        title: 'Confirming and sending email',
        type: 'info',
        onBeforeOpen: () => {
          this.$swal.showLoading()
          // console.log(this.$store.state.confirmCheck)
          this.confirm(this.selected).then(() => {
            this.selected = []
            this.$swal.disableLoading()
            if (this.$store.state.confirmCheck === true) {
              this.showOk()
            }
            // console.log('after show')
          })
        },
      })
    },
    showOk() {
      this.$swal({
        showCloseButton: true,
        type: 'success',
        title: 'Confirmation mail sent!',
        timer: 2000,
      })
    },
  },
  computed: {
    ...mapState(['tableData', 'params', 'mtTable']),
    headers() {
      const h1 = [
        {
          text: 'Name',
          align: 'left',
          value: 'fullName',
          width: 180,
        },
        { text: 'Date', value: 'date', width: '120' },
        { text: 'Email', value: 'email' },
        { text: 'Account', value: 'account', width: '100' },

        { text: 'Supervisor', value: 'supervisor' },
        {
          text: 'Comments',
          value: 'comments',
          width: 180,
          sortable: false,
        },
        { text: 'Actions', value: 'action', sortable: false },
      ]
      const thin = [
        { text: '27mm slide', value: 'slide27' },
        { text: '27mm coated', value: 'slide27coated' },
        { text: '1" round', value: 'oneround' },
        { text: '1" polished', value: 'onepolished' },
        { text: '1" mount', value: 'mountcoated' },
        { text: '1" seven', value: 'oneseven' },
        { text: 'carbon coated', value: 'carbon' },
        { text: 'repolish', value: 'repolish' },
        { text: 'Comments', value: 'comments', width: 150, sortable: false },
        { text: 'Actions', value: 'action', sortable: false },
      ]
      if (this.params.index == 'am-instr') {
        const h2 = { text: 'AM/PM', value: 'status', width: '100' }
        h1.splice(2, 0, h2)
        return h1.slice(0)
      } else if (this.params.index == 'house') {
        const h2 = { text: 'Guests', value: 'status', width: '100' }
        h1.splice(2, 0, h2)
        return h1.slice(0)
      } else if (this.params.index == 'other') {
        const h2 = { text: 'Number', value: 'status', width: '100' }
        h1.splice(2, 0, h2)
        return h1.slice(0)
      } else if (this.params.index == 'vehicle') {
        const h2 = { text: 'Status', value: 'status', width: '100' }
        h1.splice(2, 0, h2)
        return h1.slice(0)
      } else if (this.params.index == 'thin') {
        h1.splice(5, 2)
        return [...h1.slice(0), ...thin]
      } else return h1
    },
    excel() {
      const Sheetname = this.params.currentUnit
      const Filename =
        this.params.currentUnit + '_' + new Date().toLocaleDateString()
      let Columns = []
      let base = [
        { label: 'Name', field: 'fullName' },
        { label: 'Date', field: 'date' },
        { label: 'Status', field: 'status' },
        { label: 'Email', field: 'email' },
        { label: 'Account', field: 'account' },
        { label: 'Supervisor', field: 'supervisor' },
        { label: 'Comments', field: 'comments' },
      ]
      const thin = [
        { label: 'Slide 27', field: 'slide27' },
        { label: 'Slide 27 Coat', field: 'slide27coated' },
        { label: '1" round', field: 'oneround' },
        { label: '1" polished', field: 'onepolished' },
        { label: '1" seven ', field: 'mountcoated' },
        { label: 'Mount Coated', field: 'oneseven' },
        { label: 'C Coated', field: 'carbon' },
        { label: 'Repolished ', field: 'repolish' },
      ]
      if (this.params.currentTable == 'thin_sections') {
        Columns = base.concat(thin)
      } else {
        Columns = base
      }
      return {
        Sheetname,
        Filename,
        Columns,
      }
      // return {
      //   Sheetname: this.params.currentUnit,
      //   Filename:
      //     this.params.currentUnit + '_' + new Date().toLocaleDateString(),
      //   Columns: [
      //     { label: 'Name', field: 'fullName' },
      //     { label: 'Date', field: 'date' },
      //     { label: 'Status', field: 'status' },
      //     { label: 'Email', field: 'email' },
      //     { label: 'Account', field: 'account' },
      //     { label: 'Supervisor', field: 'supervisor' },
      //     { label: 'Comments', field: 'comments' }
      //   ]
      // }
    },
    formattedDate() {
      return this.dagur
        ? moment(this.dagur).format('DD-MM-YYYY')
        : this.editedItem.date
    },
  },
  watch: {
    tableData() {
      this.selected = []
      this.options = { page: 1, itemsPerPage: 10 }
    },
    mtTable: 'empty',
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
  },
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
