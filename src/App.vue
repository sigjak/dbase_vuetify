<template>
  <v-app>
    <Navbar />
    <v-content>
      <Cast />
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
//import Cast from './components/Cast'
export default {
  name: 'App',
  components: {
    Navbar
    // Cast
  },

  data: () => ({
    //
  }),
  methods: {
    go() {
      this.$router.push({ name: 'About' })
    }
  }
}
</script>
