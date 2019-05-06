<template>
    <div class="personalCenterContainer">
        <MenuBar></MenuBar>
        <div class="ProfileHeader">
            <div class="card">
                <div class="ProfileHeader-userCover">
                    <!-- <Upload action="/knbolg/user/updateBackGrountImg.do" class="uploadCoverButton">
                        <Icon type="ios-camera" size="25" color="#fff" style="position: absolute;
                                                                              top: 4px;
                                                                              left: 5px;"/>
                        <Button type="default" style="width: 114px; padding-left: 31px;" ghost>编辑背景图片</Button>
                    </Upload> -->
                </div>
                <div class="ProfileHeader-wrapper">
                    <div class="ProfileHeadIcon">
                        <updateHeadIconUrl></updateHeadIconUrl>
                        <!-- <img :src="$store.state.userInfo.headIconUrl" style="width: 100%;" alt="" srcset=""> -->
                    </div>
                    <div class="ProfileHeader-content">
                        <div  class="ProfileHeader-contentHeader">
                             <h1>
                                <span class="ProfileHeader-UserName">{{$store.state.userInfo.nickName}}</span>
                            </h1>
                        </div>
                        <div  class="ProfileHeader-contentBody">
                                <div class="contentDetail" :style="{'height':height}">
                                    <div v-if="showDetailContent==false" style="height:72px;">
                                        <i class="fa fa-mars " style="margin-top: 7px;;font-size: 1.4em;font-weight:bold;color: #8590A6;" aria-hidden="true"></i>
                                    </div>    
                                    <div v-else-if="showDetailContent==true" style="height:148px;">
                                        <div class="detailDiv" v-if='msgInfo[0] != "" && msgInfo[0] != null'>
                                            <span class="detailTitle">性别</span>
                                            <span class="detailValue">{{$store.state.userInfo.gender == "MALE" ? "男性" : "女性"}}</span>
                                        </div>
                                        <div class="detailDiv" v-if='msgInfo[1] != "" && msgInfo[1] != null'>
                                            <span class="detailTitle">邮箱</span>
                                            <span class="detailValue">{{$store.state.userInfo.email}}</span>
                                        </div>
                                        <div class="detailDiv" v-if='msgInfo[2] != "" && msgInfo[2] != null'>
                                            <span class="detailTitle">手机号码</span>
                                            <span class="detailValue">{{$store.state.userInfo.phoneNumber}}</span>
                                        </div>
                                        <div class="detailDiv" v-if='msgInfo[3] != "" && msgInfo[3] != null'>
                                            <span class="detailTitle">工作状态</span>
                                            <span class="detailValue">{{$store.state.userInfo.workingTruth == "working" ? "工作中" : "待业中"}}</span>
                                        </div>
                                        <div class="detailDiv" v-if='msgInfo[4] != "" && msgInfo[4] != null'>
                                            <span class="detailTitle">行业方向</span>
                                            <span class="detailValue">{{$store.state.userInfo.selectSort}}</span>
                                        </div>
                                    </div>
                                </div>
                            <span v-if="showDetailContent==false" style="display:block;margin-top: 11px;cursor:pointer;position: absolute;    bottom: 12px;" @click="showDetail"> 
                                <Icon type="ios-arrow-down" size="19" color="#8590A6"/>
                                <span style="margin-left: 7px;color:#8590A6">查看详细资料</span>
                            </span> 
                            <span  v-else-if="showDetailContent==true"  style="display:block;margin-top: 7px;cursor:pointer;position: absolute;    bottom: 12px;" @click="hideDetail"> 
                                <Icon type="ios-arrow-up" size="19" color="#8590A6"/>
                                <span style="margin-left: 7px;color:#8590A6">收起详细资料</span>
                            </span> 
                            <Button type="primary" style="position: absolute;left: 86%;bottom: 4%;" ghost @click="showInfoModalFunction">编辑个人资料</Button>
                        </div>
                       
                    </div>
                </div>
                <changeUserInfo :showInfoModal = "showInfoModalStatus" @hideInfoModalFunction="hideInfoModalFunction"></changeUserInfo>
            </div>
        </div>
        <div :style="{'min-height':328+'px','backgroundColor':'#f4f4f4','padding-bottom': '5px'}">
            <div class="ProfileMain" ref="ProfileMain">
                <div class="ProfileMain-UI">
                        <Menu v-bind:active-name="presentMenu" ref="presentMenu" mode="horizontal" theme="light" @on-select="returnName">
                            <MenuItem name="0" :to="{ name: 'personalCenter', params: { userId: $store.state.user.userName ,activeSort:'dongtai'}}">
                                动态
                            </MenuItem>
                            <MenuItem name="1" :to="{ name: 'personalCenter', params: { userId: $store.state.user.userName ,activeSort:'boke'}}">
                                博客
                            </MenuItem>
                            <MenuItem name="2" :to="{ name: 'personalCenter', params: { userId: $store.state.user.userName ,activeSort:'pinglun'}}">
                                评论管理
                            </MenuItem>
                            <MenuItem name="3" :to="{ name: 'personalCenter', params: { userId: $store.state.user.userName ,activeSort:'gerenshoucang'}}">
                                个人收藏 
                            </MenuItem>
                            <MenuItem name="4" :to="{ name: 'personalCenter', params: { userId: $store.state.user.userName ,activeSort:'guanzhu'}}">
                                关注
                            </MenuItem>
                            <MenuItem name="5" :to="{ name: 'personalCenter', params: { userId: $store.state.user.userName ,activeSort:'jiyinku'}}">
                                基因库
                            </MenuItem>
                            <MenuItem name="6" :to="{ name: 'personalCenter', params: { userId: $store.state.user.userName ,activeSort:'changePwd'}}">
                                修改密码
                            </MenuItem>
                           
                        </Menu>
                </div>
                <div class="ProfileMain-Content">
                    <div class="ProfileMain-Content-Title">
                        <ul>
                            <li v-for="(item,index) in subSort[nowFatherIndex]" 
                                    :key="index" 
                                    :class="[changeWeight==index?'liWeight':'']"
                                    @click="searchSubSort(index)"
                                    >
                                    {{item}}</li>
                        </ul>
                    </div>
                    <div style="clear:both"></div>

                     <div class="ProfileMain-Content-Body" style="margin-bottom: 7px;padding-left: 21px; transition: height 300ms ease-out 0s;"  v-if="$route.params.activeSort=='dongtai'">  <!-- 动态列表 -->
                        <Timeline>
                                <TimelineItem v-for="(item,index) in $store.state.dynamicList" :key="index" v-if="index<showDynamicNo" >
                                    <p class="dongtaiTime">{{item.time}}</p>
                                    <p class="dongtaiContent" v-for="(obj,index) in item.objectList" :key="index" >
                                        <span  v-if="obj.commentId != null ">
                                            <i class="fa fa-commenting-o fa-lg"  style="margin-right: 6px;color: #19be6b;font-weight: bold;"></i>
                                            <span style="color:#76839b;    margin-right: 6px;">你对博客</span>
                                            <span style="color:#1a2a3a;margin-left: 6px;">
                                                <i class="fa fa-angle-double-left" style="margin-right:0px;" aria-hidden="true"></i>
                                                {{obj.article.title}}
                                                <i class="fa fa-angle-double-right" style="margin-left:0px;" aria-hidden="true"></i>
                                            </span>
                                            <span style="color:#76839b;    margin-left: 6px;    margin-right: 6px;">发表了自己的见解</span>
                                            <span style="color:#1a2a3a">“ {{obj.content}} ”</span>
                                        </span>
                                        <span  v-else-if="obj.articleId!=null">
                                            <i class="fa fa-pencil-square-o fa-lg" style="margin-right: 6px;color: #2d8cf0;font-weight: bold;"></i>
                                            <span style="color:#76839b;">发表了博客</span>
                                            <span style="color:#1a2a3a;margin-left: 6px;">
                                                <i class="fa fa-angle-double-left" style="margin-right:0px;" aria-hidden="true"></i>
                                                {{obj.title}}
                                                <i class="fa fa-angle-double-right" style="margin-left:0px;" aria-hidden="true"></i>
                                            </span>
                                        </span>
                                    </p>
                                </TimelineItem>
                                <TimelineItem v-if="showDynamicNo < $store.state.dynamicList.length">
                                    <span class="lookMoreDynamic" @click="lookMoreDynamic">查看更多</span>
                                </TimelineItem>
                            </Timeline>
                    </div>

                    <div class="ProfileMain-Content-Body"  v-if="$route.params.activeSort=='boke'">  <!-- 博客列表 -->

                        <blogDiv v-for="(blog,index) in $store.state.myBlogList" 
                                :key="index"
                                :title="blog.articleDto.title"
                                :articleType="blog.articleDto.articleType"
                                :abstracts="blog.articleDto.abstracts"
                                :publishTime="blog.articleDto.publishTime"
                                :articleId = "blog.articleDto.articleId"
                                :readNo = "blog.readCount"
                                :commentNo = "blog.commentCount"
                        ></blogDiv>
                        <Page class="page" :total="$store.state.PageParams.totalRecord" :page-size="$store.state.PageParams.limit"  size="small" show-total @on-change="nextPageData"/>
                    </div>
                   

                     <div class="ProfileMain-Content-Body"  v-if="$route.params.activeSort=='pinglun'&&subSort[nowFatherIndex][changeWeight]=='博客的评论'">
                        <blogComment v-for="item in $store.state.userCommentList" 
                                    :key="item.commentId"
                                    :commentId="item.commentId"
                                    :commentTime="item.commentPublishTime"
                                    :commentContent="item.content"
                                    :commentPeople="item.user"
                                    :article="item.article"></blogComment>
                        <Page class="page"  :total="$store.state.PageParams.totalRecord" :page-size="$store.state.PageParams.limit"  size="small" show-total @on-change="nextPageData"/>
                    </div>
                     <div class="ProfileMain-Content-Body"  v-if="$route.params.activeSort=='pinglun'&&subSort[nowFatherIndex][changeWeight]=='发表的评论'">
                        <myComment v-for="item in $store.state.myCommentList" 
                                    :key="item.commentId"
                                    :commentId="item.commentId"
                                    :commentTime="item.commentPublishTime"
                                    :commentContent="item.content"
                                    :commentPeople="item.user"
                                    :article="item.article"
                                    :parent="item.parent"></myComment>
                        <Page class="page"  :total="$store.state.PageParams.totalRecord" :page-size="$store.state.PageParams.limit"  size="small" show-total @on-change="nextPageData"/>
                    </div>

                     <div class="ProfileMain-Content-Body"  
                        v-if="$route.params.activeSort=='guanzhu'&&subSort[nowFatherIndex][changeWeight]=='关注我的人'">
                        <FansPeople v-for="item in $store.state.userRelation.fansDetail"
                                    :key="item.userInfoId"
                                    :userId="item.userInfoId"
                                    :headIconUrl="item.headIconUrl"
                                    :nickName="item.nickName"
                                    :jobSort="item.selectSort"></FansPeople>
                        <Page class="page" :current="page" :total="$store.state.PageParams.totalRecord" :page-size="$store.state.PageParams.limit" size="small"  show-total @on-change="nextPageData"/>
                    </div>

                    <div class="ProfileMain-Content-Body"  
                        v-if="$route.params.activeSort=='guanzhu'&&subSort[nowFatherIndex][changeWeight]=='我关注的人'">
                        <FocusPeople v-for="item in $store.state.userRelation.attentionsDetail"
                                    :key="item.userInfoId"
                                    :userId="item.userInfoId"
                                    :headIconUrl="item.headIconUrl"
                                    :nickName="item.nickName"
                                    :jobSort="item.selectSort"></FocusPeople>
                        <Page class="page" :current="page" :total="$store.state.PageParams.totalRecord" :page-size="$store.state.PageParams.limit" size="small" show-total @on-change="nextPageData"/>
                    </div>

                    <div class="ProfileMain-Content-Body"  
                        v-if="$route.params.activeSort=='jiyinku'&&subSort[nowFatherIndex][changeWeight]=='我的基因库'">
                        <GeneListDiv></GeneListDiv>
                        <Page class="page" :current="page" :total="$store.state.PageParams.totalRecord" :page-size="$store.state.PageParams.limit"  size="small" show-total @on-change="nextPageData"/>
                    </div>

                    <div class="ProfileMain-Content-Body" v-if="$route.params.activeSort=='changePwd'" style="padding-left: 22px;min-height: 220px;margin-bottom: 15px;padding-top: 16px;">
                        <div style="    margin-bottom: 15px;">
                         <label>旧密码：</label><Input v-model="oldPwd" type="password" placeholder="请输入旧密码" clearable style="width: 300px;margin-right:15px;" />
                        </div>
                        <div style="margin-bottom: 25px;">
                         <label>新密码：</label><Input v-model="newPwd" type="password" placeholder="请输入新密码" clearable style="width: 300px;margin-right:15px;" />
                        </div>
                        <Button type="success" @click="changePassword" >确认修改</Button>
                    </div>

                    <div class="ProfileMain-Content-Body" v-if="$route.params.activeSort=='gerenshoucang'" style="padding-left: 22px;min-height: 255px;margin-bottom: 15px;padding-top: 12px;position:relative;">
                        <collectionList v-for="item in $store.state.myCollectionList" 
                                        :key="item.articleId"
                                        :articleId="item.articleId"
                                        :title="item.title"
                                        :collectionTime="item.collectionTime"></collectionList>
                       

                        <Page class="page" 
                              :current="page" 
                              :total="$store.state.PageParams.totalRecord" 
                              :page-size="$store.state.PageParams.limit" 
                              size="small"
                              show-total
                              @on-change="nextPageData"
                              style="position: absolute;bottom: 0;left: 171px;"/>
                    </div>
                </div>

                 
            </div>
        </div>
    </div>
