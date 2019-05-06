<template>
  <div class="registContainer">
    <div class="row">
      <div class="col-lg-8 registImg">
        <img src="../assets/images/regist.png">
      </div>
      <div class="col-lg-4 registDiv">
        <img src="../assets/images/logo-blue.png">
        <label class="registTitle">KNShare</label>

        <!-- 进度条 -->
        <div class="progressBar">
          <div class="circleBar progressActiveColor accountCircle"></div>
          <span>账户信息</span>
          <div
            class="strightBar1"
            v-bind:class="[firstBar ? 'progressActiveColor' : 'progressNotActiveColor' ]"
          ></div>
          <div
            class="circleBar userinfoCircle"
            v-bind:class="[firstBar ? 'progressActiveColor' : 'progressNotActiveColor' ]"
          ></div>
          <span class="userinfoSpan">个人信息</span>
          <div
            class="strightBar2"
            v-bind:class="[secondBar ? 'progressActiveColor' : 'progressNotActiveColor' ]"
          ></div>
          <div class="circleBar progressNotActiveColor finishCircle"></div>
          <span class="finishSpan">注册完成</span>
        </div>

        <template v-if="progressStatus==1">
          <div class="registerUsernameDiv">
            <base-input
              type="text"
              ref="rusername"
              v-bind:msg="registerUsernamePlaceholder"
              :registerUsernameErrorClass="registerUsernameError"
              name="registUsername"
              v-on:returnValue="returnValue"
            ></base-input>
            <img
              class="tipIcon usernameTip"
              src="../assets/images/tipIcon.png"
              v-on:mouseenter="showUsernameTip"
              v-on:mouseout="hideUsernameTip"
            >
            <div class="tag" v-show="usernameTipStatus">
              <em></em>
              <span></span>
              <p>账号名只能由英文字母和数字组成，并且需要英文开头，长度为5-16个字符。</p>
            </div>
          </div>
          <div class="registerPwdDiv">
            <base-input
              type="password"
              ref="rpassword"
              :msg="registerPwdPlaceholder"
              :registerPwdErrorClass="registerPwdError"
              name="registPwd"
              @returnValue="returnValue"
            ></base-input>
            <img
              class="tipIcon passwordTip"
              src="../assets/images/tipIcon.png"
              v-on:mouseenter="showPwdTip"
              v-on:mouseout="hidePwdTip"
            >
            <div class="tag1" v-show="pwdTipStatus">
              <em></em>
              <span></span>
              <p>密码可由英文字母、数字以及特殊字符组成，长度为5-16个字符</p>
            </div>
          </div>
          <div class="registerPwdAgainDiv">
            <base-input
              type="password"
              ref="pwdAgain"
              :msg="registerPwdAgainPlaceholder"
              :registerPwdAgainErrorClass="registerPwdAgainError"
              name="registPwdAgain"
              v-on:returnValue="returnValue"
            ></base-input>
          </div>

          <span class="nextProgress firstProgress" v-on:click="verify(progressStatus)">下一步</span>
        </template>

        <template v-else-if="progressStatus==2">
          <div class="row">
            <div class="col-lg-2"></div>
            <div class="col-lg-7">
              <div class="row">
                <div class="col-lg-5">
                  <span class="personalInfoSpanOptionName">性别：</span>
                  <span class="personalInfoSpanOptionName">手机号码：</span>
                  <span class="personalInfoSpanOptionName">邮箱：</span>
                  <span class="personalInfoSpanOptionName">是否工作：</span>
                  <span
                    v-if="prosonalInfo.workingTruth == 'working'"
                    class="personalInfoSpanOptionName"
                  >工作方向：</span>
                  <span
                    v-else-if="prosonalInfo.workingTruth == 'unemployed'"
                    class="personalInfoSpanOptionName"
                  >理想方向：</span>
                </div>
                <div class="col-lg-7">
                  <!-- 性别选择 -->
                  <span class="personalInfoSpanOptionValue genderSpan">
                    <input
                      id="male"
                      type="radio"
                      name="gender"
                      value="MALE"
                      v-model="prosonalInfo.gender"
                      checked
                    >
                    <label for="male" class="maleLabel"></label>
                    <img
                      style="margin: -12px 75px 0px 0px;"
                      src="../assets/images/male.png"
                      title="男性"
                      alt="男性"
                    >
                    
                    <input
                      id="female"
                      type="radio"
                      name="gender"
                      value="FEMALE"
                      v-model="prosonalInfo.gender"
                    >
                    <label for="female" class="femaleLabel"></label>
                    <img
                      style="margin: -64px 0px 0px 0px;"
                      src="../assets/images/female.png"
                      title="女性"
                      alt="女性"
                    >
                  </span>
                  <!-- 手机号码 -->
                  <span class="personalInfoSpanOptionValue registPhoneNoSpan">
                    <base-input
                      type="text"
                      name="registPhoneNumber"
                      key="registPhoneNumber"
                      registPhoneNoClass="registPhoneNo"
                      @returnValue="returnValue"
                    ></base-input>
                    <img
                      style="margin: -11px 30px 0px 0px;display:block;background-color: #f6fafb;"
                      class="tipIcon phoneNumberTip"
                      :src="phoneNoTipSrc"
                      v-on:mouseenter="showPhoneNoTip"
                      v-on:mouseout="hidePhoneNoTip"
                    >
                    <div class="registPhoneNoTip" v-show="phoneNoTipStatus">
                      <em></em>
                      <span></span>
                      <p :style="phoneErrorTip ? 'color:red;font-weight:bold' : ''">{{phoneTipMsg}}</p>
                    </div>
                  </span>
                  <!-- 邮箱 -->
                  <span class="personalInfoSpanOptionValue registEmailSpan">
                    <base-input
                      type="text"
                      name="registEmail"
                      key="registEmail"
                      registPhoneNoClass="registPhoneNo"
                      @returnValue="returnValue"
                    ></base-input>
                    <img
                      style="margin: -11px 30px 0px 0px; display:block;background-color: #f6fafb;"
                      class="tipIcon emailTip"
                      :src="emailTipSrc"
                      v-on:mouseenter="showEmailTip"
                      v-on:mouseout="hideEmailTip"
                    >
                    <div class="registEmailTip" v-show="emailTipStatus">
                      <em></em>
                      <span></span>
                      <p :style="emailErrorTip ? 'color:red;font-weight:bold' : ''">{{emailTipMsg}}</p>
                    </div>
                  </span>
                  <!-- 是否工作 -->
                  <span class="personalInfoSpanOptionValue registWorkStatusSpan">
                    <input
                      id="working"
                      type="radio"
                      name="workStatus"
                      value="working"
                      v-model="prosonalInfo.workingTruth"
                      checked
                    >
                    <label for="working" class="workingLabel"></label>
                    <span style="position: absolute;top: 214px;right: 80px;">工作中</span>
                    <input
                      id="unemployed"
                      type="radio"
                      name="workStatus"
                      value="unemployed"
                      v-model="prosonalInfo.workingTruth"
                    >
                    <label for="unemployed" class="unemployedLabel"></label>
                    <span style="position: absolute;top: 214px;right: -15px;">未工作</span>
                  </span>
                  <!-- 工作方向（工作中或理想工作） -->
                  <span
                    v-if="prosonalInfo.workingTruth != ''"
                    class="personalInfoSpanOptionValue registWorkDirectionSpan"
                  >
                    <base-input
                      ref="rworkSort"
                      type="text"
                      name="registWorkingTruth"
                      key="registWorkingTruth"
                      workSortReadonly="readonly"
                      registJobSortClass="registJobSort"
                      @showModal="showModal"
                    ></base-input>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-3"></div>
          </div>
          <span class="nextProgress secondProgress" v-on:click="verify(progressStatus)">下一步(可跳过)</span>
          <WorkSort
            :modal="modalShow"
            @hideModal="hideModal"
            @getJobSelectValue="getJobSelectValue"
          ></WorkSort>
        </template>

        <template v-else-if="progressStatus==3">
          <SlideBar @showGoLoginButton="showGoLoginButton"></SlideBar>
          <!-- <Button size="large" type="primary">Primary</Button> -->
          <!-- 如果要通过第三方动画库来使用动画,需要配置 enter-active-class 和 leave-active-class 属性 -->
          <transition enter-active-class="animated jello">
            <div
              @mouseover="activeColor='#2b85e4'"
              @mouseout="activeColor='#0084ff'"
              v-bind:style="{ backgroundColor: activeColor}"
              v-if="showLoginButton"
              class="goLogin btn"
              @click="goLoginPage"
            >进入KnShare</div>
          </transition>
        </template>

        <div class="loginFooter">
          <label>已有账号？</label>
          <router-link to="login" tag="span">登录</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import BaseInput from "@/components/common/BaseInput.vue";
