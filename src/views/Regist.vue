<template>
    <div class="registContainer">
        <div class="row">
            <div class="col-lg-8 registImg">
                <img src="../assets/images/regist.png">
            </div>
            <div class="col-lg-4 registDiv">
                <img src="../assets/images/logo-blue.png">
                <label class="registTitle">KNShare</label>

                <div class="progressBar">
                     <div class="circleBar progressActiveColor accountCircle"></div>
                     <span>账户信息</span>
                     <div class="strightBar1 progressNotActiveColor"></div>
                     <div class="circleBar progressNotActiveColor userinfoCircle "></div>
                     <span class="userinfoSpan">个人信息</span>
                     <div class="strightBar2 progressNotActiveColor"></div>
                     <div class="circleBar progressNotActiveColor finishCircle "></div>
                     <span class="finishSpan">注册完成</span>
                </div>

                <template>
                    <div class="registerUsernameDiv">
                        <base-input type="text" v-bind:msg="registerUsernamePlaceholder" :registerUsernameErrorClass="registerUsernameError" name="registUsername" v-on:returnValue="returnValue"></base-input>
                    </div>

                    <div class="registerPwdDiv">
                        <base-input type="text" v-bind:msg="registerPwdPlaceholder" :registerPwdErrorClass="registerPwdError" name="registPwd" v-on:returnValue="returnValue"></base-input>
                    </div>

                    <div class="registerPwdAgainDiv">
                        <base-input type="text" ref="pwdAgain" v-bind:msg="registerPwdAgainPlaceholder" :registerPwdAgainErrorClass="registerPwdAgainError" name="registPwdAgain" v-on:returnValue="returnValue"></base-input>
                    </div>
                </template>
            </div>
        </div>
        
    </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'
import BaseInput from '@/components/common/BaseInput.vue'

export default {
    name:'regist',
    components:{
        BaseInput
    },
    data(){
        return{
            //注册名的相关信息
            'registerUsernamePlaceholder':'账号名由英文和数字组成', 
            'registerUsernameError':''  ,
            'registerUsernameStatus':false,

            //注册密码的相关信息
            'registerPwdPlaceholder':'密码由英文、数字和特殊字符组成', 
            'registerPwdError':''  ,
            'registerPwdStatus':false,

            //再一次输入密码的相关信息
            'registerPwdAgainPlaceholder':'请再次输入密码', 
            'registerPwdAgainError':''  ,
            'registerPwdAgainStatus':false,
            
            //封装的注册信息
            'registUser':{
                'registName':'',
                'registPwd':''
            }
        }
    },
    methods: {
        returnValue(value,name){  //用户输入的信息返回值
             if(name == 'registUsername'){
                 if(value == ''){
                    console.log('注册名不能为空');
                    this.registerUsernamePlaceholder = '注册名不能为空';
                    this.registerUsernameError = 'invalid';
                    this.registerUsernameStatus = false;
                }else{
                    console.log('registName'+value);
                    this.registerUsernamePlaceholder = '账号名由英文和数字组成';
                    this.registerUsernameError = '';
                    this.registUser.registName = value;
                    this.registerUsernameStatus = true;
                }
            }else if(name == 'registPwd'){
                 if(value == ''){
                    console.log('密码不能为空');
                    this.registerPwdPlaceholder = '密码不能为空';
                    this.registerPwdError = 'invalid';
                    this.registerPwdStatus = false;
                }else{
                    console.log('registName'+value);
                    this.registerPwdPlaceholder = '密码由英文、数字和特殊字符组成';
                    this.registerPwdError = '';
                    this.registUser.registPwd = value;
                    this.registerPwdStatus = true;
                }
               
            }else if(name == 'registPwdAgain'){
                if(value == ''){
                    console.log('密码不能为空');
                    this.registerPwdAgainPlaceholder = '请再输入一次密码';
                    this.registerPwdAgainError = 'invalid';
                    this.registerPwdAgainStatus = false;
                }else{
                    if(value != this.registUser.registPwd){
                        this.registerPwdAgainPlaceholder = '两次输入的密码不一致';
                        this.registerPwdAgainError = 'invalid';
                        this.registerPwdAgainStatus = false;
                        this.$refs.pwdAgain.value = "";  //清空value的值
                    }else{
                        this.registerPwdAgainPlaceholder = '请再次输入密码';
                        this.registerPwdAgainError = '';
                        this.registerPwdAgainStatus = true;
                    }
                }
            }
        },
    },
}
</script>


<style scoped>

    .registContainer{
        background-color: blue;
        margin: 0;
        width: 1520px;
    }

    .registImg{
        padding: 0;
        background-color: red;
    }
    .registImg img{
        width: 1034px;
        height: 754px;
    }
    
    .registDiv{
        padding: 0;
        height: 750px;
        background-color:#f6fafb;
    }

     .registDiv img{
        margin-left: 186px;
        margin-top: 12px;
    }

    .registDiv .registTitle{
        margin-left: 164px;
        margin-top: -5px;
        font-size: 50px;
        color: #0084ff;
        font-weight: 100;
    }

    .registDiv .registerUsernameDiv{
        margin-left: 71px;
        margin-top: 52px;
    }

    .registDiv .registerPwdDiv{
        margin-left: 71px;
        margin-top: 28px;
    }

     .registDiv .registerPwdAgainDiv{
        margin-left: 71px;
        margin-top: 28px;
    }

    

    .progressBar{
        width: 300px;
        height: 30px;
        margin: 9px 0 0 117px;
    }



    .circleBar{
        width: 15px;
        height: 15px;
        border-radius: 15px;
        margin-bottom: 3px;
    }

    .strightBar1{
        width: 100px;
        height: 8px;
        position: relative;
        left: 33px;
        bottom: 35px;
    }

    .strightBar2{
        width: 100px;
        height: 8px;
        position: relative;
        left: 145px;
        bottom: 82px;
    }

    .progressActiveColor{
        background-color: #0084ff;
    }

    .progressNotActiveColor{
        background-color: #8095a6;
    }

    .accountCircle{
        position: relative;
        left: 19px;
    }

    .userinfoCircle{
        position: relative;
        left: 132px;
        bottom: 47px;
    }

    .finishCircle{
        position: relative;
        left: 244px;
        bottom: 93px;
    }

    .userinfoSpan{
        position: relative;
        bottom: 47px;
        left: 113px;
    }

    .finishSpan{
        position: relative;
        bottom: 94px;
        left: 224px;
    }

    .progressBar span{
        color: #8095a6;
        font-family: 黑体
    }
</style>
