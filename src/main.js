import '@babel/polyfill'
// import 'mutationobserver-shim'
import Vue from 'vue'
import Vuex from "vuex";
import Vuetify from 'vuetify/lib'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import './../node_modules/bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@mdi/font/css/materialdesignicons.css'
import '@mdi/font/css/materialdesignicons.css'


import BootstrapVue, {IconsPlugin} from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueApexCharts from "vue-apexcharts";

// import apiClient from "./http-common";

import store from "../store";

// Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuetify)
Vue.use(VueApexCharts)
Vue.use(Vuex)
// Vue.use(apiClient)

Vue.component('apexchart', VueApexCharts)

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  BootstrapVue,
  render: h => h(App)
}).$mount('#app')

