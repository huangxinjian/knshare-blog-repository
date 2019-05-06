<template>
    <div class="blogDetailPageDiv">
        <div style="width:100%;height:60px">
            <MenuBar class="fixMenu"></MenuBar>
        </div>
        <div class="blogDeatilLeftProfile">
            <div class="leftAuthor">
                <div class="authorProfile">
                     <img style="cursor:pointer" @click="goBloggerBlogList" :src="$store.state.articleBlogger.userInformation.headIconUrl">
                    <span class="authorName">{{$store.state.articleBlogger.userInformation.nickName}}</span>
                  
                </div>
                <div class="authorOperator">
                    <div class="focusFans" v-if="($store.state.articleBlogger.userName != $store.state.user.userName) && showGuanzhuButton" @click="foucsHimOrHer">
                        <span>关注</span>
                    </div>
                    <div class="AlreadyfocusFans" v-else>
                        <span>已关注</span>
                    </div>
                    <div class="sendPrivateMsg" @click="sendPrivateMessage">
                        <span>发私信</span>
                    </div>
                </div>
                <div class="authorMsg">
                        <div class="attentionPerson">
                            <span class="title">关注</span>
                            <span class="number">{{$store.state.bloggerRelation.attentionsNo}}</span>
                        </div>
                        <div class="fans">
                             <span class="title">粉丝</span>
                            <span class="number">{{$store.state.bloggerRelation.fansNo}}</span>
                        </div>
                        <div class="blogNo">
                            <span class="title">博客</span>
                            <span class="number">{{$store.state.bloggerRelation.blogNo}}</span>
                        </div>
                </div>
                
            </div>
            <div class="leftGene">
                <div class="labelDiv">
                    <div></div>
                    <span>博主基因库</span>
                </div>
                <div class="geneDiv">
                    <ul class="geneUl">
                        <li class="geneLi" v-for="item in $store.state.bloggerGenePool" 
                        :key="item.geneId" @click="loadGeneArticleList(item.geneId,item.geneName)">{{item.geneName}}</li>
                    </ul>
                    <ul class="geneUlCount" >
                        <li class="geneLiCount" v-for="item in $store.state.bloggerGenePool" 
                                                :key="item.geneId">{{item.articleNo}}篇</li>
                    </ul>
                </div>
            </div>

            <div class="leftService">
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
                        <img style="width: 50px;height: 50px;display:block;margin-bottom: 5px;" src="../../assets/images/blogMain/wechatCode.jpg"/>
                        <span>微信客服</span>
                    </div>
                </div>
            </div>
        </div>   
        <div class="blogDetailRightContent" v-if="$route.params.articleId != 'blogList'  && $route.params.articleId != 'geneList' ">
           <BlogDetailContent></BlogDetailContent> 
        </div>
        <div class="blogDetailRightContentList" v-else-if="$route.params.articleId == 'blogList'">
            <div style="background-color:white;width:100%;height:33px;padding-top: 8px;padding-left: 14px;border-bottom: 1px solid #f4f4f4;">
                <Checkbox v-model="onlyOriginal">只看原创</Checkbox>
            </div>
            <UserBlogList v-for="(blog,index) in $store.state.bloggerBlogList" 
                                :key="index"
                                :title="blog.articleDto.title"
                                :articleType="blog.articleDto.articleType"
                                :abstracts="blog.articleDto.abstracts"
                                :publishTime="blog.articleDto.publishTime"
                                :blogId="blog.articleDto.articleId"
                                :readCount="blog.readCount"
                                :commentCount="blog.commentCount"></UserBlogList>
           
            <div style="background-color:white;width:100%;height:50px;text-align: center;padding-top: 10px;" v-if="$store.state.PageParams.totalRecord > 7">
                <Page :total="$store.state.PageParams.totalRecord" :page-size="$store.state.PageParams.limit" prev-text="上一页" next-text="下一页" @on-change="nextPageData" />
            </div>
        </div>
        <div class="blogDetailRightContentList" v-else>
            <div style="background-color:white;width:100%;height:33px;padding-top: 8px;padding-left: 14px;border-bottom: 1px solid #f4f4f4;">
                <span>全部文章 > </span><span>{{$store.state.geneBlogList.geneName}}</span>
            </div>
            <UserBlogList v-for="(blog,index) in $store.state.geneBlogList.blogList" 
                                :key="index"
                                :title="blog.articleDto.title"
                                :articleType="blog.articleDto.articleType"
                                :abstracts="blog.articleDto.abstracts"
                                :publishTime="blog.articleDto.publishTime"
                                :blogId="blog.articleDto.articleId"
                                :readCount="blog.readCount"
                                :commentCount="blog.commentCount"></UserBlogList>
           
            <div style="background-color:white;width:100%;height:50px;text-align: center;padding-top: 10px;" v-if="$store.state.PageParams.totalRecord > limit">
                <Page :total="$store.state.PageParams.totalRecord" :page-size="$store.state.PageParams.limit" prev-text="上一页" next-text="下一页" @on-change="nextPageData" />
            </div>
        </div>
        <!-- <div class="commentDiv">
             <div class="commentCommitDiv">
                    <img class="commentUserIcon" :src="$store.state.userInfo.headIconUrl"/>
                    <Input v-model="commentContent" placeholder="Enter something..." style="width: 574px;margin-left:15px;" />
             </div>
        </div> -->
        <div class="zhanWeiZhide"></div>
        <div class="blogSlideBar" v-if="$route.params.articleId != 'blogList'">
            <div class="markDiv" 
                 v-on:mouseenter="hideMarkIcon()"
                 v-on:mouseleave="showMarkIcon()">
                <i v-if="markIcon == true" class="fa fa-bookmark-o fa-2x"></i>
                <span v-else @click="collectionThisArticle()">收藏</span>
            </div>
            <div class="commentingDiv"
                v-on:mouseenter="hideCommentIcon()"
                 v-on:mouseleave="showCommentIcon()">
                <i v-if="commentIcon == true" class="fa fa-commenting-o fa-2x" aria-hidden="true"></i>
                <span v-else @click="loadArticleComment()">评论</span>
            </div>
            
            <div class="share"
                 v-on:mouseenter="hideShareIcon()"
                 v-on:mouseleave="showShareIcon()">
                <i v-if="shareIcon == true" class="fa fa-share fa-2x" aria-hidden="true"></i>    
                <span v-else>转载</span>
            </div>

            <div class="share"
                 v-on:mouseenter="hideTriangle()"
                 v-on:mouseleave="showTriangle()">
                <i v-if="triangleIcon == true" class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i>    
                <span v-else  @click="reportThisArticle()">举报</span>
            </div>
            
        </div>

         <Modal v-model="showTriangleModal" scrollable width="400">
             <p slot="header" style="color:#2d8cf0;text-align:left">
                <span style="margin-left: 7px;">举报博文</span>
            </p>
            <div style="text-align:center;">
              <p style="color:#1a2a3a;font-size:15px;">请确认该博文存在不合法内容！</p>
            </div>
            <div slot="footer">
                <Button type="error" @click="submitReport">确认举报</Button>
            </div>

        </Modal>
        
        <Modal v-model="showCommentStatus" width="653" scrollable :styles="{top: '20px'}" v-if="($route.params.articleId != 'blogList') && ($route.params.articleId != 'geneList')">
            <p slot="header" style="color:#1a2a3a;text-align:left">
                <i class="fa fa-comments" style="font-size:15px;"></i>
                <span style="margin-left: 7px;">{{commentList.length}}条评论</span>
                <span class="ascOrder" @click="reserveCommentList"><i class="fa fa-exchange fa-1x" style="margin-right: 5px;"></i>{{sortTip}}</span>
            </p>
            <div :style="{'height':commenDivContentHeight+'px','transition':'height 300ms ease-out 0s'}" style="text-align:center;overflow-y:auto;overflow-x:hidden;">
                <p v-if="showNoneCommentTag == true" style="color:#2d8cf0;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>暂无评论,赶快来发表你的精彩言论吧！</span>
                </p>
                <CommentDetailDiv v-else 
                                  v-for="item in commentList" 
                                  :key="item.commentId"
                                  :commentId="item.commentId"
                                  :commentPublishTime="item.commentPublishTime"
                                  :content="item.content"
                                  :parent="item.parent"
                                  :userinfo="item.user.userInformation"
                                  @showThisReplayFunction="showThisReplayFun"
                                  @addReplyComment="addReplyCommentFun"
                                  @deleteComentFunction="deleteCommentFun"></CommentDetailDiv>
               
            </div>
            <div slot="footer" v-if="this.$store.state.user.userId != 0">
                 <img class="commentUserIcon" :src="$store.state.userInfo.headIconUrl"/>
                <Input v-model="commentContent" placeholder="在此输入你的评论..." type="textarea" 
                        autosize  style="width: 515px;margin-right:5px;" />
                 <Button type="info" size="default"   @click="commitComment">提交</Button>
            </div>
        </Modal>

        <Modal v-model="showThisAllReplyStatus" scrollable @on-cancel="hideThisAllReply" width="650" :styles="{top: '20px'}" v-if="($route.params.articleId != 'blogList') && ($route.params.articleId != 'geneList')">
            <p slot="header" style="color:#1a2a3a;text-align:left">
                <span style="margin-left: 7px;">查看对话</span>
            </p>
            <div :style="{'height':replyDivContentHeight+'px'}" style="text-align:center;overflow-y:auto;overflow-x:hidden;">
                <div class="parentComment">
                     <CommentReplyDiv
                                    :commentId="JSON.stringify(parentComment)!='{}'?parentComment.commentId:0"
                                    :commentPublishTime="JSON.stringify(parentComment)!='{}'?parentComment.commentPublishTime:'0'"
                                    :content="JSON.stringify(parentComment)!='{}'?parentComment.content:''"
                                    :parent="JSON.stringify(parentComment)!='{}'?parentComment.parent:{}"
                                    :userinfo="JSON.stringify(parentComment)!='{}'?parentComment.user.userInformation:{}"
                                   ></CommentReplyDiv>
                    <div class="huiSeTiaoWen"></div>
                    <div class="replyNumberDiv">
                        共{{thisCommentReply.length}}条回复
                    </div>
                     <p v-if="thisCommentReply.length == 0" style="color: #858585;text-align: center;font-size: 15px;margin-top: 26px;">
                        <Icon type="ios-information-circle"></Icon>
                        <span>暂无回复,赶快来发表你对该回复的意见吧！</span>
                    </p>
                    <CommentReplyDiv v-else
                                    v-for="item in thisCommentReply"
                                    :key="item.commentId"
                                    :commentId="item.commentId"
                                    :commentPublishTime="item.commentPublishTime"
                                    :content="item.content"
                                    :parent="item.parent"
                                    :userinfo="JSON.stringify(item.user)!='{}'?item.user.userInformation:{}"
                                   
                                   ></CommentReplyDiv>
                </div>
            </div>
            <div slot="footer">
              
            </div>
        </Modal>
        
        
    </div>
