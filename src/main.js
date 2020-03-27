import Vue from 'vue'
import App from './App.vue'
//import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import vuetify from './plugins/vuetify'
import 'sweetalert2/dist/sweetalert2.min.css'
//import axios from 'axios'
import VueExcelXlsx from 'vue-excel-xlsx'
Vue.config.productionTip = false
// const base = axios.create({
//   baseURL: 'http://localhost/vuetiAPI'
// })
Vue.use(VueSweetalert2)
Vue.use(VueExcelXlsx)
//Vue.prototype.$http = base
new Vue({
  // router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
