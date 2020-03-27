<template>
  <v-app id="app">
    <v-content>
      <v-dialog v-model="loginDialog" persistent width="400px">
        <v-card>
          <v-card-title>IES DATABASE</v-card-title>

          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="login.name"
                :rules="[rules.required, rules.min]"
                hint="Login required"
                label="login"
              ></v-text-field>
              <v-text-field
                v-model="login.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.pass]"
                :type="show1 ? 'text' : 'password'"
                label="password"
                hint="Password required"
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-btn
                @click="submitting"
                :disabled="!valid"
                class=" mt-4"
                small
                color="primary"
                >Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <Navbar />

      <Table />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Table from './components/Table'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar,
    Table
  },
  data() {
    return {
      valid: false,
      login: {
        name: '',
        password: ''
      },
      rules: {
        required: v => (v && v.length >= 3) || 'Required.',
        pass: v => v === 'askja' || 'Required',
        min: v => v.length >= 3 || 'Login required'
      },
      show1: false,
      params: {
        currentTable: 'probeuse',
        years: true,
        currentUnit: 'Microprobe',
        title: 'Last Two Years',
        index: 'instr'
      },
      loginDialog: true
    }
  },
  computed: {
    ...mapState(['users'])
  },
  methods: {
    ...mapActions(['fetchData', 'fetchUsers']),
    submitting() {
      this.fetchUsers()
      let tt = this.$store.state.users
      console.log(tt)
      console.log(this.users)
      this.loginDialog = false

      this.fetchData(this.params)
    }
  }
}
</script>
