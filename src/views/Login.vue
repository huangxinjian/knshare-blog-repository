<template>
  <div class="loginContainer container">
    <div >
      <div class="col-lg-8 loginImg">
        <img src="../assets/images/login.png">
      </div>
      <div class="col-lg-4 loginDiv">
        <img src="../assets/images/logo-blue.png">
        <label class="logotitle">KNShare</label>

        <!-- 普通登录组件 -->
        <template v-if="loginType=='normalLogin'">
          <div class="inputUserNameDiv">
            <base-input
              type="text"
              name="username"
              key="username"
              v-bind:usernameErrorClass="usernameError"
              v-bind:msg="usernamePlaceholder"
              v-on:returnValue="returnValue"
            ></base-input>
          </div>
          <div class="inputPasswordDiv">
            <base-input
              type="password"
              name="password"
              key="password"
              v-bind:passwordErrorClass="passwordError"
              v-bind:msg="passwordPlaceholder"
              v-on:showVerify.once="showVerify"
              v-on:returnValue="returnValue"
            ></base-input>
          </div>

          <div class="verifyCodeDiv" >
           <base-input
              type="text"
              name="verifyCode"
              key="verifyCode"
              ref="verifyInput"
              v-bind:verifyCodeErrorClass="verifyCodeError"
              verifyClass="verify"
              v-bind:msg="verifyCodePlaceholder"
              v-on:returnValue="returnValue"
            ></base-input> 
           <img style="width: 201px;height: 48px;margin-left: 9px;margin-top: 0px;cursor:pointer;" title="看不请，换一张" @click="changeVerifyCode()" src="../../public/verify/verifyCode.jpg">

          </div>
         
           <!-- <Slider></Slider> -->
          <!-- <span
            class="phoneLoginSpan"
            v-on:click="loginType='phoneLogin';verifyStatus=false;"
          >   </span> -->
          <span class="fogetPwdSpan" key="forgetPwd">忘记密码？</span>
        </template>

        <!-- 手机登录组件 -->
        <template v-else>
          <div class="inputPhoneNumberDiv">
            <base-input
              type="text"
              name="phoneNumber"
              key="phoneNumber"
              v-bind:phoneNumberErrorClass="phoneNumberError"
              v-bind:msg="phoneNumberPlaceholder"
              v-on:returnValue="returnValue"
            ></base-input>
          </div>
          <div class="verifyPhoneCodeDiv">
            <base-input
              type="text"
              name="phoneCode"
              key="phoneCode"
              v-bind:phoneCodeErrorClass="phoneCodeError"
              verifyClass="verify"
              v-bind:msg="phoneCodePlaceholder"
              v-on:returnValue="returnValue"
            ></base-input>
            <span
              class="getPhoneCode"
              :class="{disabled: !this.canClick}"
              v-on:click="getPhoneCode"
            >{{phoneCodeContent}}</span>
          </div>
          <span
            class="phoneLoginSpan"
            v-on:click="loginType='normalLogin';verifyStatus=false;"
          >账号密码登录</span>
        </template>

        <div
          class="btn btn-lg loginClickDiv"
          key="login"
          v-on:click="sendLoginRequest"
          v-bind:disabled="submit"
        >登录</div>

        <div class="loginFooter">
          <label>还没有账号？</label>
          <router-link to="regist" tag="span">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
// @ is an alias to /src
import BaseInput from "@/components/common/BaseInput.vue";
import Slider from "@/components/verifyCode/slider.vue";


