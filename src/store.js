import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      userId:0,
      userName:'',
      password:null,
      phoneCode:null,
      phoneNo:null,
    },
    userInfo:{
      nickName:"",
      email:"",
      gender:"",
      headIconUrl:"",
      phoneNumber:"",
      registerTime:"",
      workingTruth:"",
      selectSort:"",
    },
    userRelation:{
      fansNo:0,
      attentionsNo:0,
      attentionsDetail:[],
      fansDetail:[]
    },
    blogNo:0,
    categoryData:[],
    customCategoryData:[],
    myBlogList:[],
    articleDetail:{}, //某一篇文章的详细信息
    PageParams:{  // 公用的分页信息
      page:0,
      limit:0,
      totalPage:0,
      totalRecord:0
    },
    bloggerBlogList:[],
    articleBlogger:{
      password:"",
      userId:0,
      userInformation:{
        headIconUrl:"",
        nickName:"",
        userInfoId:0,
      },
      userName:''
    }, // 博客主的信息
    bloggerRelation:{
      fansNo:0,
      attentionsNo:0,
      blogNo:0,
    },
    bloggerGenePool:[],
    geneBlogList:{
      geneId:0,
      geneName:'',
      blogList:[]
    }, // 专门保存基因查出来的文章
    userCommentList:[], // 用户个人中心查出来的评论
    myCommentList:[],
    dynamicList:[], // 动态List
    myAllGenePool:[],
    myCollectionList:[],// 收藏list
    theTopTenList:[],
    firstBlog:{},
    secondBlog:{},
    editorArticle:{
      content:'',
      title:'',
      articleId:''
    },
    startSearch:false
  },
  mutations: {
    saveStartSearch(state,flag){
      state.startSearch = flag;
    },
    saveLoginUser(user){
      state.user = user;
    },
    updateUserInfo(state,userinfo){
      state.userInfo.nickName = userinfo.nickName;
      state.userInfo.email = userinfo.email;
      state.userInfo.gender = userinfo.gender;
      state.userInfo.phoneNumber = userinfo.phoneNumber;
      state.userInfo.workingTruth = userinfo.workingTruth;
      state.userInfo.selectSort = userinfo.selectSort
    },
    updateBlogList(state,blogList){
      state.myBlogList = blogList;
    },
    spliceBlogList(state,index){
      state.myBlogList.splice(index,1);
    },
    updateMyCollectionList(state,myCollectionList){
      state.myCollectionList = myCollectionList;
    },
    spliceMyCollectionList(state,index){
      state.myCollectionList.splice(index,1);
    },
    updatePageParam(state,playLoad){
      state.PageParams.page = playLoad.page;
      state.PageParams.limit = playLoad.limit;
      state.PageParams.totalPage = playLoad.totalPage;
      state.PageParams.totalRecord = playLoad.totalRecord;
    },
    updateArticleBlogger(state,playLoad){
      state.articleBlogger.userId = playLoad.userId,
      state.articleBlogger.userInformation.headIconUrl = playLoad.headIconUrl
      state.articleBlogger.userInformation.nickName = playLoad.nickName
      state.articleBlogger.userInformation.headIconUrl = playLoad.headIconUrl
    },
    updateBloggerRelation(state,relation){
      state.bloggerRelation.fansNo = relation.fansNo;
      state.bloggerRelation.attentionsNo = relation.attentionsNo;
      state.bloggerRelation.blogNo = relation.blogNo;
    },
    updateBloggerGenePool(state,genePool){
      state.bloggerGenePool = genePool;
    },
    updateGeneBlogList(state,playLoad){
      state.geneBlogList =  playLoad 
    },
    updateuserRelationfans(state,playLoad){
      state.userRelation.fansDetail = playLoad;
    },
    updateUserCommentList(state,commentList){
      state.userCommentList = commentList;
    },
    spliceUserCommentList(state,index){
      state.userCommentList.splice(index,1);
    },
    updateMyCommentList(state,myCommentList){
      state.myCommentList = myCommentList;
    },
    spliceMyCommentList(state,index){
      state.myCommentList.splice(index,1);
    },
    updateDynamicList(state,dynamicList){
      state.dynamicList = dynamicList;
    },
    updateMyAllGenePool(state,myAllGenePool){
      state.myAllGenePool = myAllGenePool;
    },
    spliceMyAllGenePool(state,index){
      state.myAllGenePool.splice(index,1);
    },
    updateHeadIconUrl(state,url){
      state.userInfo.headIconUrl = url;
    },
    updateTheTopTenList(state,topTenList){
      state.theTopTenList = topTenList;
      state.firstBlog = state.theTopTenList[0];
      state.secondBlog = state.theTopTenList[1];
      state.theTopTenList.splice(0,1);
      state.theTopTenList.splice(0,1);
    },
    updateEditorArticle(state,playLoad){
      state.editorArticle.title = playLoad.title;
      state.editorArticle.content = playLoad.content;
      state.editorArticle.articleId = playLoad.articleId;
    },
    updateCategoryData(state,playLoad){
      state.categoryData = playLoad;
    },
    updateCustomCategoryData(state,playLoad){
      state.customCategoryData = playLoad;
    },
    cleanLogin(state){
      state.user = {};
      state.user.userName = '';
      state.userInfo = {};
      state = {};
      window.sessionStorage.removeItem("store");
    }
  },
  actions: {

  },
  getters: {
    samePeople:function(state){  // 访问 store.getters.samePeople
      let newArr = [];
      let arr1 = JSON.stringify(state.userRelation.attentionsDetail);
      let arr2 = JSON.stringify(state.userRelation.fansDetail);
        if (arr1 != "[]") {
          if( arr2 != "[]" && typeof arr2 != "undefined"){
            for (let i = 0; i < state.userRelation.fansDetail.length; i++) {
              for (let j = 0; j < state.userRelation.attentionsDetail.length; j++) {
                if(state.userRelation.attentionsDetail[j].userInfoId == state.userRelation.fansDetail[i].userInfoId){
                    newArr.push(state.userRelation.attentionsDetail[j]);
                }
            }
          }
        }
      }
      return newArr;
    }
  }
})
