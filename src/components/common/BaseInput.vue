<template>
    <input v-bind:type="type" v-bind:placeholder="msg" v-bind:class="verifyClass" v-model="value" v-on:focus="focus"  >
</template>

<script>
export default {
    props:{
        'msg':String,
        'type':String,
        'verifyClass':{
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
            if(this.type=="password"){
                console.log('ok拉');
                this.$emit('showVerify');
            }
        }
      
    },
}
</script>

<style scoped>
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
     
   

</style>
