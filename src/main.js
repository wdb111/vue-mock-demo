import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.prototype.$axios= axios

Vue.config.productionTip = false;
require('./mock'); //引入mock数据，关闭则注释该行

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
