import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/basic.css'
import './plugins/element.js'
import './plugins/aMap.js'
import './plugins/axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
