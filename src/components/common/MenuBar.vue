<template>
  <div class="menuBar">
    <div class="menuLogo">
      <img class="menuImg" src="../../assets/images/logo1.png">
      <span class="menuSpan">Knshare</span>
    </div>

    <div class="menuContent">
      <ul>
        <li @mouseenter="changeFontSize(0)" @mouseleave="restoreFontSize(0)">
          <span :style="{fontSize:fontsize[0]}" @click="goMainPage">主页</span>
        </li>
        <li @mouseenter="changeFontSize(1)" @mouseleave="restoreFontSize(1)">
          <span :style="{fontSize:fontsize[1]}" @click="goBolgPage">博客</span>
        </li>
        <li @mouseenter="changeFontSize(2)" @mouseleave="restoreFontSize(2)" v-if="$store.state.user.userName != ''">
          <span :style="{fontSize:fontsize[2]}" @click="goToMsgCenter">消息中心</span>
        </li>
      </ul>
    </div>

    <div class="searchInput">
        <!-- <Input   placeholder="Enter text" style="width: auto" v-on:keyup.enter="search">
            <Icon type="ios-search" slot="suffix" />
        </Input> -->
         <Input  class="searchInput-input" search placeholder="Enter something..." @on-enter="search"/>
        <!-- <input type="text" v-on:keyup.enter="search" />
        <i class="fa fa-search fa-2x searchIcon"></i> -->
    </div>

    <div class="LoginOrRegist" v-if="$store.state.user.userName == ''">
      <ul>
        <li @mouseenter="changeFontSize(3)" @mouseleave="restoreFontSize(3)">
          <span :style="{fontSize:fontsize[3]}" @click="goRegistPage">注册</span>
        </li>
        <li>
          <div class="havlingLine"></div>
        </li>
        <li @mouseenter="changeFontSize(4)" @mouseleave="restoreFontSize(4)">
          <i class="fa fa-sign-in fa-2x" aria-hidden="true"></i>
          <span :style="{fontSize:fontsize[4]}" @click="goLoginPage">登录</span>
        </li>
      </ul>
    </div>

    <div class="MessageOrLogout" v-else>
        <Badge :dot="checkNewMessage" style="    margin-top: 22px;">
              <i class="fa fa-bell fa-2x" @click="info()"></i>
        </Badge>
      
         <!-- 消息 -->
        <!--<i class="fa fa-comments fa-2x"></i> -->
        <div class="MessageOrLogout-headIcon">
           <img :src="$store.state.userInfo.headIconUrl" alt="" srcset="" @click="showOtherMenuFunc" v-clickoutside="hideOtherMenu">
        </div>
    </div>

     <transition name="fade">
        <div class="otherMenu" v-if="showOtherMenu" >
                <ul>
                    <li @click="goBloggerBlogList">个人主页</li>
                    <li @click="goToPersonalCenter">个人中心</li>
                    <li @click="logOut">注销</li>
                </ul>
        </div>
      </transition>

  </div>
</template>
<script>

