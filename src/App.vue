<template
    ><v-app>
        <v-content>
            <div v-if="!loggedIn">
                <v-img
                    :src="require('./images/header_01.png')"
                    max-height="150"
                ></v-img>
                <v-row class="im">
                    <v-col cols="12">
                        <h1 class="display-2 pt-10 text-center grey--text">
                            Institute of Earth Sciences
                        </h1>
                        <h1
                            class="mt-2 display-1 text-center grey--text text--darken-1"
                        >
                            Databases
                        </h1>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <div class="dd">
                            <v-card width="400">
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
                                            :append-icon="
                                                show1
                                                    ? 'mdi-eye'
                                                    : 'mdi-eye-off'
                                            "
                                            :rules="[
                                                rules.required,
                                                rules.pass,
                                            ]"
                                            :type="show1 ? 'text' : 'password'"
                                            label="password"
                                            hint="Password required"
                                            @click:append="show1 = !show1"
                                        ></v-text-field>
                                        <v-card-actions>
                                            <v-btn
                                                @click="submitting"
                                                :disabled="!valid"
                                                small
                                                color="primary"
                                                >Submit
                                            </v-btn>
                                        </v-card-actions>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div v-if="loggedIn">
                <Navbar />

                <Table />
            </div>
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
        Table,
    },
    data() {
        return {
            loggedIn: false,
            valid: false,
            login: {
                name: '',
                password: '',
            },
            rules: {
                required: (v) => (v && v.length >= 3) || 'Required.',
                pass: (v) => v === 'askja' || 'Required',
                min: (v) => v.length >= 3 || 'Login required',
            },
            show1: false,
            params: {
                currentTable: 'probeuse',
                years: true,
                currentUnit: 'Microprobe',
                title: 'Last Two Years',
                index: 'instr',
            },
            loginDialog: true,
        }
    },
    computed: {
        ...mapState(['users']),
    },
    methods: {
        ...mapActions(['fetchData', 'fetchUsers']),
        submitting() {
            if (this.users.includes(this.login.name)) {
                this.loggedIn = true

                this.loginDialog = false
            } else {
                this.logErr()
            }
        },
        logErr() {
            this.$swal({
                title: 'Error!',
                icon: 'error',
                text: 'Wrong login.',
                timer: 2000,
                showConfirmButton: false,
            })
        },
    },
    created() {
        this.fetchUsers()
        this.fetchData(this.params)
    },
}
</script>
<style lang="scss">
.dd {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    left: 0;
    top: 15vh;
    width: 100%;
    height: 100%;
}

.im {
    background-image: url('images/dawn.jpg');
    background-size: cover;
    height: 100vh;
}
</style>
