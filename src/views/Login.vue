<template>
    <div class="loginContainer container">
        <div class="row">
            <div class="col-lg-8 loginImg">
                <img src="../assets/images/login.png">
            </div>
            <div class="col-lg-4 loginDiv">
                <img src="../assets/images/logo-blue.png">
                <label class="logotitle">KNShare</label>
                <div class="inputUserNameDiv">
                    <base-input type="text" msg="请输入用户名或邮箱"></base-input>
                </div>
                <div class="inputPasswordDiv">
                     <base-input type="password" msg="请输入密码" v-on:showVerify.once="showVerify"></base-input>
                </div>
                
                <div class="verifyCodeDiv" v-show="isVerifyCode">
                    <base-input type="text" verifyClass="verify" msg="请输入验证码"></base-input>
                </div>
                
              
                    <span class="phoneLoginSpan" key="phoneLogin">手机验证码登录</span>
                    <span class="fogetPwdSpan" key="forgetPwd">忘记密码？</span>

                    <div class="btn btn-lg loginClickDiv" key="login">登录</div>
  
                <div class="loginFooter">
                    <label>还没有账号？</label><span>注册</span>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'
// @ is an alias to /src
import BaseInput from '@/components/common/BaseInput.vue'

export default {
    name:'login',
    components:{
        BaseInput
    },
    data:function(){
        return {
          isVerifyCode:false,
          isActive:false
        }
    },
    methods:{
        showVerify(){
            this.isVerifyCode = true;
        }
    }

}
</script>

<style scoped>

   
    .loginContainer{
        margin: 0;
        width: 1520px;
    }
    .loginImg{
        padding: 0;
        /* background-color: red; */
    }
    .loginImg img{
        width: 1014px;
        height: 754px;
      
    }
    
    .loginDiv{
        
        padding: 0;
        height: 750px;
        background-color:#f6fafb;
    }

    .loginDiv img{
        margin-left: 186px;
        margin-top: 12px;
    }

    .loginDiv .logotitle{
        margin-left: 164px;
        margin-top: -5px;
        font-size: 50px;
        color: #0084ff;
        font-weight: 100;
    }
    .phoneLoginSpan{
        color: #175199;
        font-size: 18px;
        font-family: 黑体;
        margin-left: 76px;
        cursor:pointer;
    }
    .phoneLoginSpan:hover{
        color: #8590a6;
        font-size: 18px;
        font-family: 黑体;
        margin-left: 76px;
        cursor:pointer;
    }

    .fogetPwdSpan{
        color: #8590a6;
        font-size: 18px;
        font-family: 黑体;
        margin-left: 165px;
        cursor:pointer;
    }

    .loginDiv .inputPasswordDiv{
        margin-left: 71px;
        margin-top: 38px;
        margin-bottom: 44px
        
    }

    .loginDiv .inputUserNameDiv{
        margin-left: 71px;
        margin-top: 52px;
        
    }

    .loginClickDiv{
        width: 386px;
        margin-left: 69px;
        margin-top: 65px;
        background-color: #0084ff;
        color:#fff;
    }

    .loginClickDiv:hover{
        width: 386px;
        margin-left: 69px;
        margin-top: 65px;
        background-color: #0075e2;
        color:#fff;
    }

    .loginFooter{
        background-color: #d0cfcf;
        width: 506px;
        height: 47px;
        position: absolute;
        top: 94%;
        text-align: center;
        padding-top: 14px;
    }

    .loginFooter label{
        font-size: 15px;
    }

    .loginFooter span{
        color: #175199;
        font-size: 15px;
        font-family: Adobe 黑体 Std;
        cursor: pointer;
    }

    .verifyCodeDiv{
        margin-left: 71px;
        /* margin-top: -17px; */
        margin-bottom: 37px;
    }


   
</style>
