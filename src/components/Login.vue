<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-card color="grey lighten-4">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                prepend-icon="mdi-account"
                label="Login"
                v-model="login"
                :rules="nameRules"
              ></v-text-field>
              {{ valid }}
              <v-text-field
                :rules="passwordRule"
                prepend-icon="mdi-lock-question"
                label="Password"
                v-model="password"
              >
              </v-text-field>
              <v-card-actions>
                <v-btn :disabled="!valid" small class="success" @click="submit"
                  >Submit</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      login: '',
      password: '',
      valid: true,
      passwordRule: [v => v === 'askja' || 'Password required']
      //nameR: [v => !!v || 'Name required']
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$router.push({ name: 'About' })
        console.log('logged in')
      }

      //this.$refs.form.reset()
    }
  },
  computed: {
    nameRules() {
      if (this.login) {
        return [v => v.length >= 3 || 'At least three letters']
      } else {
        return [v => !!v || 'Required']
      }
    }
  }
}
</script>
