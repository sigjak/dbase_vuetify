<template>
    <nav>
        <v-app-bar dense app color="indigo" dark>
            <v-icon> mdi-database</v-icon>

            <v-toolbar-title class="pl-1">&nbsp;IES Database</v-toolbar-title>
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
                    <v-btn small text v-on="on">
                        <v-icon>mdi-home</v-icon>Houses</v-btn
                    >
                </template>
                <v-list>
                    <v-list-item
                        dense
                        @click="fetchData(item.params)"
                        link
                        elevation:2
                        v-for="item in sections[1].kinds"
                        :key="item.unit"
                    >
                        <v-list-item-title>{{ item.unit }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-menu open-on-hover offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn small text v-on="on">
                        <v-icon>mdi-jeepney</v-icon>Vehicles</v-btn
                    >
                </template>
                <v-list>
                    <v-list-item
                        dense
                        @click="fetchData(item.params)"
                        link
                        v-for="item in sections[2].kinds"
                        :key="item.unit"
                    >
                        <v-list-item-title>{{ item.unit }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-menu open-on-hover offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn small text v-on="on">
                        <v-icon>mdi-phone-classic </v-icon>
                        <span class="ml-1"> Other </span></v-btn
                    >
                </template>
                <v-list>
                    <v-list-item
                        dense
                        @click="fetchData(item.params)"
                        link
                        v-for="item in sections[3].kinds"
                        :key="item.unit"
                    >
                        <v-list-item-title>{{ item.unit }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn @click="allYears()" width="80" small text>{{
                buttonName
            }}</v-btn>

            <v-spacer></v-spacer>
            <v-btn href="https://microprobe.hi.is/selectItem" small text
                >To Bookings</v-btn
            >
            <v-btn href="https://jardvis.hi.is/" small text>
                <v-icon>mdi-exit-to-app</v-icon>Exit
            </v-btn>
        </v-app-bar>
    </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            buttonName: 'All Years',

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
                                years: true,
                                currentUnit: 'Microprobe',
                                title: 'Last Two Years',
                                index: 'instr',
                            },
                        },
                        {
                            unit: 'FTIR',
                            params: {
                                currentTable: 'ftir',
                                years: true,
                                currentUnit: 'FTIR',
                                title: 'Last Two Years',
                                index: 'am-instr',
                            },
                        },
                        {
                            unit: 'SEM',
                            params: {
                                currentTable: 'sem',
                                years: true,
                                currentUnit: 'SEM',
                                title: 'Last Two Years',
                                index: 'am-instr',
                            },
                        },
                        {
                            unit: 'Thin Sections',
                            params: {
                                currentTable: 'thin_sections',
                                years: true,
                                currentUnit: 'Thin Sections',
                                title: 'Last Two Years',
                                index: 'thin',
                            },
                        },
                        {
                            unit: 'ICP-MS',
                            params: {
                                currentTable: 'icpms',
                                years: true,
                                currentUnit: 'ICP-MS',
                                title: 'Last Two Years',
                                index: 'instr',
                            },
                        },
                        {
                            unit: 'ICP-OES',
                            params: {
                                currentTable: 'icpoes',
                                years: true,
                                currentUnit: 'ICP-OES',
                                title: 'Last Two Years',
                                index: 'instr',
                            },
                        },
                        {
                            unit: 'Mass Spec AES',
                            params: {
                                currentTable: 'massaes',
                                years: true,
                                currentUnit: 'Mass Spec AES',
                                title: 'Last Two Years',
                                index: 'instr',
                            },
                        },
                        {
                            unit: 'IC1000',
                            params: {
                                currentTable: 'ic1000',
                                years: true,
                                currentUnit: 'IC1000',
                                title: 'Last Two Years',
                                index: 'instr',
                            },
                        },
                        {
                            unit: 'IC2000',
                            params: {
                                currentTable: 'ic2000',
                                years: true,
                                currentUnit: 'IC2000',
                                title: 'Last Two Years',
                                index: 'instr',
                            },
                        },
                        {
                            unit: 'ICP-OES-II',
                            params: {
                                currentTable: 'icpoes2',
                                years: true,
                                currentUnit: 'ICP-OES-II',
                                title: 'Last Two Years',
                                index: 'instr',
                            },
                        },
                        {
                            unit: 'MC-IPS-MS',
                            params: {
                                currentTable: 'mcicpms',
                                years: true,
                                currentUnit: 'MC-IPS-MS',
                                title: 'Last Two Years',
                                index: 'instr',
                            },
                        },
                    ],
                },
                {
                    icon: 'mdi-home',
                    name: 'Houses',
                    kinds: [
                        {
                            unit: 'Helluhraun',
                            params: {
                                currentTable: 'helluhraun',
                                years: true,
                                currentUnit: 'Helluhraun',
                                title: 'Last Two Years',
                                index: 'house',
                            },
                        },
                        {
                            unit: 'Dyngja',
                            params: {
                                currentTable: 'dyngja',
                                years: true,
                                currentUnit: 'Dyngja',
                                title: 'Last Two Years',
                                index: 'house',
                            },
                        },
                        {
                            unit: 'Vidimelur',

                            params: {
                                currentTable: 'vidimelur',
                                years: true,
                                currentUnit: 'Vidimelur',
                                title: 'Last Two Years',
                                index: 'house',
                            },
                        },
                    ],
                },
                {
                    icon: 'mdi-jeepney',
                    name: 'Vehicles',
                    kinds: [
                        {
                            unit: 'LandRover 35 ',
                            params: {
                                currentTable: 'landrover_35',
                                years: true,
                                currentUnit: 'LandRover 35 ',
                                title: 'Last Two Years',
                                index: 'vehicle',
                            },
                        },
                        {
                            unit: 'LandRover 38 ',
                            params: {
                                currentTable: 'landrover_38',
                                years: true,
                                currentUnit: 'LandRover 38 ',
                                title: 'Last Two Years',
                                index: 'vehicle',
                            },
                        },
                        {
                            unit: 'Red Hilux ',
                            params: {
                                currentTable: 'red_hilux',
                                years: true,
                                currentUnit: 'Red Hilux ',
                                title: 'Last Two Years',
                                index: 'vehicle',
                            },
                        },
                        {
                            unit: 'Blue Hilux ',
                            params: {
                                currentTable: 'blue_hilux',
                                years: true,
                                currentUnit: 'Blue Hilux ',
                                title: 'Last Two Years',
                                index: 'vehicle',
                            },
                        },
                        {
                            unit: 'Grey Hilux ',
                            params: {
                                currentTable: 'grey_hilux',
                                years: true,
                                currentUnit: 'Grey Hilux ',
                                title: 'Last Two Years',
                                index: 'vehicle',
                            },
                        },
                        {
                            unit: 'Open trailer ',
                            params: {
                                currentTable: 'opentrailer',
                                years: true,
                                currentUnit: 'Open trailer ',
                                title: 'Last Two Years',
                                index: 'vehicle',
                            },
                        },
                        {
                            unit: 'Closed trailer ',
                            params: {
                                currentTable: 'closedtrailer',
                                years: true,
                                currentUnit: 'Closed trailer ',
                                title: 'Last Two Years',
                                index: 'vehicle',
                            },
                        },
                        {
                            unit: 'Small trailer ',
                            params: {
                                currentTable: 'smalltrailer',
                                years: true,
                                currentUnit: 'Small trailer ',
                                title: 'Last Two Years',
                                index: 'vehicle',
                            },
                        },
                        {
                            unit: 'Warrior ',
                            params: {
                                currentTable: 'warrior',
                                years: true,
                                currentUnit: 'Warrior ',
                                title: 'Last Two Years',
                                index: 'vehicle',
                            },
                        },
                        {
                            unit: 'Viking A',
                            params: {
                                currentTable: 'viking_a',
                                years: true,
                                currentUnit: 'Viking A ',
                                title: 'Last Two Years',
                                index: 'vehicle',
                            },
                        },
                        {
                            unit: ' Viking B ',
                            params: {
                                currentTable: 'viking_b',
                                years: true,
                                currentUnit: 'Viking B ',
                                title: 'Last Two Years',
                                index: 'vehicle',
                            },
                        },
                    ],
                },
                {
                    icon: 'mdi-wallet-travel',
                    name: 'Other',
                    kinds: [
                        {
                            unit: 'Iridium Phones',
                            params: {
                                currentTable: 'iridium',
                                years: true,
                                currentUnit: 'Iridium Phones',
                                title: 'Last Two Years',
                                index: 'other',
                            },
                        },
                        {
                            unit: 'First Aid',
                            params: {
                                currentTable: 'firstaid',
                                years: true,
                                currentUnit: 'First Aid',
                                title: 'Last Two Years',
                                index: 'other',
                            },
                        },
                        {
                            unit: 'Gas Detectors',
                            params: {
                                currentTable: 'gasdetect',
                                years: true,
                                currentUnit: 'Gas Detectors',
                                title: 'Last Two Years',
                                index: 'other',
                            },
                        },
                    ],
                },
            ],
        }
    },
    methods: {
        ...mapActions(['fetchData']),
        allYears() {
            this.params.years = !this.params.years
            if (this.buttCheck === true) {
                this.buttonName = 'Last Two'
                this.params.title = 'All Years'
            } else {
                this.buttonName = 'All Years'
                this.params.title = 'Last Two Years'
            }
            this.fetchData(this.params)
        },
    },
    computed: {
        ...mapState(['buttCheck']),
        params() {
            return this.$store.state.params
        },
    },
}
</script>

<style>
.v-list-item:hover {
    background: #dcdcdc;
}
</style>