const clickoutside = {  // 自定义关闭指令
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {  // 判断节点是否包含你点击的节点
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};


export default {
  data() {
    return {
      fontsize: ["18px", "18px", "18px", "18px", "18px"],
      showOtherMenu:false,
      checkNewMessage:false,
      newMessageCount:0,
    };
  },
  directives: {clickoutside},
  methods: {
    changeFontSize(i) {
      this.$set(this.fontsize, i, "20px");
    },
    restoreFontSize(i) {
      this.$set(this.fontsize, i, "18px");
    },
    goLoginPage() {
      //跳转到 Login 路由
      this.$router.push({ path: "/login" });
    },
    goRegistPage() {
      //跳转到 regist 路由
      this.$router.push({ path: "/regist" });
    },
    goBolgPage(){
      //跳转到 blogMain 路由
      this.$store.commit("saveStartSearch",false);
      this.$router.push({ name: 'blogMain', params: { blogSort: '0' }});
    },
    search(){
      alert("插你妈呢");
      this.$store.commit("saveStartSearch",true);
    },
    showOtherMenuFunc(){
        this.showOtherMenu = !this.showOtherMenu;
    },
    hideOtherMenu(e) {
        this.showOtherMenu = false;
    },
    goBloggerBlogList(){  // 点击用户名进入博客主的博客列表主页
        let _this = this;
        let store = this.$store;
        this.$axios({
            method: 'post',
            url: '/knbolg/article/findArticleByBloggerId.do',
            headers:{
                "Content-Type":"application/json;charset=UTF-8"
            },
            data:{
                'page':1,
                'limit':7,
                'userId':_this.$store.state.user.userId
            }
        }).then( (response) => {
            console.log(response.data);
            store.state.bloggerBlogList = response.data.pageParams.content;
            _this.$store.state.articleBlogger = response.data.blogger;
            store.commit("updatePageParam",{
                page : response.data.pageParams.page,
                limit : response.data.pageParams.limit,
                totalPage : response.data.pageParams.totalPage,
                totalRecord : response.data.pageParams.totalRecord,
            });
            store.commit("updateBloggerRelation",{
                fansNo:response.data.fans,
                attentionsNo:response.data.icons,
                blogNo:response.data.blogNo,
            });
            store.commit("updateBloggerGenePool",response.data.genePool);
            _this.$router.push({ name: 'blogDetailPage', params: {userName: _this.$store.state.articleBlogger.userInformation.nickName
            ,articleId:'blogList'}});
            _this.$Message.info('获取列表成功');
        })
        .catch(function (error) {
            console.log(error);
            _this.$Message.info('获取列表失败');
        });
    },
    goToMsgCenter(){
      sessionStorage.setItem("msgType","chatting");
      this.$router.push({ name: 'chatting'});
    },
    goToPersonalCenter(){
      this.$router.push({ name: 'personalCenter', params: { userId:this.$store.state.user.userName,activeSort:'dongtai' }});
    },
    goMainPage(){
      this.$router.push({ path:'/'});
    },
    logOut(){
       let _this = this;
        this.$axios({
            method: 'post',
            url: '/knbolg/user/logOut.do',
            headers:{
                "Content-Type":"application/json;charset=UTF-8"
            }
        }).then( (response) => {
            console.log(response.data);
            _this.$router.push({ path:'/login'});
            _this.$store.commit("cleanLogin");
        })
        .catch(function (error) {
          
        });
    },
    checkNewMessageFun(){
       let _this = this;
       this.$axios({
            method: 'post',
            url: '/knbolg/systemMessage/checkNewMessage.do',
            headers:{
                "Content-Type":"application/json;charset=UTF-8"
            }
        }).then( (response) => {
            _this.newMessageCount = response.data.integer;
        })
        .catch(function (error) {
          
        });
    },
     // 消息通知
    info() {
        const self = this
        this.$Notice.info({
            title: `您有${this.newMessageCount}条消息`,
            render(h) {
                return h('Button', {
                    attrs: {
                        type: 'info',
                        size: 'small'
                    },
                    on: {
                        click() {
                            self.checkNewMessage = false;
                            sessionStorage.setItem("msgType","systemMsg");
                            self.$router.push({ name: 'systemMsg'});
                        }
                    },
                  
                }, [
                    '点击查看',
                ])
            },
            duration:2
        })
      },
  },
  watch: {
    newMessageCount:function(newValue,oldValue){
       if (newValue > 0) {
          this.checkNewMessage = true;
       }
    }
  },
  mounted() {
    if(this.$store.state.user.userId != 0){
      this.checkNewMessageFun();
    }
  },
};
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.otherMenu{
    background-color: #fff;
    height: 102px;
    width: 95px;
    -webkit-box-shadow: 0 1px 6px rgba(0,0,0,.2);
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    position: absolute;
    right: 126px;
    top: 65px;
    z-index: 99999;
}


.otherMenu ul{
    list-style: none;
}

.otherMenu li{
    height: 34px;
    text-align: center;
    padding-top: 8px;
    color: #1a2a3a;
    cursor: pointer;
}



.menuBar {
  /* 最外层 Div*/
  width: 100%;
  background-color: #0084ff;
  height: 60px;
}

.menuLogo {
  /* logo层 Div*/
  height: 60px;
  float: left;
  padding-top: 12px;
}

.menuImg {
  /* logo层 img*/
  width: 35px;
  margin: 0px 8px 11px 41px;
}
.menuSpan {
  /* logo层 span*/
  margin-left: 13px;
  font-size: 25px;
  font-family: 微软雅黑;
  font-weight: 100;
  margin-right: 22px;
  color: #fff;
}

.menuContent {
  /* 菜单层 Div*/
  float: left;
  height: 60px;
}

.menuContent ul {
  /* 菜单层 u'l*/
  list-style: none;
  height: 59px; 
  width: 384px;
}

.menuContent ul li {
  /* 菜单层 li*/
  float: left;
  padding-top: 19px;
}

.menuContent ul li span {
  /* 菜单层 span*/
  font-size: 18px;
  color: #fff;
  margin-right: 25px;
  margin-left: 50px;
  cursor: pointer;
}

.searchInput{
    width: 300px;
    height: 60px;
    margin-left: 38px;
    float: left;
    /* background-color: #aaa; */
    text-align: center;
}

.searchInput-input{
    padding-left: 5px;
    overflow: hidden;
    font-family: 微软雅黑;
    font-size: 14px;
    border: none;
    margin-top: 17px;
    height: 32px;
     border-radius: 4px;
    width: 250px;
}

.searchIcon{
    color: #8590a6;
    display: block;
    position: absolute;
    /* float: left; */
    right: 491px;
    top: 17px;
    font-size: 17px;
    height: 32px;
    width: 31px;
    padding-top: 7px;
    
    cursor: pointer;
}

.searchIcon:hover{
    color: #0084ff;
}

.LoginOrRegist {
  /*最右侧登录注册层 DIV*/
  float: right;
  height: 60px;
  width: 266px;
}

.LoginOrRegist ul {
  /*最右侧登录注册层 ul*/
  list-style: none;
  height: 60px;
}

.LoginOrRegist ul li {
  /*最右侧登录注册层 li*/
  float: right;
  padding-top: 19px;
  margin-right: 32px;
  position: relative;
  cursor: pointer;
}

.LoginOrRegist ul li i {
  /*最右侧登录注册层  图标 i*/
  color: #fff;
  position: absolute;
  top: 20px;
  right: 48px;
}

.LoginOrRegist ul li span {
  /*最右侧登录注册层 span*/
  color: #fff;
}

.havlingLine {
  /*最右侧登录注册层 分割线 div*/
  height: 21px;
  width: 2px;
  background-color: #fff;
  margin-top: 3px;
  cursor: auto;
}

.MessageOrLogout{
    float: left;
    width: 220px;
    text-align: center;
    height: 60px;
      margin-left: 241px;
    position:relative;
}
.MessageOrLogout i{
      color: #fff;
    /* margin-top: 22px; */
    font-size: 18px;
    width: 24px;
    cursor: pointer;
}

.MessageOrLogout-headIcon{
    width: 30px;
    height: 30px;
    /* font-size: large; */
    display: inline-block;
    /* margin-top: 3px; */
 
        position: absolute;
    top: 14px;
    right: 21px;
}

.MessageOrLogout-headIcon img{
  width:33px;
  height:33px;
  border-radius:6px;
  cursor:pointer;
}

</style>
