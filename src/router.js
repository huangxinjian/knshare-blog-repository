import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Regist from './views/Regist.vue'
import BlogMain from './views/blog/BlogMain.vue'
import PersonalCenter from './views/user/PersonalCenter.vue'
import WriteBlog from './views/blog/WriteBlog.vue'
import BlogDetailPage from './views/blog/BlogDetailPage.vue'
import test from './views/test.vue'
import msgcenter from './views/msg/MsgCenter.vue'
import chatting from './views/msg/Chatting.vue'
import systemMsg from './views/msg/SystemMsg.vue'
import illegalMsg from './views/msg/IllegalMsg.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',   //首页进入登陆页面
      redirect:'home'  //重定向到 login 
    },
    {
      path: '/login',   //首页进入登陆页面
      name: 'Login',
      component: Login
    },{
      path: '/regist',   //注册页面
      name: 'Regist',
      component: Regist
    },{
      path:'/home', //主页
      name: 'Home',
      component:Home
    },{
      path:'/blogMain/:blogSort', //博客主页面
      name: 'blogMain',
      component:BlogMain,
     
    },{
      path:'/personalCenter/:userId/:activeSort',
      name:'personalCenter',
      component:PersonalCenter
    },{
      path:'/:userId/writeBlog',
      name:'writeBlog',
      component:WriteBlog
    },{
      path:'/test',
      name:'test',
      component:test
    },{
      path:'/msgcenter',
      name:'msgcenter',
      component:msgcenter,
      children:[
        {
          path:'chatting',
          name:'chatting',
          component:chatting
        },
        {
          path:'systemMsg',
          name:'systemMsg',
          component:systemMsg
        },{
          path:'illegalMsg',
          name:'illegalMsg',
          component:illegalMsg
        }
      ]
    },
    {
      path:'/:userName/:articleId',
      name:'blogDetailPage',
      component:BlogDetailPage
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