</template>

<script>

    import MenuBar from '@/components/common/MenuBar.vue'
    import changeUserInfo from '@/components/user/changeUserInfo.vue'
    import blogDiv from '@/components/blog/BlogDiv.vue'
    import blogComment from '@/components/blog/BlogCommentDiv.vue'
    import GeneListDiv from '@/components/blog/GeneListDiv.vue'
    import myComment from '@/components/blog/MyCommentDiv.vue'
    import FocusPeople from '@/components/blog/FocusPeople.vue'
    import FansPeople from '@/components/blog/FansPeople.vue'
    import updateHeadIconUrl from '@/components/user/updateHeadIconUrl.vue'
    import collectionList from '@/components/blog/collectionList.vue'
    
    export default {
        name:'personalCenter',
        components:{MenuBar,blogDiv,blogComment,FocusPeople,FansPeople,changeUserInfo,myComment,GeneListDiv,collectionList,updateHeadIconUrl},
        data() {
            return {
                showDetailContent:false,
                height:'72px',
                msgInfo:[
                    this.$store.state.userInfo.gender,
                    this.$store.state.userInfo.email,
                    this.$store.state.userInfo.phoneNumber,
                    this.$store.state.userInfo.workingTruth,
                    this.$store.state.userInfo.selectSort,
                ],  //到时候这里就是我们读取的用户详细信息，用来判断每一个值是否为null，如果为null，height就动态改变
                subSort:[
                   ['我的动态'],
                   ['原创','转载'],
                   ['博客的评论','发表的评论'],
                   ['我的收藏'],
                   ['我关注的人','关注我的人'],
                   ['我的基因库'],
                   ['修改密码']
                ],
                nowFatherIndex:0, // 现在父路由所在的索引
                changeWeight:0, //控制子分类字体变粗
                contentBodyHeight:200,
                presentRoute:{  //当前的路由代表了 subSort 的索引
                    'dongtai':'0',
                    'boke':'1',
                    'pinglun':'2',
                    'gerenshoucang':'3',
                    'guanzhu':'4',
                    'jiyinku':'5',
                    'changePwd':'6'
                },
                presentMenu:'0',
                showInfoModalStatus:false,  //显示修改个人信息的modal
                myBlogList:[],
                pageParam:{
                    page:0,
                    limit:0,
                    totalPage:0,
                    totalRecord:0
                },
                page:1,
                limit:4,
                fansDetail:[],  // 粉丝的具体信息
                attentionsDetail:[],
                showDynamicNo:3,
                oldPwd:'',
                newPwd:''
                
            }
        },
        methods: {
            showDetail(){ // 显示个人信息detail
                let count = 1;
                for (let index = 0; index < this.msgInfo.length; index++) {
                    if (this.msgInfo[index] != "" && this.msgInfo[index] != null) {
                        count++; //计算height
                    }
                }
                this.height = 35*count+'px';
                this.showDetailContent = true;
            },
            hideDetail(){ // 隐藏个人信息detail
                this.height = '72px';
                 this.showDetailContent = false;
            },
            returnName(name){ // 主菜单执行的事件
                this.changeWeight = 0;
                this.nowFatherIndex = name;
                 this.page = 1;
                if(name == 0){
                    this.findUserDynamic();
                }
                else if(name == 1){  // 1 就代表了 boke
                    this.loadMyBlog();
                }else if(name == 2){  // 2 就代表了comment
                    this.loadOtherCommentForMyBlog();  // 加载别人对我的博客评论
                }else if(name == 3 ) {// 3 代表了个人收藏
                    this.loadMyCollection();
                }else if(name == 4 ) {// 4 代表了关注
                    this.loadMyAttention();
                }else if(name == 5 ) {// 5 代表了基因库
                    this.loadMyGeneList();
                }else if(name == 6 ) {// 6 代表了修改密码

                }
            },
            searchSubSort(index){   // 点击子菜单执行的事件
                this.changeWeight = index;
                console.log(this.$route.params.activeSort+this.subSort[this.nowFatherIndex][index]);
                this.page = 1;
                if(this.subSort[this.nowFatherIndex][index] == "关注我的人"){
                    this.loadMyFans();
                }else if(this.subSort[this.nowFatherIndex][index] == "我关注的人"){
                    this.loadMyAttention();
                }else if(this.subSort[this.nowFatherIndex][index] == "博客的评论"){
                    this.loadOtherCommentForMyBlog();
                }else if(this.subSort[this.nowFatherIndex][index] == "发表的评论"){
                    this.loadMyPublishCommentForOtherBlog();
                }else if(this.subSort[this.nowFatherIndex][index] == "我的基因库"){
                    this.loadMyGeneList();
                }else if(this.subSort[this.nowFatherIndex][index] == "我的收藏"){
                    this.loadMyCollection();
                }
            },
            showInfoModalFunction(){ // 显示个人信息模态框
                this.showInfoModalStatus = true;
            },
            hideInfoModalFunction(){ // 隐藏个人信息模态框
                this.showInfoModalStatus = false;
            },
            loadMyBlog(){ //加载我的博客
                let _this = this;
                let store = this.$store;
                this.$axios({
                    method: 'post',
                    url: '/knbolg/article/findArticleByUserId.do',
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    data:{
                        'page':_this.page,
                        'limit':_this.limit
                    }
                }).then( (response) => {
                 
                    console.log(response.data.pageParams);
                    _this.myBlogList = response.data.pageParams.content;
                    store.state.myBlogList = response.data.pageParams.content;
                    store.commit("updatePageParam",{
                        page : response.data.pageParams.page,
                        limit : response.data.pageParams.limit,
                        totalPage : response.data.pageParams.totalPage,
                        totalRecord : response.data.pageParams.totalRecord,
                    })
                   
                })
                .catch(function (error) {
                    _this.$Message.info('获取列表失败');
                });
            },
            loadMyFans(){ //加载我的粉丝
                let _this = this;
                let store = this.$store;
                this.$axios({
                    method: 'post',
                    url: '/knbolg/userRelation/loadMyFans.do',
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    data:{
                        'page':_this.page,
                        'limit':6
                    }
                }).then( (response) => {
                    console.log(response.data.pageParams);
                    store.commit("updateuserRelationfans",response.data.pageParams.content)
                    store.commit("updatePageParam",{
                        page :response.data.pageParams.page,
                        limit :response.data.pageParams.limit,
                        totalPage: response.data.pageParams.totalPage,
                        totalRecord :response.data.pageParams.totalRecord,
                    })
                })
                .catch(function (error) {
                    _this.$Message.info('获取列表失败');
                });
            },
            loadMyAttention(){ // 加载我的关注
                 
                let _this = this;
                let store = this.$store;
                this.$axios({
                    method: 'post',
                    url: '/knbolg/userRelation/loadMyAttention.do',
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    data:{
                        'page':_this.page,
                        'limit':6
                    }
                }).then( (response) => {
                    console.log(response.data.pageParams);
                    _this.attentionsDetail = response.data.pageParams.content;
                    _this.$store.state.userRelation.attentionsDetail = response.data.pageParams.content;
                    store.commit("updatePageParam",{
                        page : response.data.pageParams.page,
                        limit : response.data.pageParams.limit,
                        totalPage : response.data.pageParams.totalPage,
                        totalRecord : response.data.pageParams.totalRecord,
                    })
                })
                .catch(function (error) {
                    _this.$Message.info('获取列表失败');
                });
            },
            loadOtherCommentForMyBlog(){  // 加载我的评论
                this.$Message.info("加载评论INg");
                let _this = this;
                let store = this.$store;
                this.$axios({
                    method: 'post',
                    url: '/knbolg/comment/loadOtherCommentForMyBlog.do',
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    data:{
                        'page':_this.page,
                        'limit':6
                    }
                }).then( (response) => {
                    console.log(response.data);
                    // _this.attentionsDetail = response.data.pageParams.content;
                    // _this.$store.state.userRelation.attentionsDetail = response.data.pageParams.content;
                    store.commit("updateUserCommentList",response.data.pageParams.content);
                    store.commit("updatePageParam",{
                        page : response.data.pageParams.page,
                        limit : response.data.pageParams.limit,
                        totalPage : response.data.pageParams.totalPage,
                        totalRecord : response.data.pageParams.totalRecord,
                    })
                })
                .catch(function (error) {
                    _this.$Message.info('获取列表失败');
                });
            },
            loadMyPublishCommentForOtherBlog(){  // 加载我发表的评论
                this.$Message.info("加载评论INg");
                let _this = this;
                let store = this.$store;
                this.$axios({
                    method: 'post',
                    url: '/knbolg/comment/loadMyPublishCommentForOtherBlog.do',
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    data:{
                        'page':_this.page,
                        'limit':6
                    }
                }).then( (response) => {
                    console.log(response.data);
                    // _this.attentionsDetail = response.data.pageParams.content;
                    // _this.$store.state.userRelation.attentionsDetail = response.data.pageParams.content;
                    store.commit("updateMyCommentList",response.data.pageParams.content);
                    store.commit("updatePageParam",{
                        page : response.data.pageParams.page,
                        limit : response.data.pageParams.limit,
                        totalPage : response.data.pageParams.totalPage,
                        totalRecord : response.data.pageParams.totalRecord,
                    })
                })
                .catch(function (error) {
                    _this.$Message.info('获取列表失败');
                });
            },
            findUserDynamic(){  // 加载我的动态
                let _this = this;
                let store = this.$store;
                this.$axios({
                    method: 'post',
                    url: '/knbolg/dynamic/findUserDynamic.do',
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    data:{
                        'page':_this.page,
                        'limit':100
                    }
                }).then( (response) => {
                    console.log(response.data);
                   
                    store.commit("updateDynamicList",response.data.dynamicEntityList);
                    
                })
                .catch(function (error) {
                    _this.$Message.info('获取列表失败');
                });
            },
            nextPageData(value){ //下一页
                let sort = this.$route.params.activeSort;
                console.log(sort);
                let subSort = this.subSort[this.nowFatherIndex][this.changeWeight];
                console.log(this.subSort[this.nowFatherIndex][this.changeWeight]);
                this.page = value;
                if(sort == 'boke'){
                    this.loadMyBlog();
                }else if(sort == 'guanzhu'){
                    if(subSort == "关注我的人"){
                        this.loadMyFans();
                    }else if(subSort == "我关注的人"){
                        this.loadMyAttention();
                    }
                }else if(sort == "pinglun"){
                    if(subSort == "博客的评论"){
                        this.loadOtherCommentForMyBlog();
                    }else if(subSort == "发表的评论"){
                        this.loadMyPublishCommentForOtherBlog();
                    }
                }else if(sort =="jiyinku"){
                    this.loadMyGeneList();
                }else if(sort == "gerenshoucang"){
                    this.loadMyCollection();
                }
            },
            lookMoreDynamic(){ // 加载我的动态
                let temp = this.showDynamicNo;
                if( (temp+=2)<this.$store.state.dynamicList.length){
                    this.showDynamicNo = temp;
                }else{
                     this.showDynamicNo= this.$store.state.dynamicList.length;
                }
            },
            loadMyGeneList(){ // 加载我的基因List
                let _this = this;
                let store = this.$store;
                this.$axios({
                    method: 'post',
                    url: '/knbolg/genePool/loadMyGeneList.do',
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    data:{
                        'page':_this.page,
                        'limit':4
                    }
                }).then( (response) => {
                    console.log(response.data);
                   
                    store.commit("updateMyAllGenePool",response.data.pageParams.content);
                      store.commit("updatePageParam",{
                        page : response.data.pageParams.page,
                        limit : response.data.pageParams.limit,
                        totalPage : response.data.pageParams.totalPage,
                        totalRecord : response.data.pageParams.totalRecord,
                    })
                })
                .catch(function (error) {
                    _this.$Message.info('获取列表失败');
                });
            },
            changePassword(){  // 修改密码
                if(this.oldPwd == this.newPwd){
                     this.$Message.error("新密码须于旧密码不一致");
                     return;
                }
                let _this = this;
                this.$axios({
                    method: 'post',
                    url: '/knbolg/user/changePassword.do',
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    data:{
                        'oldPwd':_this.oldPwd,
                        'newPwd':_this.newPwd
                    }
                }).then( (response) => {
                    console.log(response.data);
                    if(response.data.success == true){
                        _this.$Message.success(response.data.msg);
                    }else{
                        _this.$Message.error(response.data.msg);
                    }
                    
                })
                .catch(function (error) {
                    _this.$Message.error('获取列表失败');
                });
            },
            loadMyCollection(){ // 加载我的收藏
                let _this = this;
                this.$axios({
                    method: 'post',
                    url: '/knbolg/collection/findCollectionByUserId.do',
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    data:{
                        'page':_this.page,
                        'limit':4
                    }
                }).then( (response) => {
                    console.log(response.data);
                    _this.$store.commit("updateMyCollectionList",response.data.pageParams.content);
                    _this.$store.commit("updatePageParam",{
                        page : response.data.pageParams.page,
                        limit : response.data.pageParams.limit,
                        totalPage : response.data.pageParams.totalPage,
                        totalRecord : response.data.pageParams.totalRecord,
                    })
                    
                })
                .catch(function (error) {
                    
                    _this.$Message.error('获取列表失败');
                });
            }

        },
        computed: {
          
        },
        
        watch:{
            myBlogList (newVal, oldVal) {
                this.$store.state.myBlogList = newVal;
            },
        },
        beforeMount(){
            this.findUserDynamic();
        },
        mounted() {
            this.showDynamicNo = 3;
            this.$nextTick(function () { //dom更新后再操作
                this.presentMenu = this.presentRoute[this.$route.params.activeSort];
                this.nowFatherIndex = this.presentRoute[this.$route.params.activeSort];
                this.$refs.presentMenu.updateActiveName();
            })
        },
    }
