<template>
    <div class="collectionArticle">
        <span class="title" @click="goBlogDetailPage">{{title}}</span>        
        <span class="time"><Time :time="collectionTime" type="date" /></span>        
        <span class="delete" @click="cancelCollection()">取消收藏</span>        
    </div>
</template>

<script>
export default {
    props:{
        articleId:Number,
        title:String,
        collectionTime:Number
    },
    methods: {
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
       cancelCollection(){
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/collection/deleteCollect.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.articleId,
                
            }).then( (response) => {
                console.log(response);
                for (let index = 0; index < _this.$store.state.myCollectionList.length; index++) {
                   if(_this.articleId == _this.$store.state.myCollectionList[index].articleId){
                        _this.$store.commit("spliceMyCollectionList",index);
                        break;
                   }
               }
               _this.$Message.success('取消关注成功');
            })
            .catch(function (error) {
                console.log(error);
                _this.$Message.info('加载推荐失败');
            });
       }
    },
}
</script>

<style scoped>

.collectionArticle{
    width: 100%;
    height: 42px;
    background-color: #fff;
    padding-top: 11px;
    border-top: 1px solid rgba(133,133,133,0.2);
}
.title{
    color: #1a2a3a;
    font-size: 14px;
    width: 64%;
    display: inline-block;
    padding-left: 13px;
    text-align: left;
    cursor: pointer;
}

.title:hover{
    color:#2d8cf0
}

.time{
    color: #76839b;
    font-size: 11px;
    width: 15%;
    margin-right: 19px;
    display: inline-block;
    text-align: center;
}
.delete{
    color: #ca0c16;
    font-size: 11px;
    width: 15%;
    margin-right: 19px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
}
</style>
