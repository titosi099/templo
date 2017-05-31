// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import swal from 'sweetalert'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import store from './store/store'

import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'
import 'sweetalert/dist/sweetalert.min.js'
import 'sweetalert/dist/sweetalert.css'

Vue.use(VueAxios, axios)
Vue.use(swal)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
