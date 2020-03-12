<template>
  <v-app>
    <Navbar />

    <v-content>
      <Table />
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Table from './components/Table'

export default {
  name: 'App',
  components: {
    Navbar,
    Table
  }
}
</script>
