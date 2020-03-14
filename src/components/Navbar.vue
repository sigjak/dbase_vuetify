<template>
  <nav>
    <v-app-bar dense app color="indigo" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>IES Database</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn small text v-on="on">
            <v-icon>mdi-microscope</v-icon>Instruments</v-btn
          >
        </template>
        <v-list>
          <v-list-item
            dense
            @click="fetchData(item.params)"
            link
            v-for="item in sections[0].kinds"
            :key="item.unit"
          >
            <v-list-item-title>{{ item.unit }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn small text v-on="on"> <v-icon>mdi-home</v-icon>Houses</v-btn>
        </template>
        <v-list>
          <v-list-item
            dense
            @click="fetchData(item.params)"
            link
            v-for="item in sections[1].kinds"
            :key="item.unit"
          >
            <v-list-item-title>{{ item.unit }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn small text v-on="on">
            <v-icon>mdi-jeepney</v-icon>Vehicles</v-btn
          >
        </template>
        <v-list>
          <v-list-item
            dense
            link
            v-for="item in sections[2].kinds"
            :key="item.name"
            router
            :to="item.route"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn small text v-on="on">
            <v-icon>mdi-wallet-travel</v-icon>Other</v-btn
          >
        </template>
        <v-list>
          <v-list-item
            dense
            link
            v-for="item in sections[3].kinds"
            :key="item.name"
            router
            :to="item.route"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
-->

      <v-btn @click="allYears()" small text>All years</v-btn>

      <v-spacer></v-spacer>
      <v-btn small text>To Bookings</v-btn>
      <v-btn small text> <v-icon>mdi-exit-to-app</v-icon>Exit </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-list dense>
        <v-list-group
          no-action
          :prepend-icon="section.icon"
          v-for="section in sections"
          :key="section.name"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ section.name }}</v-list-item-title>
          </template>
          <v-list-item
            link
            v-for="kind in section.kinds"
            :key="kind.name"
            router
            :to="kind.route"
          >
            <v-list-item-title class="pl-4">{{ kind.name }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      drawer: false,

      sections: [
        {
          icon: 'mdi-microscope',
          name: 'Instruments',
          kinds: [
            {
              unit: 'Microprobe',
              params: {
                currentTable: 'probeuse',
                years: 'lastTwo',
                currentUnit: 'Microprobe',
                title: 'Last Two Years',
                index: 'instr'
              }
            },
            {
              unit: 'FTIR',
              params: {
                currentTable: 'ftir',
                years: 'lastTwo',
                currentUnit: 'FTIR',
                title: 'Last Two Years',
                index: 'am-instr'
              }
            },
            {
              unit: 'SEM',
              params: {
                currentTable: 'sem',
                years: 'lastTwo',
                currentUnit: 'SEM',
                title: 'Last Two Years',
                index: 'am-instr'
              }
            },
            {
              unit: 'Thin Sections',
              params: {
                currentTable: 'thin_sections',
                years: 'lastTwo',
                currentUnit: 'Thin Sections',
                title: 'Last Two Years',
                index: 'thin'
              }
            }
          ]
        },
        {
          icon: 'mdi-home',
          name: 'Houses',
          kinds: [
            {
              unit: 'Helluhraun',
              params: {
                currentTable: 'helluhraun',
                years: 'lastTwo',
                currentUnit: 'Helluhraun',
                title: 'Last Two Years',
                index: 'house'
              }
            },
            {
              unit: 'Dyngja',
              params: {
                currentTable: 'dyngja',
                years: 'lastTwo',
                currentUnit: 'Dyngja',
                title: 'Last Two Years',
                index: 'house'
              }
            },
            {
              unit: 'Vidimelur',
              params: {
                currentTable: 'vidimelur',
                years: 'lastTwo',
                currentUnit: 'Vidimelur',
                title: 'Last Two Years',
                index: 'house'
              }
            }
          ]
        },
        {
          icon: 'mdi-jeepney',
          name: 'Vehicles',
          kinds: [
            { name: 'Red Hilux', route: 'red_hilux' },
            { name: 'Blue Hilux', route: 'blue_hilux' }
          ]
        },
        {
          icon: 'mdi-wallet-travel',
          name: 'Other',
          kinds: [{ name: 'First Aid' }, { name: 'Iridium phone' }]
        }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchData']),
    allYears() {
      this.params.years = 'all'
      this.params.title = 'All Years'
      this.fetchData(this.params).then(() => {
        this.params.years = 'lastTwo'
      })
    }
  },
  computed: {
    params() {
      return this.$store.state.params
    }
  }
}
</script>

<style></style>
