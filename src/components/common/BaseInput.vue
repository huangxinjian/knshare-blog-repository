<template>
<!--  v-bind:type="type"  接收input框类型
      v-bind:name="name"  接收input框名称
      v-bind:placeholder="msg" 接收input框提示语
      v-bind:class="verifyClass" 接收该input框是否为验证码框
      v-model.trim="value"   双向绑定Value值,并过滤掉前后空白
      v-on:focus="focus"  监听input框的获取焦点（focus）事件
      v-on:blur="blur" 监听input框的失去校验（blur）事件 -->
    <input  v-bind:type="type" 
            v-bind:name="name"  
            v-bind:placeholder="msg" 
            v-bind:readonly="workSortReadonly"
            v-bind:class="[ verifyClass,
                            registPhoneNoClass,
                            usernameErrorClass,
                            passwordErrorClass,
                            registerPwdErrorClass,
                            registerPwdAgainErrorClass,
                            registerUsernameErrorClass,
                            verifyCodeErrorClass,
                            phoneNumberErrorClass,
                            phoneCodeErrorClass]" 
            v-model.trim="value" 
            v-on:focus="focus"  
            v-on:blur="blur">
</template>

<script>
export default {
    props:{
        'name':String,
        'msg':String,
        'type':String,
        'workSortReadonly':String,
        'usernameErrorClass':{
            type:String,
            default:''
        },
        'passwordErrorClass':{
            type:String,
            default:''
        },
        'verifyCodeErrorClass':{
            type:String,
            default:''
        },
        'verifyClass':{
            type:String,
            default:''
        },
        'registPhoneNoClass':{
            type:String,
            default:''
        },
        'phoneNumberErrorClass':{
             type:String,
            default:''
        },
        'phoneCodeErrorClass':{
            type:String,
            default:''
        },
        'registerUsernameErrorClass':{
            type:String,
            default:''
        },
        'registerPwdErrorClass':{
             type:String,
            default:''
        },
        'registerPwdAgainErrorClass':{
             type:String,
            default:''
        }
    },
    data:function(){
        return{
            value:''
        }
    },methods: {
        focus(){
            if(this.name=="password"){
                // 显示验证码
                this.$emit('showVerify');  
            }else if(this.name == "registWorkingTruth"){
                console.log("sss");
                  this.$emit('showModal');  
            }
        },
        blur(){  //校验输入的内容是否正确 
            console.log(this.name);
            // if(this.name=="registWorkingTruth"){
            //     // 把模态框值设为false
            //     this.$emit('hideModal');  
            // }
            this.$emit('returnValue',this.value,this.name);  

        }
    },
}
</script>

<style scoped>

    /*当用户输入错误的时候，显示红色的placeholder*/
    input.invalid:-ms-input-placeholder{
         color: red;
         font-size: 20px;
         font-family: 黑体;
    }

    input.invalid::-webkit-input-placeholder {
         color: red;
         font-size: 20px;
         font-family: 黑体;
    }

    input::-webkit-input-placeholder {
        /* placeholder颜色  */
         color: #aab2bd;
        /* placeholder字体大小  */
         font-size: 20px;
         font-family: 黑体;
         /* placeholder位置  */
         /* text-align: right; */
     }

    input{
        padding-left: 5px;
        padding-bottom: 13px;
        background: transparent;
        border: none;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #b5b5b5;
        width: 388px;
        font-size: 20px;
        color: #1A1A1A;
    }

    input:focus { 
         outline: none;
         background-color: transparent;
     }

    .verify{
        padding-left: 5px;
        padding-bottom: 13px;
        background: transparent;
        border: none;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #b5b5b5;
        width: 270px;
        font-size: 20px;
        color: #1A1A1A;
    }

    .registPhoneNo{
        padding-left: 5px;
        padding-bottom: 1px;
        background: transparent;
        border: none;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #b5b5b5;
        width: 200px;
        font-size: 20px;
        color: #1A1A1A;
     }
</style>