</script>

<style scoped>



.personalCenterContainer{ /*整个个人中心最外层div*/
    width: 100%;
    background-color: #f4f4f4;
    min-height: 688px; 
}

.ProfileHeader{  /*个人中心头部位置*/
    position: relative;
    width: 911px;
    background-color: #fff;
    /* height: 343px; 485px */
    /* padding-top: 10px; */
    margin: 10px auto;
}

.card{  /*个人中心上半部分卡片DIV*/
    background-color: #fff;
}

.ProfileHeader-userCover{ /*个人中心封面图部分*/

    width: 100%;
    height: 219px;
    background-image: url('../../assets/images/user/userProfile/bloggerBg1.jpg');
    background-size: 101% 129%;
    background-repeat: no-repeat;
}

.uploadCoverButton{
    width: 115px;
    position: absolute;
    top: 17px;
    margin-left: 780px;
}

.ProfileHeader-wrapper{ /*个人中心自我信息部分*/
    width: 100%;
    background-color: #fff;
}

.ProfileHeadIcon{ /*头像*/
    background-color: #FFFFFF;
    border: 4px solid #FFFFFF;
    border-radius: 8px;
    width: 160px;
    height: 160px;
    position: absolute;
    top: 160px;
    left: 26px;
}

.ProfileHeader-content{
    padding-top: 16px;
    padding-left: 50px;
    border-left: 164px solid transparent;
}

