import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import http from './http'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.config.productionTip = false

Vue.use(VueAxios, axios)


new Vue({
  vuetify,
  http: http,
  store: store,
  router: router,
  render: h => h(App)
}).$mount('#app')
