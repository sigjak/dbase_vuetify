<template>
  <v-container>
    <v-btn @click="useMoment">Moment</v-btn>
    <p>{{ m }}</p>
    <p>{{ loc1 }}</p>
    <p>{{ loc2 }}</p>

    <v-data-table
      :headers="headers"
      :items="tableData"
      :custom-sort="customSort"
      sortBy="date"
    >
      <template #item.account> </template>
    </v-data-table>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      tt: [],
      m: '',
      loc1: '',
      loc2: '',
      tablename: 'probeuse',
      tableData: []
    }
  },
  methods: {
    getData(tablename) {
      this.$http.get(`getTables.php?name=${tablename}`).then(resp => {
        this.tableData = resp.data

        // this.tableData.forEach(item => {
        //   // this.tt.push(item.date)
        //   let dummy = moment(item.date, 'DD-MM-YYYY')
        //   item.date = dummy.format('MMM D, YYYY')
        // })
      })
    },
    useMoment() {
      // // this.tableData.forEach(item => {
      // //   this.tt.push(item.date)
      // // })
      // console.log(this.tt)
      // this.tt.sort((a, b) => moment(a, 'DDMMYYYY') - moment(b, 'DDMMYYYY'))
      // console.log(this.tt)
      // // this.loc1 = this.m.toString()
      // // this.loc2 = this.m.format('MMM DD, YYYY')
    },
    customSort: function(items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] == 'date') {
          if (!isDesc[0]) {
            return moment(b[index], 'DDMMYYYY') - moment(a[index], 'DDMMYYYY')
            //return new Date(b[index]) - new Date(a[index])
          } else {
            return moment(a[index], 'DDMMYYYY') - moment(b[index], 'DDMMYYYY')
            //return new Date(a[index]) - new Date(b[index])
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
    }
  },
  created() {
    this.getData(this.tablename)
  },

  computed: {
    headers() {
      return [
        { text: 'Name', value: 'fullName', width: '250' },
        { text: 'Date', value: 'date' },
        { text: 'Account', value: 'account' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
