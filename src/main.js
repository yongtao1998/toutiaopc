import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import axios from 'axios'
// 全局注册 element-ui框架
Vue.use(ElementUI)
// 配置 默认url地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 全局使用 axios
Vue.prototype.$axios = axios

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
