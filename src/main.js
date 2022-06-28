import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles.scss'
import './common.scss'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import Calendar from 'vue-calendar-component';
Vue.prototype.$axios = axios



Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://192.168.0.121:7001',    //这个地址是服务端地址
}))

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Calendar,
  render: h => h(App)
}).$mount('#app')