<template>
  <div>
    <div style="width:100%;height:60px">
      <MenuBar class="fixMenu"></MenuBar>
    </div>

    <div class="blogMainContainer">
      <div class="leftContainer"  v-if="$store.state.startSearch == false">
        <div class="leftMenu" 
             @mouseenter="showChooseOption"
             @mouseleave="hideChooseOption">
          <ul>
            <li
              :class="{liBgColor:colorStatus[0]}"
              @mouseover="changeColor(0)"
              @mouseleave="restoreColor(0)"
              @click="getContent(0,'推荐',0)"
            >
              <span :class="{spanColor:colorStatus[0]}">推荐</span>
            </li>
            <li
              :class="{liBgColor:colorStatus[1]}"
              @mouseover="changeColor(1)"
              @mouseleave="restoreColor(1)"
              @click="getContent(1,'关注',1)"
            >
              <span :class="{spanColor:colorStatus[1]}">关注</span>
            </li>

            <li
              :class="{liBgColor:colorStatus[index+2]}"
              v-for="(item,index) in sortList"
              :key="index+2"
              @mouseover="changeColor(index+2)"
              @mouseleave="restoreColor(index+2)"
              @click="getContent(index+2,item.categoryName,item.categoryId)"
            >
              <span :class="{spanColor:colorStatus[index+2]}">{{item.categoryName}}</span>
            </li>
          </ul>
          <div style="position: absolute;
                      bottom: 0px;
                      left: -25px;
                      background-color: white;
                      cursor:pointer"
                title="自定义菜单"
                @click="chooseUserUniqueMenu()"
                :style="{'display':showChooseOptionStatus}">
              <Icon size="24" type="md-settings" />
          </div>
          <Modal :scrollable="true" 
                 :closable="false"
                 v-model="chooseUserUniqueMenuStatus"
                 :styles="{top: '80px'}"
                 width="600"
                 @on-ok="submitCategory()"
              >
              <div slot="header" style="color:#1a2a3a;">
                  <span style="font-weight: bold;font-size: 15px;">自定义菜单</span>
                  <span class="clearChooseCate" @click="clearCustomCategory">清空已选择的</span>
              </div>
              <div style="height:450px;overflow-y:auto;overflow-x:hidden;">
                <div v-for="(item,index) in $store.state.customCategoryData" :key="index">
                    <CheckboxGroup v-model="customCategory" style="margin-bottom:2px;">
                        <Checkbox  style="font-size:15px;border-bottom:1px solid rgba(133,133,133,0.2);width:50%;color:#2d8cf0" :label="item.categoryId">{{item.categoryName}}</Checkbox>
                    </CheckboxGroup>
                    <CheckboxGroup v-model="customCategory">
                        <Checkbox  v-for="(child,i) in item.children" 
                                  :key="i" 
                                  :label="child.categoryId"
                                  style="width:15%">{{child.categoryName}}</Checkbox>
                    </CheckboxGroup>
                    <br>
                </div>
              </div>
             
          </Modal>
        </div>
      </div>

      <div class="centerContainer" v-if="$store.state.startSearch == false">
        <div class="centerMenu" >
          <div class="iviewCarousel" v-if="$route.params.blogSort == 0">
            <CarouselIview></CarouselIview>
          </div>
          <div class="blogShowDiv">
              <div v-if="articleList.length == 0" style="text-align: center;padding-top: 24%;">
                  <img src="../../assets/images/404.png">
                  <span style="display: block;color: #2d8cf0;font-size: 18px;">抱歉！目前该板块尚未有文章！</span>
              </div>
              <div v-else>
                  <BlogMainDiv  v-for="item in articleList" 
                              :key="item.articleDto.articleId"
                              :title="item.articleDto.title"
                              :abstracts="item.articleDto.abstracts"
                              :publishTime="item.articleDto.publishTime"
                              :user="item.articleDto.user"
                              :firstCategory = "item.articleDto.firstCategory"
                              :blogId = "item.articleDto.articleId"
                              :readCount="item.readCount"
                              :commentCount="item.commentCount">
                  </BlogMainDiv>
                            
                  <Page class="blogMainpage" :current="pageParam.page" :total="pageParam.totalRecord" :page-size="pageParam.limit" @on-change="nextPageData" show-elevator />
              </div>
          </div>
        </div>
      </div>
      <SearchResult v-else></SearchResult>
      <div class="rightContainer">
        <div class="rightBolger" v-if="$store.state.user.userName != ''">
          <div class="blogerIcon" >
            <img @click="goToPersonalCenter" style="cursor:pointer" :src="$store.state.userInfo.headIconUrl">
          </div>
          <div class="blogerCount">
            <div class="attentionPerson">
              <span class="number">{{$store.state.userRelation.fansNo}}</span>
              <span class="title">关注</span>
            </div>
            <div class="fans">
              <span class="number">{{$store.state.userRelation.attentionsNo}}</span>
              <span class="title">粉丝</span>
            </div>
            <div class="blogNo">
              <span class="number">{{$store.state.blogNo}}</span>
              <span class="title">博客</span>
            </div>
          </div>
          <div class="bolgFunction">
            <div class="writeBlog" @click="goToWriteBlog">
              <i style="color:#8590a6;" class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
              <span>写博客</span>
            </div>
            <div class="saveBlog" @click="goToDraftPage">
              <i style="color:#8590a6;" class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
              <span>草稿箱</span>
            </div>
          </div>
        </div>
        <div class="rightBolger" v-else>
            <div class="blogerIcon" >
            </div>
               <Input style=" margin-top: 10px; width: auto; margin-left: 21px;margin-bottom: 8px;" prefix="md-contact" placeholder="账号/邮箱/手机号" v-model="loginUserName"  />
               <Input prefix="md-lock" placeholder="密码" type="password" style="margin-top: 0px; width: auto; margin-left: 21px;margin-bottom: 8px;"  v-model="loginUserPassword" />
                <span style="    display: block;
    text-align: right;
    margin-right: 20px;
    padding-bottom: 3px;
    color: #2d8cf0;
    height: 20px; cursor:pointer" @click="gotoRegist()">立即注册</span>
               <Button style="    width: 181px;
    margin-left: 22px;" type="primary" @click="gotoLogin()">登录</Button>
        </div>
        <div class="rightSpan">
          <span>您可能感兴趣的博客：</span>
        </div>
        <div class="rightRecommend">
          <ul>
            <li :key="0">
              <div v-if="JSON.stringify($store.state.firstBlog) != {}">
                <div class="firstNo noDiv">1</div>
                <span class="rankListSpan"  @click="goBlogDetailPage($store.state.firstBlog.articleId,$store.state.firstBlog.user.userId)">{{$store.state.firstBlog.title.substring(0,12)}}...</span>
              </div>
            </li>
            <li :key="1" >
              <div v-if="JSON.stringify($store.state.secondBlog) != {}">
                <div class="secondNo noDiv">2</div>
                <span class="rankListSpan"  @click="goBlogDetailPage($store.state.secondBlog.articleId,$store.state.secondBlog.user.userId)">{{$store.state.secondBlog.title.substring(0,12)}}...</span>
              </div>
            </li>

            <li v-for="(item,index) in $store.state.theTopTenList" :key="index+2">
                <div v-if="JSON.stringify($store.state.secondBlog) != {}">
                    <div class="noDiv">{{index+3}}</div>
                    <span  class="rankListSpan" @click="goBlogDetailPage(item.articleId,item.user.userId)">{{item.title.substring(0,12)}}...</span>
              </div>
            </li>

          </ul>
        </div>
        <div class="rightService">
            <div class="labelDiv">
                <div></div>
                <span>联系客服</span>
            </div>
            <div class="contactInformation">
                <div class="QQ">
                    <span>QQ: 924168702</span>
                   
                </div>
                <div class="email">
                    <span>邮箱：924168702@qq.com</span>
                </div>
                <div class="wechat">
                    <img  style="width: 50px;height: 50px;display:block;margin-bottom: 5px;" src="../../assets/images/blogMain/wechatCode.jpg"/>
                    <span>微信客服</span>
                </div>
            </div>
        </div>
      </div>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>


