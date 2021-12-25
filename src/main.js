import '@babel/polyfill'
// import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import './../node_modules/bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import BootstrapVue, {IconsPlugin} from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import apiClient from "./http-common";

import store from "../store";

// Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(apiClient)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  BootstrapVue,
  render: h => h(App)
}).$mount('#app')

