<template>
  <v-app>
    <Navbar />
    <v-content>
      <Table />
    </v-content>

    <router-view></router-view>
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
