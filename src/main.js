import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false
const base = axios.create({
  baseURL: 'http://localhost/vuetiAPI'
})
Vue.prototype.$http = base
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
