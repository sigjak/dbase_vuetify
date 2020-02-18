<template>
  <v-data-table
    :headers="headers"
    :items="resData"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',

          value: 'fullName'
        },
        { text: 'Account', value: 'account', width: 40 },
        { text: 'Date', value: 'date' }
      ],
      resData: [
        {
          fullName: 'Guðmundur H. Guðfinnsson',
          account: '12345',
          date: '24.2.2020'
        }
      ],
      tablename: 'probeuse',
      tableData: []
    }
  },
  methods: {
    getData(tablename) {
      this.$http.get(`getTables.php?name=${tablename}`).then(resp => {
        this.tableData = resp.data[0]
        //console.log(resp.data)
        console.log(this.tableData[0].fullName)
      })
    }
  },
  created() {
    this.getData(this.tablename)
  }
}
</script>
>

<style lang="scss" scoped></style>
