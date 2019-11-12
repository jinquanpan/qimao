import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyHeader from'./views/header.vue'
import MYFoot from './views/foot.vue'
import axios from 'axios';
//6:配置服务器基础路径
//7:配置保存session信息
axios.defaults.withCredentials=true;

//8:axios 注册vue
Vue.prototype.axios = axios
axios.defaults.baseURL="http://127.0.0.1:5050/","http://localhost:5050/","http://127.0.0.1:8080/","http://localhost:8080/";
Vue.component("my-header",MyHeader)
Vue.component("my-foot",MYFoot)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  el:"#app",
  render: h => h(App)
}).$mount('#app')