.ProfileHeader-contentHeader{
    margin-bottom: 10px;
}

.ProfileHeader-UserName{
    font-size: 27px;
    font-weight: 600;
    font-synthesis: style;
    line-height: 30px;
    color:black;
}
.contentDetail{
    overflow: hidden;
    transition: height 300ms ease-out 0s;
}

.detailDiv{
    width: 250px;
    height: 35px;
}

.detailTitle{
    width: 60px;
    margin-right: 37px;
    font-weight: 600;
}


.ProfileMain{  /*个人中心主体位置*/
    width: 911px;
    margin: 0 auto;
    background-color: #fff;
    min-height:200px;
}
.ProfileMain-Content-Title{
    height: 39px;
    width: 100%;
    border-top: 0px solid #aaa;
    background-color: #fff;
}

.ProfileMain-Content-Title ul{
    list-style: none;
    width: 100%;
    height: 39px;
    padding-top: 9px;
    padding-left: 22px;
}


.ProfileMain-Content-Title ul li{
    float: left;
    font-size: 14px;
    width:125px;
    cursor: pointer;
    color: black;
}

.liWeight{
    font-weight: bold;
}

.page{
    width: 61%;
    padding-top: 12px;
    margin: 10px auto;
    height: 57px;
    text-align: center;
}

   .dongtaiTime{
        font-size: 14px;
        font-weight: bold;
    }
    .dongtaiContent{
        padding-left: 5px;
        height: 23px;
        padding-top: 5px;
    }
    .lookMoreDynamic{
        color: #2d8cf0;
        cursor: pointer;
    }
</style>