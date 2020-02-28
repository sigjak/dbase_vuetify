<template>
  <v-container>
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

          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="tableData"
            :single-select="singleSelect"
            item-key="id"
            calculate-widths
            show-select
            :search="search"
            class="elevation-1"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      singleSelect: false,
      selected: [],
      tablename: 'thin_sections',
      tableData: [],
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'fullName'
        },
        { text: 'Email', value: 'email' },
        { text: 'id', value: 'id' },
        { text: 'Account', value: 'account', width: '100' },
        { text: 'Date', value: 'date', width: '40' },
        { text: 'Supervisor', value: 'supervisor' },
        { text: 'Comments', value: 'comments', width: 150 }
      ],
      thinHeaders: [
        { text: '27mm slide', value: 'slide27' },
        { text: '27mm coated', value: 'slide27coated' },
        { text: '1" round', value: 'oneround' },
        { text: '1" polished', value: 'onepolished' },
        { text: '1" mount', value: 'mountcoated' },
        { text: '1" seven', value: 'oneseven' },
        { text: 'carbon coated', value: 'carbon' },
        { text: 'repolished', value: 'repolish' },
        { text: 'Comments', value: 'comments', width: 150 }
      ]
    }
  },
  methods: {
    getData(tablename) {
      this.$http.get(`getTables.php?name=${tablename}`).then(resp => {
        this.tableData = resp.data
        //console.log(this.tableData[0])
      })
    },
    sel() {
      console.log(this.selected)
    }
  },
  created() {
    this.getData(this.tablename)
    this.headers.pop()
    this.headers = this.headers.concat(this.thinHeaders)
    console.log(this.headers)
  }
}
</script>
>

<style scoped>
::v-deep .v-data-table tr td:last-child {
  display: inline-block;
  font-size: 0.6rem;
  overflow: auto;
}
::v-deep .v-data-table tr th:nth-child(4) {
  display: none;
}
::v-deep .v-data-table tr td:nth-child(4) {
  display: none;
}
</style>
