<template>
  <v-content>
    <v-app-bar color="indigo">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer style="height:auto" temporary v-model="drawer">
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
            @click="hello"
            v-for="kind in section.kinds"
            :key="kind.name"
          >
            <v-list-item-title class="pl-4">{{ kind.name }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,

      sections: [
        {
          icon: 'mdi-microscope',
          name: 'Instruments',
          kinds: [{ name: 'Microprobe' }, { name: 'FTIR' }, { name: 'SEM' }]
        },
        {
          icon: 'mdi-home',
          name: 'Houses',
          kinds: [{ name: 'Dyngja' }, { name: 'Helluhraun' }]
        },
        {
          icon: 'mdi-jeepney',
          name: 'Vehicles',
          kinds: [{ name: 'Red Hilux' }, { name: 'Blue Hilux' }]
        },
        {
          icon: 'mdi-wallet-travel',
          name: 'Accessories',
          kinds: [{ name: 'First Aid' }, { name: 'Iridium phone' }]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
