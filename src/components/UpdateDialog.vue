<template>
  <div>
    <v-dialog max-width="600">
      <v-card>
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
              <v-text-field
                v-model="editedItem.email"
                label="Email"
              ></v-text-field>
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
          <v-btn @click="dialog = !dialog">Close</v-btn>
          <v-btn color="primary lighten-1" @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
