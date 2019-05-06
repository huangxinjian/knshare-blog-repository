<template>
    <div class="centerContainer">
    <div class="blogShowDiv">
        <!-- <div v-if="articleList.length == 0" style="text-align: center;padding-top: 24%;">
            <img src="../../assets/images/404.png">
            <span style="display: block;color: #2d8cf0;font-size: 18px;">抱歉！目前该板块尚未有文章！</span>
        </div>
        <div v-else>
            <BlogMainDiv v-for="item in articleList" 
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
        </div> -->
    </div>
    </div>
</template>

<script>
export default {
    name:'searchBlog',
    props:{
        'condition':''
    },
    data() {
        return {
            articleList:[],
            pageParams:{
                page:1,
                limit:7,
                totalRecord:'',
                totalPage:''
            }
        }
    },
    methods: {
        nextPageData(){

        },
        loadArticleByCondition(){
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/article/findArticleByCondition.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'condition':_this.condition,
                    'page':_this.pageParams.page,
                    'limit':_this.pageParams.limit
                }
            }).then( (response) => {
                console.log(response.data);
                // _this.$store.commit("updateTheTopTenList",response.data.articleList);
            })
            .catch(function (error) {
                console.log(error);
                _this.$Message.info('加载推荐前10失败');
            });

        }
    },

}
</script>


<style scoped>

.centerContainer {
  float: left;
  width: 53%;
  height: 950px;
  background-color: #f4f4f4;
     margin-left: 229px;
  margin-top: 20px;
}

.blogShowDiv {
  position: relative;
  width: 100%;
  height: 697px;
  background-color: #fff;
   
}
</style>
