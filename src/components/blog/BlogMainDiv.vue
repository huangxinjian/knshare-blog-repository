<template>
    <div class="bolgMainBrief">
        <div class="blogMainTitle">
            <span class="blogMainTitle-real" style="font-weight:bold;color:black;font-size:18px" @click="goBlogDetailPage">{{title}}</span>
        </div>
        <div class="blogMainContent">
            <p>{{abstracts}}
            </p>
        </div>
        <div class="blogMainProfile">
            <div class="blogMainProfile-author">
                <img class="authorIcon" :src="user.userInformation.headIconUrl" />
                <span class="authorName" @click="goBloggerBlogList">{{user.userName}}</span>
            </div>
            <div class="blogMainProfile-category">
                <span style="font-size:13px">{{firstCategory.categoryName}}</span>
            </div>
            <div class="blogMainProfile-postedTime">
                <span><Time :time="publishTime" :interval="15" /></span>
            </div>
            <div class="blogMainProfile-readingNo">
                <!-- <Icon type="ios-book-outline" size="18" color="#2d8cf0"/> -->
                <span style="color:#2d8cf0">阅读数</span>
                <span style="margin-left: 8px;">{{readCount}}</span>
            </div>
            <div class="blogMainProfile-commentCount">
                <span style="color:#2d8cf0">评论数</span>
                <span style="margin-left: 8px;">{{commentCount}}</span>
            </div>
           
        </div>

      
    </div>
</template>

<script>
export default {
    name:'blogMainDiv',
    props:{
        title:String,  //文章的标题
        abstracts:String, //文章的节选
        publishTime:String, //发布的时间
        readingNo:String, //阅读的人数
        commentCount:String, //评论数
        user:Object ,// 文章作者
        firstCategory:Object, // 文章的分类
        blogId:Number,  // 文章的Id
        readCount:Number,
        commentCount:Number
        
    },
    data(){
        return{
            
        }
    },
    methods:{
       goBlogDetailPage(){
           let _this = this;
           this.$axios({
                method: 'post',
                url: '/knbolg/article/findArticleByArticleId.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'articleId':_this.blogId,
                    'user':{
                        'userId':_this.user.userId
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
                    'userId':_this.user.userId
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
                _this.$router.push({ name: 'blogDetailPage', params: {userName: _this.user.userInformation.nickName
                ,articleId:'blogList'}});
                _this.$Message.info('获取列表成功');
            })
            .catch(function (error) {
                _this.$Message.info('获取列表失败');
            });
       }
    }
}
</script>


<style scoped>

.article-type{
    display: inline-block;
    width: 37px;
    height: 19px;
    text-align: center;
    line-height: 20px;
    margin-right: 6px;
    /* padding-top: 3px; */
    padding-bottom: -15px;
    background-color: #2d8cf0;
    color: white;
    vertical-align: top;
    margin-top: 4px;
    border-radius: 7px;
}

.bolgMainBrief{
    height: 108px;
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid #f4f4f4;
    background-color: #fff;
   
}

.blogMainTitle-real:hover{
    color: #2d8cf0!important;
}

.blogMainTitle{
    padding-top: 11px;
    padding-left: 21px;
    cursor: pointer;
    min-width: 18%;
}

.blogMainContent{
    padding: 5px 0 0 21px;
    color: #999;
    width: 98%;
    height: 27px;
}

.blogMainProfile{
    display: inline-block;
    vertical-align: top;
    margin: 6px 0px 0px 0px;
    color: #6b6b6b;
    width: 98%;
}

.blogMainProfile-author{
    display: inline-block;
    margin-left: 19px;
}

.authorIcon{
    width: 25px;
    border-radius: 25px;
}

.authorName{
    font-size: 13px;
    /* font-weight: bold; */
    color: #1a2a3a;
    margin-left: 8px;
    /* padding-top: 2px; */
    /* width: 52px; */
    display: inline-block;
    width: 81px;
    border-right: 1px solid #aaa;
    cursor: pointer;
}

.authorName:hover{
     color: #2d8cf0;
}
.blogMainProfile-category{
    display: inline-block;
    width: 65px;
    text-align: center;
    height: 18px;
    border-right: 1px solid #aaa;
}

.blogMainProfile-postedTime{
     width: 9%;
    display: inline-block;
    text-align: center;
}

.blogMainProfile-readingNo{
    display: inline-block;
    vertical-align: top;
    width: 10.5%;
    margin-left: 39%;
    border-right: 1px solid #aaa;
}

.blogMainProfile-commentCount{
    display: inline-block;
    vertical-align: top;
    width: 11.5%;
    margin-left: 11px;
}

.blogMainProfile-blogButton{
    display: inline-block;
    vertical-align: top;
    width: 17%;
    margin-left: 32%;
}

.blogMainProfile-blogButton span{
    display: inline-block;
    vertical-align: top;
    margin-left: 14px;
   
}
</style>
