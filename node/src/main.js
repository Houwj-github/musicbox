import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import store from './store/index.js'

Vue.use(ElementUI);

new Vue({
  router,     //挂载router
  store,
  render: h => h(App)
}).$mount('#app')