<script>
import MenuBar from "@/components/common/MenuBar.vue";
import Footer from "@/components/common/Footer.vue";
import CarouselIview from "@/components/common/CarouselIview.vue";
import BlogMainDiv from '@/components/blog/BlogMainDiv.vue';
import SearchResult from '@/components/blog/SearchResult.vue';

export default {
  name: "blogMain",
  components: {
    MenuBar,
    Footer,
    CarouselIview,
    BlogMainDiv,
    SearchResult
  },
  data() {
    return {
      leftMenuList: ["民生", "娱乐", "生活", "股票", "汽车", "时尚"],
      menuUrl:['tuijian','guanzhu','minsheng','yule','shenghuo','gupiao','qiche','shishang'],
      colorStatus: [true, false, false, false, false, false, false, false, false, false, false, false],
      chooseStatus: [true, false, false, false, false, false, false, false, false, false, false, false],
      hotBlog:[
          {title:'10个相见恨晚的Java练手项目'},
          {title:'Java18今天终于发布啦！'},
          {title:'2099年人类实现在空中飞行！'},
          {title:'阿里巴巴商业巨头终于落下帷幕。'},
          {title:'中国GDP已经遥遥领先世界36年'},
      ],
      sort:'推荐',
      sortList:{

      },
      articleList:[],
      pageParam:{
          page:1,
          limit:6,
          totalPage:0,
          totalRecord:0,
          current:1
      },
      chooseUserUniqueMenuStatus:false,
      showChooseOptionStatus:'none',
      customCategory:[],
      loginUserName:'',
      loginUserPassword:'',
      startSearch:sessionStorage.getItem("startSearch"),

    };
  },
  watch: {
    customCategory:function(newValue){
      if(this.customCategory.length>15){
        this.$Message.error("最多选择十五个分类！");
        this.customCategory.splice(this.customCategory.length-1,1);
      }
    }
  },
  methods: {
    gotoRegist(){
      this.$router.push({name:'Regist'});
    },
    gotoLogin(){
      let _this = this;
      var store = this.$store;
      var router = this.$router;
      this.$axios({
        method: 'post',
        url: '/knbolg/user/login.do',
        data:{
          userName:_this.loginUserName,
          password:_this.loginUserPassword,
        },
        headers:{
          "Content-Type":"application/json;charset=UTF-8"
        }
      }).then(function (response) {
        // console.log(response.data);
        store.state.user= response.data.loginUser;
        store.state.userInfo = response.data.userInfo;
       _this.loadLoginCategory();
          _this.loadTuiJianArticle();
          _this.loadBloggerCount();
        router.push({ name: 'blogMain', params: { blogSort: '0' }});

      })
      .catch(function (error) {
        console.log(error);
      });
    },
    clearCustomCategory(){
      this.customCategory = [];
    },
    chooseUserUniqueMenu(){
      let _this = this;
      if(this.$store.state.customCategoryData.length == 0){
        
          this.$axios({  // 加载分类
            method: 'post',
            url: '/knbolg/category/findParentCategory.do',
          }).then( (response) => {
              _this.$store.commit("updateCustomCategoryData", response.data.categoryList);
          })
          .catch(function (error) {
              _this.$Message.info('获取列表失败');
          });
      }
      _this.customCategory = [];
      _this.chooseUserUniqueMenuStatus = true;
    },
    showChooseOption(){
      if(this.$store.state.user.userId != 0){
        this.showChooseOptionStatus = '';
      }
    },
    hideChooseOption(){
       if(this.$store.state.user.userId != 0){
        this.showChooseOptionStatus = 'none';
      }
    },
    goBlogDetailPage(articleId,userId){
        let _this = this;
        this.$axios({
            method: 'post',
            url: '/knbolg/article/findArticleByArticleId.do',
            headers:{
                    "Content-Type":"application/json;charset=UTF-8"
            },
            data:{
                'articleId':articleId,
                'user':{
                    'userId':userId
                }
            }
        }).then( (response) => {
            console.log(response);
            _this.$store.state.articleDetail = response.data.articleDto;
            _this.$store.state.articleBlogger = response.data.articleDto.user;
            _this.$store.commit("updateBloggerRelation",{
                fansNo:response.data.fans,
                attentionsNo:response.data.icons,
                blogNo:response.data.blogNo,
            });
            _this.$store.commit("updateBloggerGenePool",response.data.genePool);
            _this.$router.push({ name: 'blogDetailPage', params: {userName: response.data.articleDto.user.userInformation.nickName
                ,articleId:response.data.articleDto.articleId}});
        })
        .catch(function (error) {
            _this.$Message.info('加载推荐失败');
        });
    },
    changeColor(index) {
      this.$set(this.colorStatus, index, true);
    },
    restoreColor(index) {
      if (!this.chooseStatus[index]) {
        //说明当前没有被选中
        this.$set(this.colorStatus, index, false);
      }
    },
    getContent(index,name,id) {  // 点击菜单的函数
      /*选择菜单选项*/
      for (let i = 0; i < this.chooseStatus.length; i++) {
        if (index == i) {
          this.$set(this.chooseStatus, index, true);
          this.$set(this.colorStatus, index, true);
          continue;
        }
        this.$set(this.chooseStatus, i, false);
        this.$set(this.colorStatus, i, false);
      }

      this.pageParam.page = 1;
      this.pageParam.limit = 6;
      this.sort = name;

      // this.$Message.info(name+id);
      if(id == 0){
          if(this.$store.state.user.userId == 0){ // 说明未登录
          this.loadAllArticleForTuiJianNoLogin(); // 为未登录的用户做推荐
        }else{
         this.loadTuiJianArticle();
        }
      }else if(id == 1){
        if(this.$store.state.user.userId == 0){
            this.$Message.info("请先登录");
            this.$router.push({ name: 'Login'});
            return;
        }
        this.loadFocusArticle();
        this.$router.push({ name: 'blogMain', params: { blogSort: id }});
      }else{
        this.loadNotZeroAndOneArticleList(name);
        this.$router.push({ name: 'blogMain', params: { blogSort: id }});
      }
       
     
    },
    loadFocusArticle(){  // 加载关注了的人的文章
      let _this = this;
      this.$axios({
          method: 'post',
          url: '/knbolg/article/loadFocusPeopleArticle.do',
          headers:{
                "Content-Type":"application/json;charset=UTF-8"
          },
          data:{
            'page':_this.pageParam.page,
            'limit':_this.pageParam.limit
          }
      }).then( (response) => {
          console.log(response.data);
          _this.articleList = response.data.pageParams.content;
          _this.pageParam.page = response.data.pageParams.page;
          _this.pageParam.limit = response.data.pageParams.limit;
          _this.pageParam.totalPage = response.data.pageParams.totalPage;
          _this.pageParam.totalRecord = response.data.pageParams.totalRecord;
      })
      .catch(function (error) {
          _this.$Message.info('加载分类文章失败');
      });
       
    },
    loadNotZeroAndOneArticleList(name){  // 加载非推荐或非关注的文章
      let _this = this;
      this.$axios({
          method: 'post',
          url: '/knbolg/article/findArticleByUserJobSort.do',
          headers:{
                "Content-Type":"application/json;charset=UTF-8"
          },
          data:{
            'selectSort':name,
            'page':_this.pageParam.page,
            'limit':_this.pageParam.limit
          }
      }).then( (response) => {
          console.log(response.data);
          _this.articleList = response.data.pageParams.content;
          _this.pageParam.page = response.data.pageParams.page;
          _this.pageParam.limit = response.data.pageParams.limit;
          _this.pageParam.totalPage = response.data.pageParams.totalPage;
          _this.pageParam.totalRecord = response.data.pageParams.totalRecord;
      })
      .catch(function (error) {
          _this.$Message.info('加载分类文章失败');
      });

    },
    goToPersonalCenter(){
      this.$router.push({ name: 'personalCenter', params: { userId:this.$store.state.user.userName,activeSort:'dongtai' }});
    },
    goToWriteBlog(){  //去写博客的界面
      this.$store.commit("updateEditorArticle",{
        title:'',
        content:'',
        articleId:0
      });
      sessionStorage.setItem("draftShow",false)
      this.$router.push({ name: 'writeBlog', params: { userId:this.$store.state.user.userName}});
    },
    goToDraftPage(){  // 去草稿箱的界面
       this.$store.commit("updateEditorArticle",{
        title:'',
        content:'',
        articleId:0
      });
      sessionStorage.setItem("draftShow",true)
      this.$router.push({ name: 'writeBlog', params: { userId:this.$store.state.user.userName}});
    },
    loadTuiJianArticle(){  //加载推荐的文章，包括分页的内容也在里面了
        let _this = this;
        this.$axios({
            method: 'post',
            url: '/knbolg/article/findArticleByUserJobSort.do',
            headers:{
                  "Content-Type":"application/json;charset=UTF-8"
            },
            data:{
                'selectSort':_this.$store.state.userInfo.selectSort,
                'page':_this.pageParam.page,
                'limit':_this.pageParam.limit
            }
        }).then( (response) => {
            console.log(response.data);
            _this.articleList = response.data.pageParams.content;
            _this.$router.push({ name: 'blogMain', params: { blogSort: 0 }});
            _this.pageParam.page = response.data.pageParams.page;
            _this.pageParam.limit = response.data.pageParams.limit;
            _this.pageParam.totalPage = response.data.pageParams.totalPage;
            _this.pageParam.totalRecord = response.data.pageParams.totalRecord;
        })
        .catch(function (error) {
            _this.$Message.info('加载推荐失败');
        });
    },
    nextPageData(value){   // 分页插件执行的函数
      let menuId = this.$route.params.blogSort;
      console.log(menuId);
      this.pageParam.page = value;
      console.log("页数是："+this.pageParam.page);
      if(menuId == 0){
        if(this.$store.state.user.userId == 0){ // 说明未登录
          this.loadAllArticleForTuiJianNoLogin(); // 为未登录的用户做推荐
        }else{
         this.loadTuiJianArticle();
        }
      }else if(menuId == 1){
         this.loadFocusArticle();
      }else{
        this.loadNotZeroAndOneArticleList(this.sort);
      }
    },
    submitCategory(){
      // window.reload();
      let _this = this;
      if(_this.customCategory.length == 0){
        this.$Message.error("自定义分类不能为空!");
      }
      this.$axios({
            method: 'post',
            url: '/knbolg/category/setCustomCategory.do',
            headers:{
                  "Content-Type":"application/json;charset=UTF-8"
            },
            data:_this.customCategory
        }).then( (response) => {
            _this.$Message.info('自定义分类成功');
            _this.loadLoginCategory();
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    loadNotLoginCategory(){
      let _this = this;
      this.$axios({  // 加载分类
          method: 'post',
          url: '/knbolg/category/findParentCategory.do',
      }).then( (response) => {
          _this.sortList = response.data.categoryList;

      })
      .catch(function (error) {
          console.log(error);
          _this.$Message.info('获取列表失败');
      });
    },
    loadLoginCategory(){
       let _this = this;
      this.$axios({  // 加载分类
          method: 'post',
          url: '/knbolg/category/findCustomCategoryByUserId.do',
      }).then( (response) => {
          _this.sortList = response.data.categoryList;
      })
      .catch(function (error) {
          console.log(error);
          _this.$Message.info('获取列表失败');
      });
    },
    loadAllArticleForTuiJianNoLogin(){
         let _this = this;
        this.$axios({
            method: 'post',
            url: '/knbolg/article/loadAllArticleForTuiJianNoLogin.do',
            headers:{
                  "Content-Type":"application/json;charset=UTF-8"
            },
            data:{
                'page':_this.pageParam.page,
                'limit':_this.pageParam.limit
            }
        }).then( (response) => {
            console.log(response.data);
            _this.articleList = response.data.pageParams.content;
            _this.$router.push({ name: 'blogMain', params: { blogSort: 0 }});
            _this.pageParam.page = response.data.pageParams.page;
            _this.pageParam.limit = response.data.pageParams.limit;
            _this.pageParam.totalPage = response.data.pageParams.totalPage;
            _this.pageParam.totalRecord = response.data.pageParams.totalRecord;
        })
        .catch(function (error) {
            _this.$Message.info('加载推荐失败');
        });
    },
    loadBloggerCount(){
            // 加载用户的粉丝数量、关注人数、以及博客的数量
           // 加载用户的粉丝数量、关注人数、以及博客的数量
          let _this =this;
          this.$axios({
              method: 'post',
              url: '/knbolg/userRelation/loadUserCount.do',
              headers:{
                    "Content-Type":"application/json;charset=UTF-8"
              },
              data:_this.$store.state.user.userId,
          }).then( (response) => {
            console.log(response)
            _this.$store.state.userRelation.fansNo = response.data.userRelationDto.fansNo
            _this.$store.state.userRelation.attentionsNo = response.data.userRelationDto.attentionsNo
            _this.$store.state.blogNo = response.data.blogNo
          })
          .catch(function (error) {
              _this.$Message.info('加载粉丝失败');
          });
    }
  },
  mounted(){
     let _this = this;
      if(this.$store.state.user.userId == 0){ // 说明未登录
          this.loadNotLoginCategory();
          this.loadAllArticleForTuiJianNoLogin(); // 为未登录的用户做推荐
      }else{
          this.loadLoginCategory();
          this.loadTuiJianArticle();
          this.loadBloggerCount();
      }

       

      

      // 加载推荐的文章，根据UserInfo中的信息
      // this.$axios({
      //     method: 'post',
      //     url: '/knbolg/article/findArticleByUserJobSort.do',
      //     headers:{
      //           "Content-Type":"application/json;charset=UTF-8"
      //     },
      //     data:{
      //         'selectSort':_this.$store.state.userInfo.selectSort,
      //         'page':1,
      //         'limit':6
      //     }
      // }).then( (response) => {
      //     console.log(response.data.pageParams);
      //     _this.articleList = response.data.pageParams.content;
      //     _this.$router.push({ name: 'blogMain', params: { blogSort: 0 }});
      //     _this.pageParam.page = response.data.pageParams.page;
      //     _this.pageParam.limit = response.data.pageParams.limit;
      //     _this.pageParam.totalPage = response.data.pageParams.totalPage;
      //     _this.pageParam.totalRecord = response.data.pageParams.totalRecord;
      // })
      // .catch(function (error) {
      //     _this.$Message.info('加载推荐失败');
      // });

       // 加载阅读数加评论数前十的文章
      this.$axios({
          method: 'post',
          url: '/knbolg/article/findArticleByFrontTen.do',
          headers:{
                "Content-Type":"application/json;charset=UTF-8"
          },
      }).then( (response) => {
          console.log(response.data);
          _this.$store.commit("updateTheTopTenList",response.data.articleList);
      })
      .catch(function (error) {
          console.log(error);
          _this.$Message.info('加载推荐前10失败');
      });

  }
};
</script>

<style scoped>
.fixMenu {
  position: fixed;
  z-index: 99;
}

.blogMainContainer {
  height: 1000px;
  width: 100%;
  background-color: #f4f4f4;
}

.leftContainer {
  float: left;
  width: 20%;
  height: 800px;
  background-color: #f4f4f4;
}

.leftMenu {
  background-color: #fff;
  width: 7%;
  margin: 20px 0 0 163px;
  height: 580px;
  border: 1px solid #fff;
  position: fixed;
}

.leftMenu ul {
  list-style: none;
  padding-top: 5px;
}

.leftMenu ul li {
  text-align: center;
  height: 32px;
  padding-top: 6px;
  margin-bottom: 1px;
  cursor: pointer;
}

.leftMenu ul li span {
  width: 100%;
  height: 100%;
  display: block;
  font-size: 14px;
  color: #707070;
  margin-bottom: 1px;
}

.centerContainer {
  float: left;
  width: 53%;
  height: 950px;
  background-color: #f4f4f4;
}

.centerMenu {
  background-color: #f4f4f4;
  width: 100%;
  margin: 20px 0 0 0;
  height: 950px;
  /* border: 1px solid #fff; */
  /* border-radius: 6px; */
}

.iviewCarousel {
  width: 100%;
  height: 257px;
}

.blogShowDiv {
  position: relative;
  width: 100%;
  height: 697px;
  background-color: #fff;
}

.rightContainer {
  float: left;
  width: 27%;
  height: 800px;
  background-color: #f4f4f4;
}

.rightBolger {
  background-color: #fff;
  width: 59%;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 1.5rem;
  height: 222px;
}

.blogerIcon {
  width: 100%;
  height: 34%;
  padding-top: 35px;
  padding-left: 35.4%;
  margin: 0 auto;
  background-image: url("../../assets/images/blogMain/bloggerBg/blogerBg2.jpg");
  background-size: 100% 129%;
  background-repeat: no-repeat;
  /* margin-top: 9px; */
  /* border: 3px solid #aaa; */
  /* border-radius: 30px; */
}

.blogerIcon img {
  width: 65px;
  height: 65px;
  border: 4px solid rgba(244, 244, 244, 0.5);
  border-radius: 33px;
}

.blogerCount {
  width: 100%;
  height: 86px;
  text-align: center;
  padding-top: 35px;
}

.attentionPerson {
  width: 33%;
  float: left;
  height: 47px;
  border-right: 1px solid #aaa;
}

.fans {
  width: 33%;
  float: left;
  height: 47px;
  border-right: 1px solid #aaa;
}

.blogNo {
  width: 33%;
  float: left;
  height: 47px;
}

.blogerCount .number {
  font-size: 18px;
  display: block;
  font-weight: bold;
}

.blogerCount .title {
  font-size: 12px;
  display: block;
  color: #aaa;
}

.bolgFunction {
  width: 100%;
  height: 59px;
}

.writeBlog {
  width: 33%;
  height: 58px;
  background-color: #fff;
  float: left;
  margin-left: 30px;
  text-align: center;
  padding-top: 10px;
  cursor: pointer;
}

.writeBlog span {
  display: block;
  font-size: 13px;
  margin-top: 4px;
  /* font-family: "\9ED1\4F53"; */
  color: black;
 
}

.saveBlog {
  width: 33%;
  height: 58px;
  margin-left: 15px;
  padding-top: 10px;
  background-color: #fff;
  float: left;
  text-align: center;
    cursor: pointer;
}

.saveBlog span {
  display: block;
  font-size: 13px;
  margin-top: 4px;
  /* font-family: "\9ED1\4F53"; */
  color: black;
}

.rightSpan {
  width: 59%;
  margin-left: 20px;
  margin-bottom: 0.5rem;
  height: 20px;
}

.rightSpan span {
  font-family: 黑体;
  color: black;
}

.rightRecommend {
  background-color: #fff;
  width: 59%;
  margin-left: 20px;
  /* margin-top: 27px; */
  margin-bottom: 1.5rem;
  height: 200px;
}

.rightRecommend ul {
  list-style: none;
  padding: 12px 0 0 11px;
}

.rightRecommend ul li {
  height: 24px;
}

.noDiv {
  width: 15px;
  height: 15px;
  /* padding-bottom: 0px; */
   background-color: #aaa;
  float: left;
  margin-right: 5px;
  font-size: 11px;
  text-align: center;
  margin-top: 1px;
  color: white;
}

.firstNo {
  background-color: red;
}

.secondNo {
  background-color: #55a5ef;
}

.rightRecommend span {
  color: #a8a3a3;
  font-size: 12px;
  font-family: "黑体";
  cursor: pointer;
}

.rankListSpan:hover{
  color:#2d8cf0;
}

.rightService {
  background-color: #fff;
  width: 59%;
  margin-left: 20px;
  height: 200px;
}

.labelDiv{
    width: 100%;
    height: 43px;
    padding: 15px;
}

.labelDiv div{
    width: 3px;
    height: 18px;
    background-color: #55a5ef;
    float: left;
    margin-right: 5px;
    margin-top: 1px;
}

.labelDiv span{
    font-size: 14px;
    color: black;
}

.contactInformation{
    width: 100%;
    height: 155px;
    padding: 10px 0 0 19px
}

.QQ{
    width: 100%;
    height: 25px;
    background-color: #fff;
}

.contactInformation span{
    color: #aaa;
}

.email{
    width: 100%;
    height: 25px;
    background-color: #fff;
}

.wechat{
    width: 100%;
    height: 25px;
    background-color: #fff;
}



.liBgColor {
  background-color: #0084ff;
}

.spanColor {
  color: #fff !important;
}

.blogMainpage{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-top: 4px;
    margin: 0 auto;
    height: 47px;
    text-align: center;
}

.clearChooseCate{
   margin-left: 66%;color: rgb(118, 131, 155);font-size: 13px;font-weight: bold;cursor: pointer;
}

.clearChooseCate:hover{
  color: #ca0c16;
}
</style>
