<template>

    <div class="blogDetailContent">
        <div class="blogHeader">
                <div class="info-1" style="margin-bottom: 11px;">
                    <span class="article-type">{{$store.state.articleDetail.articleType == "ORIGINAL" ? '原创' :'转载'}}</span>
                    <span class="blogTitle">{{$store.state.articleDetail.title}}</span>
                </div>
                <div class="info-2">
                    <span class="blogPublishTime">发布时间：</span>
                    <span class="blogPublishTime-child">{{$store.state.articleDetail.publishTime}}</span>
                    <span class="blogCategory">博文分类：</span>
                    <span class="blogCategory-child">{{$store.state.articleDetail.firstCategory.categoryName}}</span>
                    <span class="blogGene">博文基因：</span>
                    <Tag v-for="item in $store.state.articleDetail.genePool" 
                         :key="item.geneId" 
                         color="error" 
                         style="margin-bottom:7px;"
                         @click.native="loadGeneArticleList(item.geneId,item.geneName)">{{item.geneName}}</Tag>
                </div>
        </div>
        <div class="blogContent" v-html="$store.state.articleDetail.content">
          

        </div>
       
    </div>
</template>

<script>

export default {
    data() {
        return {
            page:1
        }
    },
    methods:{
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
                    'limit':7,
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

.blogDetailContent{
    width: 100%;
    background-color: #fff;
}
.blogHeader{
    height: 81px;
    width: 100%;
    background-color: #fff;
    padding-top: 15px;
    padding-left: 19px;
}

.blogTitle{
    font-weight: bold;
    color: #1a2a3a;
    font-size: 18px;  
}

.blogPublishTime{
    color: #1a2a3a;
    font-size: 14px;
}


.blogPublishTime-child{
    color: #858585;
    font-size: 14px;
}

.blogCategory{
    color: #1a2a3a;
    font-size: 14px;
    margin-left: 32px;
}

.blogCategory-child{
    color: #858585;
    font-size: 14px;
}
.blogGene{
    color: #1a2a3a;
    font-size: 14px;
    margin-left: 32px;
}

.blogGene-child{
     color: #858585;
    font-size: 14px;
}

.info-2{
    width: 96%;
    border-bottom:1px solid #aaa;
}

.blogContent{
    width: 95%;
    background-color: #fff;
    /* margin-top: 10px; */
    margin: 0 auto;
    margin-top: 14px;
    min-height: 523px;
    /* margin-bottom: 15px; */
    padding-bottom: 18px;
}


</style>
