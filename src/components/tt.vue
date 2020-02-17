<template>
  <v-card class="mx-auto" width="300">
    <v-list>
      <v-list-group no-action prepend-icon="mdi-home" value="true">
        <template v-slot:activator>
          <v-list-item-title>Users</v-list-item-title>
        </template>

        <v-list-item v-for="(admin, i) in admins" :key="i" link>
          <v-list-item-title v-text="admin[0]"></v-list-item-title>
          <v-list-item-icon>
            <v-icon v-text="admin[1]"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <v-list-group no-action prepend-icon="mdi-home" value="true">
        <template v-slot:activator>
          <v-list-item-title>a</v-list-item-title>
        </template>

        <v-list-item v-for="(admin, i) in admins" :key="i" link>
          <v-list-item-title v-text="admin[0]"></v-list-item-title>
          <v-list-item-icon>
            <v-icon v-text="admin[1]"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    admins: [
      ['Management', 'mdi-account'],
      ['Settings', 'mdi-account']
    ],
    cruds: [
      ['Create', 'add'],
      ['Read', 'insert_drive_file'],
      ['Update', 'update'],
      ['Delete', 'delete']
    ]
  })
}
</script>
