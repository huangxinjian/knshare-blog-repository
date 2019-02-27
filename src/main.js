import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueresource from 'vue-resource'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(vueresource);
Vue.use(iView);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