export default {
  name: "login",
  components: {
    BaseInput,Slider
  },
  data: function() {
    return {
      isVerifyCode: false, //显示验证码的文本框

      //placeholder提示语
      usernamePlaceholder: "请输入用户名或邮箱",
      passwordPlaceholder: "请输入密码",
      verifyCodePlaceholder: "请输入验证码",
      phoneNumberPlaceholder: "请输入手机号码",
      phoneCodePlaceholder: "请输入手机验证码",

      // 提交的表单信息
      user: {
        //普通登录方式提交
        username: "",
        password: ""
      },
      userphone: {
        //验证码登录方式提交
        phoneNo: "",
        phoneCode: ""
      },
      verifycode: "", //验证码
      systemVerifyCode:'', // 系统生成的

      //只有当全部信息填写完成，才允许点击登录按钮
      useraccountStatus: false, //用户名邮箱是否通过验证
      passwordStatus: false, //密码填写是否通过验证
      verifyStatus: false, //验证码填写是否通过验证
      phoneNoStatus: false,
      phoneCodeStatus: false,

      loginType: "normalLogin", //登录类型

      usernameError: "", //username输入错误提示
      passwordError: "", //密码输入错误提示
      verifyCodeError: "", //验证码输入错误提示
      phoneNumberError: "", //手机号码错误提示
      phoneCodeError: "", //手机验证码错误提示

      phoneCodeContent: "发送验证码", // 按钮里显示的内容
      totalTime: 9, //记录具体倒计时时间
      canClick: true, //避免重复点击获取按钮
      
    };
  },
  computed: {
    submit() {
      if (this.loginType == "normalLogin") {
        return !(
          this.useraccountStatus &&
          this.passwordStatus &&
          this.verifyStatus
        );
      } else if (this.loginType == "phoneLogin") {
        return !(this.phoneNoStatus && this.phoneCodeStatus);
      }
    }
  },
  methods: {
    showVerify() {
      this.isVerifyCode = true;
    },
    sendLoginRequest() {
      var store = this.$store;
      var router = this.$router;
      let _this = this;
      this.$axios({
        method: 'post',
        url: '/knbolg/user/login.do',
        data:{
          userName:this.user.username,
          password:this.user.password,
        },
        headers:{
          "Content-Type":"application/json;charset=UTF-8"
        }
      }).then(function (response) {
        console.log(response.data);
        if (response.data.result == "false") {
             _this.$notify.error({
                title: '错误',
                message: '用户名或密码错误！请重新输入！'
              });
        }else if(response.data.result == "true"){
            store.state.user= response.data.loginUser;
            store.state.userInfo = response.data.userInfo;
            router.push({ name: 'blogMain', params: { blogSort: '0' }});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    
    },
    returnValue(value, name) {
      //用户输入的信息返回值
      if (name == "username") {
        if (value == "") {
          console.log("用户名不能为空");
          this.usernamePlaceholder = "用户名不能为空";
          this.usernameError = "invalid";
          this.useraccountStatus = false;
        } else {
          console.log("username" + value);
          this.usernamePlaceholder = "请输入用户名或邮箱";
          this.usernameError = "";
          this.user.username = value;
          this.useraccountStatus = true;
        }
      } 
      else if (name == "password") {
        if (value == "") {
          console.log("密码不能为空");
          this.passwordPlaceholder = "密码不能为空";
          this.passwordError = "invalid";
          this.passwordStatus = false;
        } else {
          console.log("password" + value);
          this.passwordPlaceholder = "请输入密码";
          this.passwordError = "";
          this.user.password = value;
          this.passwordStatus = true;
        }
      } 
      else if (name == "verifyCode") {
        if (value == "") {
          this.verifyCodePlaceholder = "验证码不能为空";
          this.verifyCodeError = "invalid";
          this.verifyStatus = false;
        } else if(value.toLowerCase() != this.systemVerifyCode.toLowerCase()){
            this.verifyCodePlaceholder = "验证码输入错误";
            this.verifyCodeError = "invalid";
            this.verifyStatus = false;
             this.$refs.verifyInput.value = "";
        }else {
          console.log("password" + value);
          this.verifyCodePlaceholder = "请输入验证码";
          this.verifyCodeError = "";
          this.verifycode = value;
          this.verifyStatus = true;
        }
      } 
      else if (name == "phoneNumber") {
        if (value == "") {
          console.log("手机号码不能为空");
          this.phoneNumberError = "invalid";
          this.phoneNumberPlaceholder = "手机号码不能为空";
          this.phoneNoStatus = false;
        } else {
          console.log("phone" + value);
          this.userphone.phoneNo = value;
          this.phoneNumberError = "";
          this.phoneNumberPlaceholder = "请输入手机号码";
          this.phoneNoStatus = true;
        }
      } 
      else if (name == "phoneCode") {
        if (value == "") {
          console.log("手机验证码不能为空");
          this.phoneCodePlaceholder = "手机验证码不能为空";
          this.phoneCodeError = "invalid";
          this.phoneCodeStatus = false;
        } else {
          console.log("phoneCode" + value);
          this.phoneCodeError = "";
          this.phoneCodePlaceholder = "请输入手机验证码";
          this.userphone.phoneCode = value;
          this.phoneCodeStatus = true;
        }
      }
    },
    getPhoneCode() {
      if (!this.canClick) return; //点击第一次后不允许再次点击，避免重复创建定时器
      this.canClick = false;
      alert("获取成功");
      this.phoneCodeContent = this.totalTime + "s后重新发送"; //这里解决60秒不见了的问题
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.phoneCodeContent = this.totalTime + "s后重新发送";
        if (this.totalTime == 0) {
          clearInterval(clock);
          this.phoneCodeContent = "重新获取验证码";
          this.canClick = true;
          this.totalTime = 5;
        }
      }, 1000);
    },
    changeVerifyCode(){
        let _this = this;
        this.$axios({
          method: 'post',
          url: '/knbolg/user/loadVerifyCode.do',
          headers:{
            "Content-Type":"application/json;charset=UTF-8"
          }
        }).then(function (response) {
          console.log(response.data);
          _this.systemVerifyCode = response.data.sessionVerifyCode;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted() {
     this.changeVerifyCode();
  },
};
</script>

<style scoped>
.loginContainer {
  margin: 0;
  width: 100%;
  padding: 0;
}
.loginImg {
  padding: 0;
}
.loginImg img {
  width: 100%;
  height: 754px;
}

.loginDiv {
  padding: 0;
  height: 750px;
  background-color: #f6fafb;
}

.loginDiv img {
  margin-left: 34%;
  margin-top: 12px;
}

.loginDiv .logotitle {
  margin-left: 136px;
  margin-top: -5px;
  font-size: 50px;
  color: #0084ff;
  font-weight: 100;
}
.phoneLoginSpan {
  color: #175199;
  font-size: 18px;
  font-family: 黑体;
  margin-left: 48px;
  cursor: pointer;
}
.phoneLoginSpan:hover {
  color: #8590a6;
}

.fogetPwdSpan {
  color: #175199;
  font-size: 18px;
  font-family: 黑体;
  margin-left: 346px;
  cursor: pointer;
}

.fogetPwdSpan:hover {
  color: #8590a6;
}

.loginDiv .inputPasswordDiv {
  margin-left: 48px;
  margin-top: 32px;
  margin-bottom: 27px;
}

.loginDiv .inputUserNameDiv {
  margin-left: 48px;
  margin-top: 52px;
}

.inputPhoneNumberDiv {
  margin-left: 48px;
  margin-top: 52px;
}

.loginClickDiv {
  width: 386px;
  margin-left: 48px;
  margin-top: 65px;
  background-color: #0084ff;
  color: #fff;
}

.loginClickDiv:hover {
  
  background-color: #0075e2;
  color: #fff;
}

.loginFooter {
  background-color: #d0cfcf;
  width: 100%;
  height: 47px;
  position: absolute;
  top: 94%;
  text-align: center;
  padding-top: 14px;
}

.loginFooter label {
  font-size: 15px;
}

.loginFooter span {
  color: #175199;
  font-size: 15px;
  font-family: Adobe 黑体 Std;
  cursor: pointer;
}

.verifyCodeDiv {
      margin-left: 48px;
    margin-bottom: 26px;
}

.verifyPhoneCodeDiv {
    margin-left: 48px;
    margin-top: 37px;
    margin-bottom: 37px;
}

.usernameErrorTip {
  position: absolute;
  bottom: 59.6%;
  left: 71%;
}

.phoneErrorTip {
  position: absolute;
  bottom: 59.6%;
  left: 68%;
}

.phoneCodeErrorTip {
  position: absolute;
  bottom: 49%;
  left: 42%;
}

.passwordErrorTip {
  position: absolute;
  bottom: 49.6%;
  left: 73%;
}

.verifycodeErrorTip {
  position: absolute;
  bottom: 40.4%;
  right: 33%;
}

.getPhoneCode {
         text-align: center;
    background-color: #dedede;
    /* padding-left: 29px; */
    padding-top: 16px;
    /* padding-bottom: 20px; */
    /* padding-right: 28px; */
    width: 141px;
    height: 50px;
    cursor: pointer;
    display: block;
    /* float: right; */
    position: absolute;
    /* top: -56px; */
    top: 354px;
    left: 64%;
}

.getPhoneCode:hover {
  background-color: #b5b5b5;
}

.disabled {
  background-color: #ddd;
  border-color: #ddd;
  color: #57a3f3;
  cursor: not-allowed;
}
</style>
