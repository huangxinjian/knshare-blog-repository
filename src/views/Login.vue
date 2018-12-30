<template>
    <div class="loginContainer container">
        <div class="row">
            <div class="col-lg-8 loginImg">
                <img src="../assets/images/login.png">
            </div>
            <div class="col-lg-4 loginDiv">
                <img src="../assets/images/logo-blue.png">
                <label class="logotitle">KNShare</label>

                <!-- 普通登录组件 -->
                <template v-if="loginType=='normalLogin'">
                    <div class="inputUserNameDiv">
                        <base-input type="text" name="username" key="username" v-bind:usernameErrorClass="usernameError" v-bind:msg="usernamePlaceholder" v-on:returnValue="returnValue"></base-input>
                    </div>
                    <div class="inputPasswordDiv">
                        <base-input type="password" name="password" key="password" v-bind:passwordErrorClass="passwordError" v-bind:msg="passwordPlaceholder" v-on:showVerify.once="showVerify" v-on:returnValue="returnValue"></base-input>
                    </div>
                    
                    <div class="verifyCodeDiv" v-show="isVerifyCode">
                        <base-input type="text" name="verifyCode" key="verifyCode" v-bind:verifyCodeErrorClass="verifyCodeError" verifyClass="verify" v-bind:msg="verifyCodePlaceholder" v-on:returnValue="returnValue"></base-input>
                    </div>
                    <span class="phoneLoginSpan" v-on:click="loginType='phoneLogin';verifyStatus=false;">手机验证码登录</span>
                    <span class="fogetPwdSpan" key="forgetPwd">忘记密码？</span>
                </template>

                <!-- 手机登录组件 -->
                 <template v-else>
                    <div class="inputPhoneNumberDiv">
                        <base-input type="text" name="phoneNumber" key="phoneNumber"  v-bind:phoneNumberErrorClass="phoneNumberError" v-bind:msg="phoneNumberPlaceholder" v-on:returnValue="returnValue"></base-input>
                    </div>
                    <div class="verifyPhoneCodeDiv">
                        <base-input type="text" name="phoneCode" key="phoneCode" v-bind:phoneCodeErrorClass="phoneCodeError" verifyClass="verify" v-bind:msg="phoneCodePlaceholder" v-on:returnValue="returnValue"></base-input>
                        <span class="getPhoneCode"  :class="{disabled: !this.canClick}"   v-on:click="getPhoneCode">{{phoneCodeContent}}</span>
                    </div>
                    <span class="phoneLoginSpan" v-on:click="loginType='normalLogin';verifyStatus=false;">账号密码登录</span>
                </template>

                <div class="btn btn-lg loginClickDiv" key="login" v-on:click="sendLoginRequest" v-bind:disabled="submit">登录</div>
  
                <div class="loginFooter">
                    <label>还没有账号？</label><router-link to="regist" tag="span">注册</router-link>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'
// @ is an alias to /src
import BaseInput from '@/components/common/BaseInput.vue'
import ErrorLabel from '@/components/common/ErrorLabel.vue'

