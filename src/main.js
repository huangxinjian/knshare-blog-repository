import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueresource from 'vue-resource'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import animated from 'animate.css' 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'
import axios from 'axios' // 1、在这里引入axios
axios.defaults.withCredentials = true;  //意思是携带cookie信息,保持session的一致性
Vue.prototype.$axios = axios

import VueQuillEditor from 'vue-quill-editor'
 
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
Vue.use(VueQuillEditor, /* { default global options } */)  // 导入文本编辑器 vue-quill-editor


Vue.use(animated)
Vue.use(vueresource);
Vue.use(iView);
Vue.use(ElementUI);


Vue.config.productionTip = false

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

new Vue({
  router,
  store,
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  render: h => h(App)
}).$mount('#app')

