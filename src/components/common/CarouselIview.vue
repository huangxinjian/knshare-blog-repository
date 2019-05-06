<template>
    <Carousel  v-model="value2" :height="250" loop>
        <CarouselItem v-for="(item,index) in article" :key="index" >
            <div class="demo-carousel"  @click="goThatBlog(item.articleId,item.authorId)">
                <img :src="item.articleUrl" class="carouselImg"/>>
                <span class="carouselSpan">{{item.title}}</span>
            </div>
        </CarouselItem>
        <!-- <CarouselItem>
            <div class="demo-carousel">
                 <img :src="article[1].img" class="carouselImg"/>>
                <span class="carouselSpan">{{article[1].title}}</span>
            </div>
        </CarouselItem> -->
      
    </Carousel>
</template>
<script>
    export default {
        data () {
            return {
                value2: 0,
                article:[
                    // {img:require('../../assets/images/homeImage/popularBolgImg/pa2.jpg'),title:'世界未解：夏侯惇和沥青的枇杷派'},
                    // {img:require('../../assets/images/homeImage/popularBolgImg/pa1.jpg'),title:'世界未解：夏侯惇和沥青的枇杷派'},
                    // {img:require('../../assets/images/homeImage/popularBolgImg/pa3.jpg'),title:'世界未解：夏侯惇和沥青的枇杷派'},
                    // {img:require('../../assets/images/homeImage/popularBolgImg/pa4.jpg'),title:'世界未解：夏侯惇和沥青的枇杷派'},
                    // {img:require('../../assets/images/homeImage/popularBolgImg/pa5.jpg'),title:'世界未解：夏侯惇和沥青的枇杷派'},
                    // {img:require('../../assets/images/homeImage/popularBolgImg/pa3.jpg'),title:'世界未解：夏侯惇和沥青的枇杷派'},
                ]
            }
        },
        methods: {
            goThatBlog(blogId,userId){
               let _this = this;
                this.$axios({
                    method: 'post',
                    url: '/knbolg/article/findArticleByArticleId.do',
                    headers:{
                            "Content-Type":"application/json;charset=UTF-8"
                    },
                    data:{
                        'articleId':blogId,
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
            }
        },
        mounted() {
            let _this = this;
            this.$axios({
                    method: 'post',
                    url: '/knbolg/article/findRecommendArticle.do',
                    headers:{
                            "Content-Type":"application/json;charset=UTF-8"
                    },
            }).then( (response) => {
                console.log(response.data);
                for (let index = 0; index < response.data.hashMapList.length; index++) {
                    let obj = {
                        articleId:'',
                        img:'',
                        title:''
                    }
                    obj.articleId = response.data.hashMapList[index].articleId;
                    obj.articleUrl = response.data.hashMapList[index].articleUrl;
                    obj.title = response.data.hashMapList[index].title;
                    _this.article.push(obj);
                }
            })
            .catch(function (error) {

            });
        },
    }
</script>

<style scoped>
.demo-carousel{
    height: 250px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #506b9e;
    cursor: pointer;
}

.carouselImg{
    width: 100%;
    height: 100%;
}

.carouselSpan{
    position: relative;
    top: -54%;
    height: 50px;
    left: -29%;
    font-size: 19px;
}
</style>
