import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Regist from './views/Regist.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',   //首页进入登陆页面
      redirect:'login'  //重定向到 login 
    },
    {
      path: '/login',   //首页进入登陆页面
      name: 'Login',
      component: Login
    },{
      path: '/regist',   //注册页面
      name: 'Regist',
      component: Regist
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
