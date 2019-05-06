<template>
    <div>
        <MenuBar></MenuBar>
        <img class="homeBgImg" src="../assets/images/homeImage/homeBg.png">
        <div class="homeBgContent">
            <span class="homeBgContentTitle">Knowledge Share</span>
            <span class="homeBgContentDescription1">Gather interesting people,high-quality blogs and organizations...</span>
            <span class="homeBgContentDescription2 blog">博客</span>    
            <span class="homeBgContentDescription2 star">星球</span>    
            <span class="homeBgContentDescription2 question">问答</span>    
        </div>   
         
        <div class="butDiv"   @mouseover="animated(true)"
                @mouseout="animated(false)">
        <Button size="large" 
                :class="{'animated rubberBand':addAnimated}" 
                to="login" 
                type="primary" 
                class="goLoginButton">开启分享之旅</Button>
                <div style="clear:both"></div>
        </div>
        <div v-show="showArrow" class="arrowDiv" @mouseenter="animatedArrow(true)"
            @mouseleave="animatedArrow(false)">
            <i  :class="{'animated fadeInDown':addAnimatedForArrow}" 
            class="fa fa-angle-double-down fa-4x" 
            style="color:#aaa"
            aria-hidden="true"></i>
        </div>
       
        <div style="clear:both"></div>

        
        <div class="popularBloggerDiv">
                <span class="english">Popular Blog</span>
                <span class="chinese">热门博客</span>
                <SlideShow class="slideShowTag"></SlideShow>
        </div>
         
        <!-- <div class="transverseDiv">
            <div class="descriptionForImg col-lg-5">
                <span>如果你喜欢意教导他人</span>
                <span>如果你乐意与他人分享知识</span>
                <span>赶快来加入我们的博客平台吧！</span>
                <span>这里有着一个巨大的知识宝库！</span>    
            </div>
            <div class="col-lg-1"></div>
            <div class="transverseImg col-lg-6">
                <img style="width:100%;height:100%;" src="../assets/images/homeImage/blog-img4.jpg">
            </div>
        </div>

         -->


        
        <div class="homeThreeDiv">
            <div class="introduceDiv">
                <img src="../assets/images/homeImage/blog-img1.png" alt="" srcset="">
                <span class="introduceSpan introduceSpan1">在Knshare中</span>
                <span class="introduceSpan introduceSpan2">把自己分享给世界</span>
                <span class="introduceSpan introduceSpan3">让世界来欣赏我们</span>
            </div>
            <div class="introduceDiv">
                 <img src="../assets/images/homeImage/blog-img2.png" alt="" srcset="">
                 <span class="introduceSpan introduceSpan1">在Knshare中</span>
                 <span class="introduceSpan introduceSpan2">找到志同道合的组织</span>
                 <span class="introduceSpan introduceSpan3">随小伙伴们一同进步</span>
            </div>
            <div class="introduceDiv">
                 <img src="../assets/images/homeImage/blog-img3.png" alt="" srcset="">
                 <span class="introduceSpan introduceSpan1">在Knshare中</span>
                 <span class="introduceSpan introduceSpan2">寻找奇思妙想的问题</span>
                 <span class="introduceSpan introduceSpan3">交流大家不同的想法</span>
            </div>
        </div>

        <div style="clear:both"></div>

        <Footer></Footer>
    </div>
</template>

<script>

import MenuBar from '@/components/common/MenuBar.vue'
import Footer from '@/components/common/Footer.vue'
import SlideShow from '@/components/common/SlideShow.vue'
export default {
    name: "home",
    data() {
        return {
            addAnimated:false, //给按钮添加动画
            addAnimatedForArrow:false, //给箭头添加动画
            showArrow:true, //是否显示箭头
        }
    },
    components:{
        MenuBar,SlideShow,Footer
    },
    methods: {
        animated(truth){
            this.addAnimated = truth
        },
        animatedArrow(truth){
            this.addAnimatedForArrow = truth
        },
        handleScroll () {
            if( this.$route.path == '/home'){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if(scrollTop > 350){
                    this.showArrow = false;
                }else if(scrollTop <= 10){
                     this.showArrow = true;
                }
                
            }
        }

    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },
}
</script>

<style scoped>

.homeThreeDiv{
    height: 300px;
    margin-top: 60px;
}

.arrowDiv{
    padding-top: 21px;
    position: absolute;
    top: 90%;
    background-color: #fff;
    left: 48.2%;
    height: 61px;
    cursor: pointer;
}

.butDiv{
    background-color: #fff;
    height: 35px;
    width: 182px;
    position: absolute;
    top: 80%;
    left: 43%;
}

.homeBgImg{
    margin-top: 14px;
    width: 100%;
    height: 610px;
}




.homeBgContentTitle{
    position: absolute;
    top: 45%;
    left: 42%;
    font-size: 25px;
    font-weight: bold;
}



.homeBgContentDescription1{
    color: #aaa;
    position: absolute;
    top: 52%;
    font-size: 14px;
    left: 35.5%;
}

.homeBgContentDescription2{
    position: absolute;
    top: 59%;
    left: 48.5%;
    color: #aaa;
    font-size: 14px;
}

 .blog{
    position: absolute;
    top: 59%;
    left: 48.5%;
}

 .star{
    position: absolute;
    top: 63%;
    left: 48.5%;
}

 .question{
    position: absolute;
    top: 67%;
    left: 48.5%;
}

.goLoginButton{
    width: 182px;
}

.introduceDiv{  /*主页中间三个灰色的介绍div*/
    width: 19%;
    height: 278px;
    background-color: #f4f4f4;
    float: left;
    margin-left: 10.7%;
    border-radius: 15px;
}

.introduceDiv img{
    width: 64%;
    /* margin: 0 auto; */
    margin-left: 48px;
    margin-top: 12px;
}

.introduceSpan{
     font-size: 15px;
    display: block;
    color: black;
    font-family:'黑体';
}

.introduceSpan1{
    margin: 16px 0 0 84px;
}

.introduceSpan2{
    margin: 16px 0 0 64px;
}


.introduceSpan3{
    margin: 16px 0 0 64px;
}

.transverseDiv{  /*第一个横向介绍 Div*/
    height: 300px;
    width: 78%;
    background-color: #fff;
    margin: 65px 0 100px 153px;
    border-radius: 15px;
}



.descriptionForImg{
    height: 300px;
    background-color: #fff;
    padding-top: 65px;
    padding-left: 57px;
}
.descriptionForImg span{
        display: block;
    color: #f84282;
    font-size: 18px;
    font-family: "黑体";
    font-weight: bold;
    margin: 15px 0 0 25px;
    width: 104%;
}

.transverseImg{
    height: 300px;
    background-color: #fff;
    margin: 0;
    padding: 0;
}

.popularBloggerDiv{  /*热门博主Div*/
    height: 428px;
    width: 100%;
    background-color: #f4f4f4;
    margin-top: 67px;
}

.popularBloggerDiv span{
    display: block;
    width: 20%;
    margin: 0 auto;
    /* padding-left: 70px; */
    text-align: center;
    
}
.english{
    font-size: 25px;
}

.chinese{ /*热门博主中文span*/
    font-size: 27px;
    color: #898ffe;
}    

.slideShowTag{
    width: 1000px;
    margin: 15px auto;
    height: 333px;
    background-color: #f4f4f4;
}

</style>