export default {
    name:'login',
    components:{
        BaseInput,ErrorLabel
    },
    data:function(){
        return {
          isVerifyCode:false,   //显示验证码的文本框

          //placeholder提示语
          usernamePlaceholder:'请输入用户名或邮箱',
          passwordPlaceholder:'请输入密码',
          verifyCodePlaceholder:'请输入验证码',
          phoneNumberPlaceholder:'请输入手机号码',
          phoneCodePlaceholder:'请输入手机验证码',

          // 提交的表单信息
          user:{   //普通登录方式提交
              username:'',
              password:'',
          },
          userphone:{  //验证码登录方式提交
              phoneNo:'',
              phoneCode:''
          },
          verifycode:'',  //验证码

          //只有当全部信息填写完成，才允许点击登录按钮
          useraccountStatus:false,   //用户名邮箱是否通过验证
          passwordStatus:false,     //密码填写是否通过验证
          verifyStatus:false,       //验证码填写是否通过验证
          phoneNoStatus:false,  
          phoneCodeStatus:false,

          loginType:'normalLogin',  //登录类型

          usernameError:'',    //username输入错误提示
          passwordError:'',    //密码输入错误提示
          verifyCodeError:'',    //验证码输入错误提示
          phoneNumberError:'',   //手机号码错误提示
          phoneCodeError:'',    //手机验证码错误提示

          phoneCodeContent: '发送验证码',  // 按钮里显示的内容
          totalTime: 9,      //记录具体倒计时时间
          canClick: true  //避免重复点击获取按钮
        }
    },
    computed: {
        submit(){
            if(this.loginType == "normalLogin"){
                return !(this.useraccountStatus && this.passwordStatus && this.verifyStatus)
            }else if(this.loginType == "phoneLogin"){
                return !(this.phoneNoStatus && this.phoneCodeStatus)
            }
            
        }
    },
    methods:{
        showVerify(){
            this.isVerifyCode = true;
        },
        sendLoginRequest(username,password){  //发送登录请求
            // this.$http.post('http://localhost:8080/login',{user:this.user,verifycode:this.verifycode},{emulateJSON:true}).then( 
            //         function (result) {
            //           console.log('成功了');
            //         },
            //         function (result) {
            //           console.log('失败了');
            //         }
            // )
            if(this.submit == false){
                alert("登陆成功");
            }
            
        },
        returnValue(value,name){  //用户输入的信息返回值
            if(name == 'username'){
                if(value == ''){
                    console.log('用户名不能为空');
                    this.usernamePlaceholder = '用户名不能为空';
                    this.usernameError = 'invalid';
                    this.useraccountStatus = false;
                }else{
                    console.log('username'+value);
                    this.usernamePlaceholder = '请输入用户名或邮箱';
                     this.usernameError = '';
                    this.user.username = value;
                    this.useraccountStatus = true;
                }
                
            }else if(name == "password"){
                if(value == ''){
                    console.log('密码不能为空');
                    this.passwordPlaceholder = '密码不能为空';
                    this.passwordError = 'invalid';
                    this.passwordStatus = false;
                }else{
                    console.log('password'+value);
                    this.passwordPlaceholder = '请输入密码';
                    this.passwordError = '';
                    this.user.password = value;
                    this.passwordStatus = true;
                }
            }else if(name == "verifyCode"){
                 if(value == ''){
                    console.log('验证码不能为空');
                    this.verifyCodePlaceholder = '验证码不能为空';
                    this.verifyCodeError = 'invalid';
                    this.verifyStatus = false;
                }else{
                    console.log('password'+value);
                    this.verifyCodePlaceholder = '请输入验证码';
                    this.verifyCodeError = '';
                    this.verifycode = value;
                    this.verifyStatus = true;
                }
            }
            else if(name == "phoneNumber"){
                 if(value == ''){
                    console.log('手机号码不能为空');
                    this.phoneNumberError =  'invalid';
                    this.phoneNumberPlaceholder = '手机号码不能为空';
                    this.phoneNoStatus = false;
                }else{
                    console.log('phone'+value);
                    this.userphone.phoneNo = value;
                    this.phoneNumberError =  '';
                    this.phoneNumberPlaceholder = '请输入手机号码';
                    this.phoneNoStatus = true;
                }
            }else if(name == "phoneCode"){
                if(value == ''){
                    console.log('手机验证码不能为空');
                    this.phoneCodePlaceholder = '手机验证码不能为空';
                    this.phoneCodeError = 'invalid';
                    this.phoneCodeStatus = false;
                }else{
                    console.log('phoneCode'+value);
                    this.phoneCodeError = '';
                    this.phoneCodePlaceholder = '请输入手机验证码';
                    this.userphone.phoneCode = value;
                    this.phoneCodeStatus = true;
                }
            }
        },
        getPhoneCode(){
            
             if (!this.canClick) return ; //点击第一次后不允许再次点击，避免重复创建定时器
             this.canClick = false;
              alert('获取成功');
             this.phoneCodeContent = this.totalTime + 's后重新发送' //这里解决60秒不见了的问题
             let clock = window.setInterval(() => {
                 this.totalTime--
                 this.phoneCodeContent = this.totalTime + 's后重新发送'
                 if(this.totalTime == 0){
                     clearInterval(clock);
                     this.phoneCodeContent = '重新获取验证码'
                     this.canClick = true;
                     this.totalTime = 5;
                 }
             },1000)
             
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
    margin-top: 32px;
    margin-bottom: 27px;
        
    }

    .loginDiv .inputUserNameDiv{
           margin-left: 71px;
            margin-top: 52px;
        
    }

    .inputPhoneNumberDiv{
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

    .verifyPhoneCodeDiv{
        margin-left: 71px;
        /* margin-top: -17px; */
        margin-top: 37px;
        margin-bottom: 37px;
    }

    .usernameErrorTip{  /*用户登录信息的错误提示*/
        position: absolute;   /*如果用相对定位，原来label的位置还会存在占用，因此input会被顶下去*/
        bottom: 59.6%;
        left: 71%;
    }

    .phoneErrorTip{
        position: absolute;   /*如果用相对定位，原来label的位置还会存在占用，因此input会被顶下去*/
        bottom: 59.6%;
        left: 68%;
    }

    .phoneCodeErrorTip{
        position: absolute;
        bottom: 49%;
        left: 42%;
    }

    .passwordErrorTip{
        position: absolute;
        bottom: 49.6%;
        left: 73%;
    }

    .verifycodeErrorTip{  /*验证码的错误提示*/
        position: absolute;
        bottom: 40.4%;
        right: 33%;
    }

    .getPhoneCode{
        width: 46px;
        height: 50px;
        /* text-align: center; */
        background-color: #dedede;
        padding-left: 25px;
        padding-top: 16px;
        padding-bottom: 17px;
        padding-right: 23px;
        cursor: pointer;
    }

    .getPhoneCode:hover{
      
        background-color: #b5b5b5;
    }

    .disabled{
        background-color: #ddd;
        border-color: #ddd;
        color:#57a3f3;
        cursor: not-allowed; /*鼠标变化*/
    }
   
</style>
