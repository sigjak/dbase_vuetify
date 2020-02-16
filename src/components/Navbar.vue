<template>
  <v-content>
    <v-app-bar color="indigo">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- <v-navigation-drawer temporary v-model="drawer">
      <v-card>
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.name">
            <v-list-group no-action prepend-icon="mdi-microscope">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                link
                @click="hello"
                v-for="inn in inner"
                :key="inn.taeki"
              >
                <v-list-item-title>{{ inn.taeki }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer> -->
    <div v-for="section in sections" :key="section.name">
      <v-icon>{{ section.icon }} </v-icon>
      {{ section.name }}
      <div v-for="kind in section.kinds" :key="kind.name">
        {{ kind.name }}
      </div>
    </div>
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
          kinds: [{ name: 'First Aid' }, { name: 'iridium phone' }]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
