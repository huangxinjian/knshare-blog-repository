<template>
    <div class="userBlogListBrief">
        <div class="userBlogListTitle">
             <span class="article-type">原创</span>
            <span class="userBlogListTitle-real" style="font-weight:bold;color:black;font-size:18px" @click="goBlogDetailPage">{{title}}</span>
        </div>
        <div class="userBlogListContent">
            <p>{{abstracts}}
            </p>
        </div>
        <div class="userBlogListProfile">
            <!-- <div class="blogMainProfile-author">
                <img class="authorIcon" :src="user.userInformation.headIconUrl" />
                <span class="authorName">{{user.userName}}</span>
            </div> -->
            <div class="userBlogListProfile-postedTime">
                <span>{{publishTime}}</span>
            </div>
            
            <div class="userBlogListProfile-readingNo">
                <!-- <Icon type="ios-book-outline" size="18" color="#2d8cf0"/> -->
                <span style="color:#2d8cf0">阅读数</span>
                <span style="margin-left: 8px;">{{readCount}}</span>
            </div>
            <div class="userBlogListProfile-commentCount">
                <span style="color:#2d8cf0">评论数</span>
                <span style="margin-left: 8px;">{{commentCount}}</span>
            </div>
           
        </div>

      
    </div>
</template>

<script>
export default {
    name:'userBlogListDiv',
    props:{
        title:String,  //文章的标题
        articleType:String, //文章的类型
        abstracts:String, //文章的节选
        publishTime:String, //发布的时间
        readingNo:String, //阅读的人数
        commentCount:String, //评论数
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
           this.$Message.info("文章的Id"+this.blogId);
           this.$axios({
                method: 'post',
                url: '/knbolg/article/findArticleByArticleId.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'articleId':_this.blogId,
                    'user':{
                        'userId':_this.$store.state.articleBlogger.userId
                    }
                }
            }).then( (response) => {
                console.log(response);
                // _this.articleList = response.data.articleDtoList;
                _this.$store.state.articleDetail = response.data.articleDto;
             
                _this.$router.push({ name: 'blogDetailPage', params: {userName: response.data.articleDto.user.userInformation.nickName
                    ,articleId:response.data.articleDto.articleId}});
            })
            .catch(function (error) {
                _this.$Message.info('加载推荐失败');
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
}

.userBlogListBrief{
    height: 108px;
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid #f4f4f4;
    background-color: #fff;
    position: relative;
   
}

.userBlogListTitle-real:hover{
    color: #2d8cf0!important;
}

.userBlogListTitle{
    padding-top: 11px;
    padding-left: 21px;
    cursor: pointer;
    min-width: 18%;
}

.userBlogListContent{
    padding: 5px 0 0 21px;
    color: #999;
    width: 98%;
    min-height: 27px;
}

.userBlogListProfile{
    display: inline-block;
    vertical-align: top;
    margin: 6px 0px 0px 0px;
    color: #6b6b6b;
    width: 98%;
    position: absolute;
    bottom: 10px;
}

.userBlogListProfile-author{
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
}
.userBlogListProfile-category{
    display: inline-block;
    width: 65px;
    text-align: center;
    height: 18px;
    border-left: 1px solid #aaa;
    border-right: 1px solid #aaa;
}

.userBlogListProfile-postedTime{
     width: 20%;
    display: inline-block;
    text-align: center;
    border-right: 1px solid #aaa;
}

.userBlogListProfile-readingNo{
    display: inline-block;
    vertical-align: top;
    width: 10.5%;
    margin-left: 3%;
    border-right: 1px solid #aaa;
}

.userBlogListProfile-commentCount{
    display: inline-block;
    vertical-align: top;
    width: 11.5%;
    margin-left: 11px;
}

.userBlogListProfile-blogButton{
    display: inline-block;
    vertical-align: top;
    width: 17%;
    margin-left: 32%;
}

.userBlogListProfile-blogButton span{
    display: inline-block;
    vertical-align: top;
    margin-left: 14px;
   
}
</style>
