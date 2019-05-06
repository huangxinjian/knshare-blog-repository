<template>
  <el-carousel :interval="4000" type="card" height="307px" indicator-position="none">
    <el-carousel-item v-for="(item,index) in article" :key="index">
      <img :src="item.articleUrl" style="width:100%;height:100%"   @click="goThatBlog(item.articleId,item.authorId)"/>
      <h3 >{{ item.title }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
   data() {
       return {
           article:[
              //  {img:require('../../assets/images/homeImage/popularBolgImg/pa2.jpg'),title:'世界未解：黄欣健为什么这么帅'},
              //  {img:require('../../assets/images/homeImage/popularBolgImg/pa1.jpg'),title:'世界未解：黄欣健为什么这么帅'},
              //  {img:require('../../assets/images/homeImage/popularBolgImg/pa3.jpg'),title:'世界未解：黄欣健为什么这么帅'},
              //  {img:require('../../assets/images/homeImage/popularBolgImg/pa4.jpg'),title:'世界未解：黄欣健为什么这么帅'},
              //  {img:require('../../assets/images/homeImage/popularBolgImg/pa5.jpg'),title:'世界未解：黄欣健为什么这么帅'},
              //  {img:require('../../assets/images/homeImage/popularBolgImg/pa3.jpg'),title:'世界未解：黄欣健为什么这么帅'},
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
     },
     
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
  
  .el-carousel__item h3 {
 
    position: absolute;
    font-family: Microsoft YaHei;
    font-size: 30px;
    color: #fff;
    letter-spacing: 1px;
    top: 77%;
    left: 4%;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>