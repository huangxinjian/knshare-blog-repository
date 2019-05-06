<template>
    <div class="footerDiv">
        <div class="foot1">
            <div class="col-lg-3 logoDiv">
                <img src="../../assets/images/logo.png">
                <span>KnShare</span>
            </div>
            <div class="col-lg-6 contentDiv ">
                <div class="row">
                    <div class="col-lg-3" style=";height:250px;padding-right: 0px;padding-left: 0px;">
                        <span class="footerTitle">友情链接</span>
                        <hr  style="background-color: black;height: 1px;border: none;">
                        <div class="footerContentDiv">
                        <span class="footerContent">CSDN</span>
                        <span class="footerContent">Sina</span>
                        </div>
                    </div>
                    <div class="col-lg-3" style="height:250px;padding-right: 0px;padding-left: 0px;">
                         <span class="footerTitle">联系我们</span>
                        <hr  style="background-color: black;height: 1px;border: none;">
                        <div class="footerContentDiv">
                        <span class="footerContent">邮箱</span>
                        <span class="footerContent">联系电话</span>
                        </div>
                    </div>
                    <div class="col-lg-3" style=";height:250px;padding-right: 0px;padding-left: 0px;">
                        <span class="footerTitle">关于作者</span>
                        <hr  style="background-color: black;height: 1px;border: none;">
                        <div class="footerContentDiv">
                        <span class="footerContent">About Me</span>
                        </div>
                    </div>
                    <div class="col-lg-3" style=";height:250px;padding-right: 0px;padding-left: 0px;">
                        <span class="footerTitle">github</span>
                        <hr  style="background-color: black;height: 1px;border: none;">
                        <div class="footerContentDiv">
                        <span class="footerContent">huangxinjian</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3"></div>
        </div>
        <div class="foot2">
            <span>合作事宜　|　版权投诉　|　意见反馈</span>
            <span>东莞理工学院 201541404431 15届软件工程4班 黄欣健 用于毕业设计</span>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
export default {
    
}
</script>

<style scoped>

.footerDiv{
    width: 100%;
    height: 300px;
    margin-top: 52px;
    border-top: 1px solid #000;
}

.foot1{
    height: 250px;
    background-color: #fff;
}

.foot2{
    height: 50px;
    background-color: #fff;

}

.foot2 span{
    display: block;
    width: 50%;
    margin: 5px auto;
    text-align: center;
    color: black;
    font-family: "黑体"
}

.logoDiv{
    background-color: #fff;
    height: 250px;
}

.logoDiv img{
    width: 56%;
    margin-left: 100px;

}
.logoDiv span{
    width: 47%;
    margin: 0 0 0 112px;
    display: block;
    font-size: 20px;
    color: black;
    font-family: "\9ED1\4F53";
    text-align: center;
}

.contentDiv{
    background-color: #fff;
    height: 250px;
}

.contentDiv span{
    display: block;
}
.footerTitle{
    font-size: 11px;
    color: #aaa;
    margin-top: 45px;
    padding-left: 4px;
    margin-bottom: 7px;
}
.footerContent{
    font-size: 14px;
    color: #000;
    margin-top: 5px;
    padding-left: 4px;
}

.footerContentDiv{
    height: 165px;
    margin-top: 11px;
}
</style>