import tipIcon1 from "@/assets/images/tipIcon.png";
import tipError1 from "@/assets/images/tipError.png";
import WorkSort from "@/components/workSort/WorkSort.vue";
import SlideBar from "@/components/common/VerifyCode.vue";
import axios from "axios";
axios.defaults.withCredentials = true


export default {
  name: "regist",
  components: {
    BaseInput,
    WorkSort,
    SlideBar
  },
  data() {
    return {
      //注册名的相关信息
      registerUsernamePlaceholder: "账号名由英文和数字组成",
      registerUsernameError: "",
      registerUsernameStatus: false,

      //注册密码的相关信息
      registerPwdPlaceholder: "密码由英文、数字和特殊字符组成",
      registerPwdError: "",
      registerPwdStatus: false,

      //再一次输入密码的相关信息
      registerPwdAgainPlaceholder: "请再次输入密码",
      registerPwdAgainError: "",
      registerPwdAgainStatus: false,

      //手机号码相关信息
      phoneNoTipSrc: tipIcon1,
      phoneTipMsg: "手机号码可用作后续登录账号",
      phoneErrorTip: false,

      //邮箱相关信息
      emailTipSrc: tipIcon1,
      emailTipMsg: "邮箱可用作后续登录账号",
      emailErrorTip: false,

      //封装的注册信息
      registUser: {
        //账号信息
        registName: "",
        registPwd: ""
      },
      prosonalInfo: {
        //个人信息
        gender: null,
        phoneNo: "",
        email: "",
        workingTruth: "", //是否工作
        selectJobSort: ""
      },

      //注册进度条控制变量
      firstBar: false,
      secondBar: false,

      //注册进度控制变量 1代表账号信息 2代表个人信息 3代表验证码信息
      progressStatus: 1,

      //提示信息显示控制变量
      usernameTipStatus: false,
      pwdTipStatus: false,
      phoneNoTipStatus: false,
      emailTipStatus: false,
      modalShow: false,

      showLoginButton: false,
      activeColor: "#0084ff",

    };
  },
  methods: {
    returnValue(value, name) {
      //用户输入的信息返回值
      var functionname =
        "this.verify" + name.substring(0, 1).toUpperCase() + name.substring(1);
      console.log(functionname + "('" + value + "')");
      eval(functionname + "('" + value + "')");
      // if(name == 'registPhoneNumber'){
      //    verifyRegistPhoneNumber(value);
      // }
    },
    verifyRegistUsername(value) {
      //验证注册名是否符合格式
      if (value == "" || value == null) {
        console.log("注册名不能为空");
        this.registerUsernamePlaceholder = "注册名不能为空";
        this.registerUsernameError = "invalid";
        this.registerUsernameStatus = false;
      } else {
        var pattern = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/; //验证只能输入英文和数字，并且需要英文开头，长度为4-15个字符
        if (pattern.test(value)) {
          //说明符合正则表达式
          this.registerUsernamePlaceholder = "账号名由英文和数字组成";
          this.registerUsernameError = "";
          this.registUser.registName = value;
          this.registerUsernameStatus = true;
          let _this = this;
          this.$axios({
              method: 'post',
              url: '/knbolg/user/checkUserName.do',
              headers:{
                      "Content-Type":"application/json;charset=UTF-8"
              },
              data:{
                  userName:_this.registUser.registName,
              },
          }).then( (response) => {
              if(response.data.result == "false"){
                _this.registerUsernamePlaceholder = response.data.msg;
                _this.registerUsernameError = "";
                _this.$refs.rusername.value = ""; //清空value的值
                _this.registerUsernameError = "invalid";
                _this.registerUsernameStatus = false;
              }
          })
          .catch(function (error) {
              _this.$Message.info('请重新尝试！');
          });

        } else {
          //说明符合不正则表达式
          this.registerUsernamePlaceholder = "账号名须由英文和数字组成";
          this.registerUsernameError = "";
          this.$refs.rusername.value = ""; //清空value的值
          this.registerUsernameError = "invalid";
          this.registerUsernameStatus = false;
        }
      }
    },
    verifyRegistPwd(value) {
      //验证注册密码是否符合格式
      if (value == "" || value == null) {
        console.log("密码不能为空");
        this.registerPwdPlaceholder = "密码不能为空";
        this.registerPwdError = "invalid";
        this.registerPwdStatus = false;
      } else {
        console.log("密码：" + value);
        this.registerPwdPlaceholder = "密码由英文、数字和特殊字符组成";
        this.registerPwdError = "";
        this.registUser.registPwd = value;
        this.registerPwdStatus = true;
      }
    },
    verifyRegistPwdAgain(value) {
      //验证重复密码是否正确
      if (value == "" || value == null) {
        console.log("密码不能为空");
        this.registerPwdAgainPlaceholder = "请再输入一次密码";
        this.registerPwdAgainError = "invalid";
        this.registerPwdAgainStatus = false;
      } else {
        if (value != this.registUser.registPwd) {
          //有重复输入但是密码不一致
          this.registerPwdAgainPlaceholder = "两次输入的密码不一致";
          this.registerPwdAgainError = "invalid";
          this.registerPwdAgainStatus = false;
          this.$refs.pwdAgain.value = ""; //父组件操作子组件来清空子组件中value的值
        } else {
          //密码一致
          this.registerPwdAgainPlaceholder = "请再次输入密码";
          this.registerPwdAgainError = "";
          this.registerPwdAgainStatus = true;
        }
      }
    },
    verifyRegistPhoneNumber(value) {
      //验证手机号码是否为空且格式是否正确
      if (value != "") {
        var reg = /^1[0-9]{10}$/; //移动手机号码
        if (reg.test(value)) {
          //说明符合正则表达式
          this.prosonalInfo.phoneNo = value; //保存手机号码到data中
          this.phoneNoTipSrc = tipIcon1;
          this.phoneTipMsg = "手机号码可用作后续登录账号!";
          this.phoneErrorTip = false;
        } else {
          //说明符合不正则表达式
          this.phoneNoTipSrc = tipError1;
          this.phoneTipMsg = "手机号码格式错误，请重新输入正确的手机号码！";
          this.phoneErrorTip = true;
        }
      }
    },
    verifyRegistEmail(value) {
      //验证邮箱是否为空且格式是否正确
      if (value != "") {
        var reg = new RegExp(
          "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
        );
        if (reg.test(value)) {
          //说明符合正则表达式
          this.prosonalInfo.email = value; //保存手机号码到data中
          this.emailTipSrc = tipIcon1;
          this.emailTipMsg = "邮箱可用作后续登录账号!";
          this.emailErrorTip = false;
        } else {
          //说明符合不正则表达式
          this.emailTipSrc = tipError1;
          this.emailTipMsg = "邮箱格式错误，请重新输入正确的邮箱！";
          this.emailErrorTip = true;
        }
      }
    },
    verify(progressStatus) {
      //执行下一步的处理函数，判断信息填写是否正确
      //验证第一步信息填写是否正确
      if (progressStatus == 1) {
        if (
          this.registerUsernameStatus &&
          this.registerPwdAgainStatus &&
          this.registerPwdStatus
        ) {
          this.progressStatus = 2; //进入下一个注册阶段
          this.firstBar = true; //控制进度条前进
        } else {
          this.$refs.rusername.blur();
          this.$refs.pwdAgain.blur();
          this.$refs.rpassword.blur();
        }
      } else if (progressStatus == 2) {
        this.progressStatus = 3; //进入最后一个注册阶段
        this.secondBar = true;
      }
    },
    //显示和隐藏提示信息的处理函数
    showUsernameTip() {
      this.usernameTipStatus = true;
    },
    hideUsernameTip() {
      this.usernameTipStatus = false;
    },
    showPwdTip() {
      this.pwdTipStatus = true;
    },
    hidePwdTip() {
      this.pwdTipStatus = false;
    },
    showPhoneNoTip() {
      this.phoneNoTipStatus = true;
    },
    hidePhoneNoTip() {
      this.phoneNoTipStatus = false;
    },
    showEmailTip() {
      this.emailTipStatus = true;
    },
    hideEmailTip() {
      this.emailTipStatus = false;
    },
    showModal() {
     
      //显示 工作分类模态框
      this.modalShow = true;
    },
    hideModal() {
      //隐藏 工作分类模态框
      this.modalShow = false;
    },
    getJobSelectValue(v) {
      this.prosonalInfo.selectJobSort = v;
      this.$refs.rworkSort.value = v;
    },
    showGoLoginButton() {
      this.showLoginButton = true;
    },
    goLoginPage() {  //注册并跳转到登录页面
      var store = this.$store;
      var router = this.$router;
      axios({
        method: 'post',
        url: '/knbolg/user/register.do',
        data:{
          userName:this.registUser.registName,
          password:this.registUser.registPwd,
          email:this.prosonalInfo.email,
          gender:this.prosonalInfo.gender,
          phoneNumber:this.prosonalInfo.phoneNo,
          workingTruth:this.prosonalInfo.workingTruth,
          selectSort:this.prosonalInfo.selectJobSort
        },
        headers:{
          "Content-Type":"application/json;charset=UTF-8"
        }
      }).then(function (response) {
        // store.state.user= response.data.loginUser;
        // router.push({ name: 'blogMain', params: { blogSort: 'tuijian' }});
        console.log(response);
        router.push({ name: 'Login'});
      })
      .catch(function (error) {
        console.log(error);
      });
      // this.$router.push({ path: "/login" });
    }
  }
};
</script>