</template>

<script>
import MenuBar from "@/components/common/MenuBar.vue";
import BlogDetailContent from "@/components/blog/BlogDetailContent.vue";
import UserBlogList from "@/components/blog/UserBlogList.vue";
import CommentDetailDiv from "@/components/blog/CommentDetailDiv.vue";
import CommentReplyDiv from "@/components/blog/CommentReplyDiv.vue";

export default {
 
    name:'blogDetailPage',
    components: {
       MenuBar,
       BlogDetailContent,
       CommentDetailDiv,
       CommentReplyDiv,
       UserBlogList,
    },
    methods:{
        foucsHimOrHer(){  // 关注某个人的函数
         if(this.$store.state.user.userId == 0){
            this.$Message.info("请先登录");
            this.$router.push({ name: 'Login'});
            return;
        }
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/userRelation/addAttention.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.$store.state.articleBlogger.userId
            }).then( (response) => {
                console.log(response);
                 _this.$Message.info('关注成功！');
                 _this.showGuanzhuButton = false;                    
            })
            .catch(function (error) {
                _this.$Message.info('关注失败！请重新尝试！');
            });
        },
        showMarkIcon(){
            this.markIcon = true;
        },
        hideMarkIcon(){
            this.markIcon = false;
        },
        showCommentIcon(){
            this.commentIcon = true;
        },
        hideCommentIcon(){
            this.commentIcon = false;
        },
        showShareIcon(){
            this.shareIcon = true;
        },
        hideShareIcon(){
            this.shareIcon = false;
        },
        showTriangle(){
            this.triangleIcon = true;
        },
        hideTriangle(){
            this.triangleIcon = false;
        },
        reportThisArticle(){  // 举报该文章,显示模态框
           let _this = this;
           this.showTriangleModal=true;
            
        },
        submitReport(){ // 提交举报
            let _this = this;
            if (this.$store.state.user.userId == this.$store.state.articleBlogger.userId) {
                _this.$message({
                        type: 'error',
                        message: '不能举报自己的博文！'
                });
                _this.showTriangleModal = false;
                return;
            }
           this.$axios({
                method: 'post',
                url: '/knbolg/illegal/insertNewIllegal.do',
                data:{
                    'articleId':_this.$store.state.articleDetail.articleId,
                    'title':_this.$store.state.articleDetail.title,
                    'user':{
                        'userId':_this.$store.state.articleBlogger.userId,
                    }
                },
                }).then( (response) => {
                    // console.log(response.data);
                    _this.$message({
                        type: 'success',
                        message: '举报成功！请等待管理员审核！'
                    });
                    _this.showTriangleModal = false;
                })
            .catch(function (error) {
                console.log(error);
            });
        },
        loadArticleComment(){ // 加载文章评论
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/comment/loadCommentByArticleId.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'article':{
                        'articleId':_this.$store.state.articleDetail.articleId
                    },
                }
            }).then( (response) => {
                console.log(response);
                _this.$Message.success('加载评论成功！');
                _this.showCommentStatus = true; // 显示模态框
                if(response.data.result != 0){
                    _this.showNoneCommentTag = false; // 隐藏无评论信息
                    _this.commenDivContentHeight = 500; // 设置高度
                    _this.commentList = response.data.commentDtoList;
                }
            })
            .catch(function (error) {
                _this.$Message.info('加载评论失败！请重新尝试！');
            });
        },
        commitComment(){  // 提交评论
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/comment/insertComment.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'content':_this.commentContent, // 评论的内容
                    'user':{
                        'userId':_this.$store.state.user.userId
                     } , // 评论人
                    'article':{
                        'articleId':_this.$store.state.articleDetail.articleId
                    },
                }
            }).then( (response) => {
                if(response.data.integer == 1){
                    _this.$Message.success('添加评论成功！');
                    _this.showNoneCommentTag = false; // 隐藏无评论信息
                    _this.commenDivContentHeight = 500;
                    let obj = response.data.commentDto;
                    obj.user.userInformation = _this.$store.state.userInfo
                    _this.commentContent=''; // 清空评论框的内容
                    _this.commentList.unshift(obj);
                }
            })
            .catch(function (error) {
                _this.$Message.info('添加评论失败！请重新尝试！');
            });

        },
        showThisReplayFun(result,commentDtoList){   // 显示单条评论的模态框，同时隐藏多条评论的模态框
            this.thisCommentReply = commentDtoList;
            this.parentComment = this.thisCommentReply[0];
            this.thisCommentReply.splice(0,1);
            if(this.thisCommentReply.length != 0){
                this.replyDivContentHeight=500;
            }
            this.showThisAllReplyStatus = true;
            this.showCommentStatus = false;
        },
        hideThisAllReply(){  // 显示多条评论的模态框，同时隐藏单条评论的模态框
            this.showThisAllReplyStatus = false;
            this.showCommentStatus = true;
        },
        addReplyCommentFun(obj){  // 添加回复
            console.log(obj);
            this.commentList.unshift(obj);
        },
        deleteCommentFun(id){  // 删除回复
            //首先找出id对应的索引位置
            let i = 0;
            for (let index = 0; index < this.commentList.length; index++) {
               if(this.commentList[index].commentId == id){
                   i = index;
                   break;
               } 
            }
             this.commentList.splice(i,1);
             if(this.commentList.length == 0){
                 this.showNoneCommentTag = true; // 显示无评论信息
                 this.commenDivContentHeight = 50;
             }
        },
        reserveCommentList(){
            if(this.commentList.length == 0){
                this.$Message.info("当前博文暂无评论！");
            }
            if(this.sortTip == '按照时间倒序'){
                 this.sortTip = '按照时间正序'
                this.commentList.reverse();
            }else{
                this.sortTip = '按照时间倒序'
                this.commentList.reverse();
            }
            
        },
        nextPageData(value){   // 分页插件执行的函数
            console.log("页数是："+value);
            this.page = value;
            if(this.$route.params.articleId=='blogList'){
                this.$Message.info("进入了blogList");
                this.goBloggerBlogList();
            }else if(this.$route.params.articleId=='geneList'){
                this.$Message.info("进入了geneList");
                this.loadGeneArticleList(this.$store.state.geneBlogList.geneId,this.$store.state.geneBlogList.geneName);
            }
         },
         loadGeneArticleList(geneId,geneName){  // 加载基因对应的文章
            this.$Message.info(""+geneId);
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/article/loadArticleByGeneId.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'page':_this.page,
                    'limit':_this.limit,
                    'geneId':geneId
                }
            }).then( (response) => {
                console.log(response.data);
                _this.$store.commit("updatePageParam",{
                    page : response.data.pageParams.page,
                    limit : response.data.pageParams.limit,
                    totalPage : response.data.pageParams.totalPage,
                    totalRecord : response.data.pageParams.totalRecord,
                });
                _this.$store.commit("updateGeneBlogList", {
                    geneId:geneId,
                    geneName:geneName,
                    blogList:response.data.pageParams.content});
                // store.commit("updateBloggerGenePool",response.data.genePool);
                _this.$router.push({ name: 'blogDetailPage', params: {userName: _this.$store.state.articleBlogger.userInformation.nickName
                ,articleId:'geneList'}});
                // _this.$Message.info('获取列表成功');
            })
            .catch(function (error) {
                console.log(error);
                _this.$Message.info('获取列表失败');
            });


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
                    'page':_this.page,
                    'limit':_this.limit,
                    'userId':_this.$store.state.articleBlogger.userId
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
        collectionThisArticle(){
            if(this.$store.state.user.userId == 0){
                this.$Message.info("请先登录");
                this.$router.push({ name: 'Login'});
                return;
            }
             let _this = this;
             this.$axios({
                method: 'post',
                url: '/knbolg/collection/insertCollect.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.$store.state.articleDetail.articleId
            }).then( (response) => {
                console.log(response.data);
                if(response.data.success){
                    _this.$Message.success(response.data.msg);
                }else{
                    _this.$Message.error(response.data.msg);
                }
               
            })
            .catch(function (error) {
                console.log(error);
                _this.$Message.info('收藏文章失败');
            });
        },
        sendPrivateMessage(){ // 发送私信
          if(this.$store.state.user.userId == 0){
                this.$Message.info("请先登录");
                this.$router.push({ name: 'Login'});
                return;
            }
            if (this.$store.state.articleBlogger.userId == this.$store.state.user.userId) {
                this.$Message.error("不能给自己发私信");
                return;
            }
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/friendList/insertNewFriendList.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.$store.state.articleBlogger.userId
            }).then( (response) => {
                _this.$router.push({ name: 'chatting'});
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    data() {
        return {
            commentContent:'',  //评论的内容
            markIcon:true,
            commentIcon:true,
            shareIcon:true,
            triangleIcon:true,
            showCommentStatus:false, // 展示 评论的modal
            commenDivContentHeight:50, //评论模态框的高度
            replyDivContentHeight:250, //回复模态框的高度
            pageParams:{
                page:1,
                limit:5
            },
            showNoneCommentTag:true, // 一条评论都没有
            commentList:[], //评论列表
            showThisAllReplyStatus:false, // 是否显示某一条评论的具体回复的modal
            thisCommentReply:[],  // 这条评论的所有有关回复
            parentComment:{},
            sortTip:'按照时间倒序',
            hideArticleGuanZhu:false,
            onlyOriginal:false,
            page:1,
            limit:7,
            showGuanzhuButton:true,
            showTriangleModal:false,
            
        }
    },
    beforeMount(){
        let _this = this;
        this.$axios({
            method: 'post',
            url: '/knbolg/userRelation/checkAttentionStatus.do',
            headers:{
                    "Content-Type":"application/json;charset=UTF-8"
            },
            data:_this.$store.state.articleBlogger.userId
        }).then( (response) => {
            console.log(response.data);
            _this.showGuanzhuButton = response.data.result;
        })
        .catch(function (error) {
            _this.$Message.info('关注查询失败！请重新尝试！');
        });
    },
    mounted(){
        
    }
    
}
</script>


<style scoped>

.blogDetailPageDiv{
    width: 100%;
    background-color: #f6f6f6;
}

.blogDeatilLeftProfile{
    width: 29%;
    height: 800px;
    background-color: #f6f6f6;
    display: block;
    margin-top: 15px;
    float: left;
}

.blogDetailRightContent{
    width: 57%;
    height: 800px;
    background-color: #f6f6f6;
    display: inline-block;
    margin-top: 15px;
}

.blogDetailRightContentList{
    width: 57%;
    height: 800px;
    background-color: #f6f6f6;
    display: inline-block;
    margin-top: 15px;
}
.leftAuthor{
    width: 65%;
    height: 175px;
    margin-left: 31%;
    background-color: #fff;
         box-shadow: 5px 3px 12px rgba(0,0,0,.08);
}

.authorProfile{
    width: 100%;
    height: 67px;
    background-color: #fff;
    display: inline-block;
    border-bottom: 1px solid #e3e3e3;
}

.authorOperator{
    height: 50px;
    border-bottom: 1px solid #e3e3e3;
    padding-top: 11px;
}

.authorProfile img {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(244, 244, 244, 0.5);
    border-radius: 33px;
    display: inline-block;
    margin-top: 9px;
    margin-left: 26px;
}

.authorProfile .authorName{
    display: inline-block;
    vertical-align: middle;
    font-size: 15px;
    color: #1a2a3a;
    margin-left: 9px;
    font-weight: bold;
}

.leftGene{
    width: 65%;
    min-height: 246px;
    margin-left: 31%;
    background-color: #fff;
    margin-top: 15px;
    padding-bottom: 11px;
    position: relative;
    -webkit-box-shadow: 5px 3px 12px rgba(0,0,0,.08);
    box-shadow: 5px 3px 12px rgba(0,0,0,.08);

}

.focusFans{
    display: inline-block;
    background-color: #fff;
    width: 73px;
    text-align: center;
    height: 27px;
    border: 1px solid #2d8cf0;
    border-radius: 5px;
    color: #2d8cf0;
    cursor: pointer;
    margin-left: 33px;
    padding-top: 4px;
}

.AlreadyfocusFans{
    display: inline-block;
    color: #fff;
   background-color: #2d8cf0;
    width: 73px;
    text-align: center;
    height: 27px;
    border: 1px solid #2d8cf0;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 33px;
    padding-top: 4px;
}
.focusFans:hover{
    color: #fff;
   background-color: #2d8cf0;
}

.sendPrivateMsg{
    display: inline-block;
    background-color: #fff;
    width: 73px;
    text-align: center;
    height: 27px;
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    cursor: pointer;
    margin-left: 70px;
    padding-top: 4px;
}

.sendPrivateMsg:hover{
   color: #fff;
   background-color: red;
}

.authorMsg{
    height: 74px;
    padding-top: 10px;
}

.authorMsg .attentionPerson {
  width: 33%;
  float: left;
  height: 47px;
  text-align: center;
}

.authorMsg .fans {
  width: 33%;
  float: left;
  height: 47px;
  text-align: center;
}

.authorMsg .blogNo {
  color: #1a2a3a;
  width: 33%;
  float: left;
  height: 47px;
  text-align: center;
}

.authorMsg .number {
  font-size: 13px;
  display: block;
  font-weight: bold;
}

.authorMsg .title {
    font-size: 12px;
    display: block;
    color: #1a2a3a;
}


.labelDiv{
    width: 100%;
    height: 43px;
    padding: 15px;
}

.labelDiv div{
    width: 4px;
    height: 18px;
    background-color: #55a5ef;
    float: left;
    margin-right: 5px;
    margin-top: 1px;
}

.labelDiv span{
    font-size: 14px;
    color: black;
    font-weight: bold
}


.geneUl{
    list-style: none;
    padding-left: 14px;
    padding-top: 4px;
    /* position: absolute; */
    /* float: left; */
    width: 54%;
    /* margin-right: 0px; */
}

.geneLi{
    height: 25px;
    font-size: 13px;
    color: #1a2a3a;
    cursor: pointer;
}

.geneLi:hover{
    color: #2d8cf0;;
}


.geneUlCount{
    list-style: none;
    padding-left: 16px;
    padding-top: 4px;
    /* float: right; */
    margin-right: 19px;
    text-align: right;
    position: absolute;
    top: 44px;
    right: 3px;
}

.geneLiCount{
    height: 25px;
    font-size: 12px;
    color: #aaa;
}

.zhanWeiZhide{
    height: 100px;
    background-color: #f6f6f6;
}

.blogSlideBar{
    height: 152px;
    width: 36px;
    position: fixed;
    background-color: #fff;
    top: 76px;
    right: 148px;
    box-shadow: -7px 3px 12px rgba(0,0,0,.08);
}

.blogSlideBar i{
    display: block;
    text-align: center;
    height: 38px;
    padding-top: 8px;
    border-bottom: 1px solid #858585;
    cursor: pointer;
}

.blogSlideBar span{
    display: block;
    text-align: center;
    height: 38px;
    padding-top: 8px;
    border-bottom: 1px solid #858585;
    cursor: pointer;
    font-weight: bold;
    color: #2d8cf0;
}

.leftService{
    background-color: #fff;
    width: 65%;
    margin-left: 136px;
    height: 200px;
    margin-top: 15px;
    box-shadow: 7px 3px 12px rgba(0,0,0,.08);
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

.commentDiv{
    width: 57%;
    min-height: 150px;
    background-color: #fff;
    margin-left: 29%;
    margin-top: 24px;
}

.commentCommitDiv{
    width: 85%;
    height: 50px;
    margin: 0px auto;
    padding-top: 12px
}

.commentUserIcon{
    float: left;
    width: 35px;
    height: 35px;
    border-radius: 25px;
    margin-left: -1px;
}

.ascOrder{
    float:right;
    margin-right: 36px;
    margin-top: 2px;
    color: #76839b;
    cursor:pointer;
}

.ascOrder:hover{
     color: #2d8cf0;
}

.parentComment{
    width: 100%;
}
.huiSeTiaoWen{  /*回复框的灰色条纹*/
    width: 100%;
    height: 7px;
    background-color:#f6f6f6;
}

.replyNumberDiv{
    width: 100%;
    height: 36px;
    background-color: #fff;
    /* padding: 12px 0 10px; */
    border-bottom: 1px solid #f6f6f6;
    font-weight: 500;
    text-align: left;
    font-size: 14px;
    padding: 9px 0 0 12px;
    color: #1a2a3a;
    -webkit-box-shadow: 7px 0px 12px rgba(0,0,0,.08);
    box-shadow: 7px 0px 12px rgba(0,0,0,.08);
}
</style>
