<template>
    <div class="bolgBrief">
        <div class="blogTitle">
            <span class="article-type">原创</span>
            <span class="blogTitle-real"  style="font-weight:bold;color:black;font-size:18px" @click="goBlogDetailPage">{{title}}</span>
        </div>
        <div class="blogContent">
            <p>{{abstracts}}
            </p>
        </div>
        <div class="blogProfile">
            <div class="blogProfile-postedTime">
                <span>{{publishTime}}</span>
            </div>
            <div class="blogProfile-readingNo">
                <!-- <Icon type="ios-book-outline" size="18" color="#2d8cf0"/> -->
                <span style="color:#2d8cf0">阅读数</span>
                <span style="margin-left: 8px;">{{readNo}}</span>
            </div>
            <div class="blogProfile-commentCount">
                <span style="color:#2d8cf0">评论数</span>
                <span style="margin-left: 8px;">{{commentNo}}</span>
            </div>

            <div class="blogProfile-blogButton">
                <span style="width: 50px; color:#2d8cf0;cursor:pointer" @click="disabledComment">禁止评论</span>
                <span style="width: 25px; color:#2d8cf0;cursor:pointer" @click="editorArticle">编辑</span>
                <span style="width: 25px; color:#ca0c16;cursor:pointer" @click="showDeleteModal">删除</span>
            </div>
        </div>

        
        <Modal v-model="confirmDeleteArticle" scrollable width="360" :mask-closable="false" :closable="false">
            <div style="text-align:center">
                <p style="font-size: 18px;color:#1a2a3a;">你确定要删除这篇文章吗？</p>
            </div>
            <div slot="footer" style="padding:0">
                <Button type="default" size="large" @click="hideConfirmDeleteModal" style="margin-right: 49px;width:80px;">取消</Button>
                <Button type="error" size="large" @click="deleteBlog" style="margin-right: 59px;width:80px;">确认</Button>
            </div>
        </Modal>


      
    </div>
</template>

<script>
export default {
    name:'blogDiv',
    props:{
        title:String,  //文章的标题
        articleType:String, //文章的类型
        abstracts:String, //文章的节选
        publishTime:String, //发布的时间
        readingNo:String, //阅读的人数
        commentCount:String, //评论数
        articleId:Number,//文章Id
        readNo:Number, // 阅读数量
        commentNo:Number // 评论数
    },
    data() {
        return {
            confirmDeleteArticle:false
        }
    },
    methods:{
        showDeleteModal(){
            this.confirmDeleteArticle = true;
        },
        disabledComment(){
            alert("禁止评论");
        },
        editorArticle(){
             let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/article/findJustArticleMessage.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.articleId,
                
            }).then( (response) => {
                console.log(response);
                this.$store.commit("updateEditorArticle",{
                    title:response.data.article.title,
                    content:response.data.article.content,
                    articleId:response.data.article.articleId
                });
                this.$router.push({ name: 'writeBlog', params: { userId:this.$store.state.user.userName}});
            })
            .catch(function (error) {
                console.log(error);
                _this.$Message.info('加载推荐失败');
            });
        },
        deleteBlog(){
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/article/deleteArticle.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.articleId,
                
            }).then( (response) => {
                console.log(response);
               for (let index = 0; index < _this.$store.state.myBlogList.length; index++) {
                   if(_this.articleId == _this.$store.state.myBlogList[index].articleId){
                        _this.$store.commit("spliceBlogList",index);
                        break;
                   }
               }
                this.confirmDeleteArticle = false;
               _this.$Message.success('删除博客成功');
            })
            .catch(function (error) {
                console.log(error);
                _this.$Message.info('加载推荐失败');
            });
        },
        goBlogDetailPage(){
           let _this = this;
           this.$axios({
                method: 'post',
                url: '/knbolg/article/findArticleByArticleId.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'articleId':_this.articleId,
                    'user':{
                        'userId':_this.$store.state.user.userId
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
       hideConfirmDeleteModal(){
           this.confirmDeleteArticle = false;
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

.bolgBrief{
    height: 128px;
    width: 96%;
    margin: 0 auto;
    border-top: 0.5px solid #f6f6f6;
    background-color: #fff;
   
}

.blogTitle-real:hover{
    color: #2d8cf0!important;
}

.blogTitle{
    padding-top: 10px;
     cursor: pointer;
     width: 60%;
}

.blogContent{
        padding: 5px 0 0 0px;
        color: #999;
        width: 98%;
        height: 62px;
}

.blogProfile{
    display: inline-block;
    vertical-align: top;
    margin: 8px 0px 0px 0px;
    color: #6b6b6b;
    width: 98%;
}

.blogProfile-postedTime{
    width: 16%;
    display: inline-block;
    border-right: 1px solid #aaa;
}

.blogProfile-readingNo{
    display: inline-block;
    vertical-align: top;
    width: 8.5%;
    margin-left: 11px;
    border-right: 1px solid #aaa;
}

.blogProfile-commentCount{
    display: inline-block;
    vertical-align: top;
    width: 22.5%;
    margin-left: 11px;
}

.blogProfile-blogButton{
    display: inline-block;
    vertical-align: top;
    width: 17%;
    margin-left: 32%;
}

.blogProfile-blogButton span{
    display: inline-block;
    vertical-align: top;
    margin-left: 14px;
   
}
</style>