<style scoped>
.goLogin {
  color: #fff;
  width: 268px;
  height: 50px;
  /* text-align: center; */
  padding: 14px;
  position: relative;
  top: 151px;
  left: 113px;
}

.registContainer {
  /* background-color: blue; */
  margin: 0;
  width: 100%;
}

.registImg {
  padding: 0;
  /* background-color: red; */
}
.registImg img {
  width: 100%;
  height: 754px;
}

.registDiv {
  padding: 0;
  height: 750px;
  background-color: #f6fafb;
}

.registDiv img {
  margin-left: 173px;
  margin-top: 12px;
}

.registDiv .registTitle {
  margin-left: 147px;
  margin-top: -5px;
  font-size: 50px;
  color: #0084ff;
  font-weight: 100;
}

.registDiv .registerUsernameDiv {
  margin-left: 54px;
  margin-top: 52px;
}

.registDiv .registerPwdDiv {
  margin-left: 54px;
  margin-top: 28px;
}

.registDiv .registerPwdAgainDiv {
  margin-left: 54px;
  margin-top: 28px;
}

.progressBar {
  width: 300px;
  height: 30px;
  margin: 9px 0 0 108px;
}

.circleBar {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  margin-bottom: 3px;
}

.strightBar1 {
  /*进度条第一个横杠*/
  width: 100px;
  height: 8px;
  position: relative;
  left: 33px;
  bottom: 32px;
}

