<template>
  <v-card elevation="5" max-width="600" class=" zeta">
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
          <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
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
      <v-btn @click="$store.commit('CLOSE')">Close</v-btn>
      <v-btn color="primary lighten-1" @click="save()">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment/src/moment'
export default {
  data() {
    return {
      dagur: null
    }
  },
  methods: {
    ...mapActions(['updateTable']),
    save() {
      this.editedItem.date = this.formattedDate
      this.updateTable(this.editedItem).then((this.dagur = null))
    }
  },
  computed: {
    ...mapState(['editedItem']),
    formattedDate() {
      return this.dagur
        ? moment(this.dagur).format('DD-MM-YYYY')
        : this.editedItem.date
    }
  }
}
</script>
<style lang="scss">
.zeta {
  position: fixed;
  z-index: 200;
  left: 0;
  top: 0;
  margin-top: 200px;
  margin-left: 30%;
}
</style>
