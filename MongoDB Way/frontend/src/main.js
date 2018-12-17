import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Navbar from './components/Navbar.vue'
import Header from './components/Header.vue'

Vue.config.productionTip = false
Vue.component('app-navbar', Navbar)
Vue.component('app-header', Header)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