.strightBar2 {
  /*进度条第二个横杠*/
  width: 100px;
  height: 8px;
  position: relative;
  left: 146px;
  bottom: 76px;
}

.progressActiveColor {
  background-color: #0084ff;
}

.progressNotActiveColor {
  background-color: #8095a6;
}

.accountCircle {
  position: relative;
  left: 19px;
}

.userinfoCircle {
  /*进度条第二个圆形*/
  position: relative;
  left: 132px;
  bottom: 44px;
}

.finishCircle {
  /*进度条最后一个圆形*/
  position: relative;
  left: 244px;
  bottom: 88px;
}

.userinfoSpan {
  /*进度条第二个span*/
  position: relative;
  bottom: 44px;
  left: 113px;
}

.finishSpan {
  /*进度条最后一个span*/
  position: relative;
  bottom: 88px;
  left: 224px;
}

.progressBar span {
  color: #8095a6;
  font-family: 黑体;
}

.nextProgress {
  color: #0084ff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

/* 第一个 下一步 */
.firstProgress {
  position: absolute;
  left: 80%;
  top: 72%;
}

/* 第二个 下一步 */
.secondProgress {
  position: absolute;
  left: 70%;
  top: 80%;
}

.tipIcon {
  margin: 0;
}

.usernameTip {
  position: absolute;
  top: 41%;
  right: 15%;
  z-index: 3;
}

.passwordTip {
  position: absolute;
  top: 50.5%;
  right:15%;
  z-index: 1;
}

.phoneNumberTip {
  position: absolute;
  /* top: -19.5%; */
  bottom: 6%;
  left: 88%;
  z-index: 4;
}

.emailTip {
  position: absolute;
  /* top: -19.5%; */
  bottom: 6%;
  left: 88%;
  z-index: 2;
}

.tag {
  width: 155px;
  height: 70px;
  background-color: #fafafa;
  border: 1px solid #b5b5b5;
  position: absolute;
  left: 56.9%;
  top: 47%;
  border-radius: 4px;
  z-index: 2;
}
.tag em {
  display: block;
  border-width: 11px;
  position: absolute;
  bottom: 68px;
  left: 121px;
  border-style: solid dashed dashed;
  border-color: transparent transparent #b5b5b5 transparent;
  font-size: 0;
  line-height: 0;
}
.tag span {
  display: block;
  border-width: 11px;
  position: absolute;
  bottom: 67px;
  left: 121px;
  border-style: solid dashed dashed;
  border-color: transparent transparent #fafafa transparent;
  font-size: 0;
  line-height: 0;
}
.tag p {
  font-size: 12px;
  color: #b5b5b5;
  padding-left: 4px;
  padding-top: 3px;
  font-family: 微软雅黑;
}

.tag1 {
  width: 155px;
  height: 70px;
  background-color: #fafafa;
  border: 1px solid #b5b5b5;
  position: absolute;
  left: 56.9%;
  top: 56.5%;
  border-radius: 4px;
  z-index: 0;
}
.tag1 em {
  display: block;
  border-width: 11px;
  position: absolute;
  bottom: 68px;
  left: 121px;
  border-style: solid dashed dashed;
  border-color: transparent transparent #b5b5b5 transparent;
  font-size: 0;
  line-height: 0;
}
.tag1 span {
  display: block;
  border-width: 11px;
  position: absolute;
  bottom: 67px;
  left: 121px;
  border-style: solid dashed dashed;
  border-color: transparent transparent #fafafa transparent;
  font-size: 0;
  line-height: 0;
}
.tag1 p {
  font-size: 12px;
  color: #b5b5b5;
  padding-left: 4px;
  padding-top: 3px;
  font-family: 微软雅黑;
}

.registPhoneNoTip {
  width: 155px;
  height: 60px;
  background-color: #fafafa;
  border: 1px solid #b5b5b5;
  position: absolute;
  left: 27.4%;
  top: 121.5%;
  border-radius: 4px;
  text-align: left;
  z-index: 3;
}
.registPhoneNoTip em {
  display: block;
  border-width: 11px;
  position: absolute;
  bottom: 58px;
  left: 121px;
  border-style: solid dashed dashed;
  border-color: transparent transparent #b5b5b5 transparent;
  font-size: 0;
  line-height: 0;
}
.registPhoneNoTip span {
  display: block;
  border-width: 11px;
  position: absolute;
  bottom: 57px;
  left: 121px;
  border-style: solid dashed dashed;
  border-color: transparent transparent #fafafa transparent;
  font-size: 0;
  line-height: 0;
}
.registPhoneNoTip p {
  font-size: 12px;
  color: #b5b5b5;
  padding-left: 4px;
  padding-top: 3px;
  font-family: 微软雅黑;
}

.registEmailTip {
  width: 155px;
  height: 60px;
  background-color: #fafafa;
  border: 1px solid #b5b5b5;
  position: absolute;
  left: 27.4%;
  top: 121.5%;
  border-radius: 4px;
  text-align: left;
  z-index: 1;
}
.registEmailTip em {
  display: block;
  border-width: 11px;
  position: absolute;
  bottom: 58px;
  left: 121px;
  border-style: solid dashed dashed;
  border-color: transparent transparent #b5b5b5 transparent;
  font-size: 0;
  line-height: 0;
}
.registEmailTip span {
  display: block;
  border-width: 11px;
  position: absolute;
  bottom: 57px;
  left: 121px;
  border-style: solid dashed dashed;
  border-color: transparent transparent #fafafa transparent;
  font-size: 0;
  line-height: 0;
}
.registEmailTip p {
  font-size: 12px;
  color: #b5b5b5;
  padding-left: 4px;
  padding-top: 3px;
  font-family: 微软雅黑;
}

.personalInfoSpanOptionName {
  font-size: 18px;
  font-family: 黑体;
  color: #010101;
  display: block;
  text-align: right;
  margin: 34px 0px 0px;
}

.personalInfoSpanOptionValue {
  font-size: 18px;
  font-family: 黑体;
  color: #010101;
  display: block;
  text-align: right;
  margin: 34px 0px 0px;
}

.genderSpan > input[type="radio"] {
  width: 20px;
  height: 20px;
  opacity: 0;
}

.genderSpan > label {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #999;
}

/*设置选中的input的样式*/
/* + 是兄弟选择器,获取选中后的label元素*/
.genderSpan > input:checked + label {
  background-color: #0084ff;
  border: 1px solid #0084ff;
}

.genderSpan > input:checked + label::after {
  position: absolute;
  content: "";
  width: 5px;
  height: 10px;
  top: 3px;
  left: 6px;

  /* 出现一个勾号 */
  border: 2px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}

.maleLabel {
  position: absolute;
  left: 5px;
  top: 38px;
}

.femaleLabel {
  position: absolute;
  left: 102px;
  top: 38px;
}

.registPhoneNoSpan {
  position: absolute;
  left: 2px;
  top: 57px;
}

.registEmailSpan {
  position: absolute;
  left: 2px;
  top: 118px;
}

.registWorkStatusSpan > input[type="radio"] {
  width: 20px;
  height: 20px;
  opacity: 0;
}

.registWorkStatusSpan > label {
  width: 20px;
  height: 20px;
  /* border-radius: 50%; */
  border: 1px solid #999;
}

/*设置选中的input的样式*/
/* + 是兄弟选择器,获取选中后的label元素*/
.registWorkStatusSpan > input:checked + label {
  background-color: #0084ff;
  border: 1px solid #0084ff;
}

.registWorkStatusSpan > input:checked + label::after {
  position: absolute;
  content: "";
  width: 5px;
  height: 10px;
  top: 3px;
  left: 6px;

  /* 出现一个勾号 */
  border: 2px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}

.workingLabel {
  position: absolute;
  left: 5px;
  top: 217px;
}

.unemployedLabel {
  position: absolute;
  left: 102px;
  top: 217px;
}

.registWorkDirectionSpan {
  position: absolute;
  left: 3px;
  top: 236px;
}

.row{
  margin-right:0px;
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

</style>
