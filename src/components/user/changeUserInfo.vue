<template>
  <div>
       <Modal class="changeInfoModal"
        v-model="modal1"
        :mask-closable = false
        :scrollable = true
        :draggable = true
        @on-ok="ok"
        @on-cancel="cancel">
        <p slot="header" style="color:#2d8cf0;text-align:center">
            <span>个人信息修改</span>
        </p>
        <div class="userInfoDiv">
            <ul class="userInfoTitleUL">
                <li>用 户 名:</li>
                <li>性　　别:</li>
                <li>邮　　箱:</li>
                <li>联系方式:</li>
                <li>工作状态:</li>
                <li v-if="workingTruth == 'working'">工作方向:</li>
                <li v-else-if="workingTruth == 'unemployed'">理想方向:</li>
            </ul>
            <ul class="userInfoBodyUL">
                <li><Input class="userInfoBodyInput" v-model="nickName" placeholder="Enter something..." clearable style="width: 200px" /></li>
                <li>
                    <Select v-model="gender" style="width:200px">
                        <Option value="MALE">男性<i class="fa fa-male fa-lg" style="float:right;margin-top:2px;color: #2980b9"></i></Option>
                        <Option value="FEMALE">女性<i class="fa fa-female fa-lg" style="float:right;margin-top:2px;color: pink"></i></Option>
                    </Select>
                </li>
                <li><Input class="userInfoBodyInput" v-model="email" placeholder="Enter something..." clearable style="width: 200px" /></li>
                <li><Input class="userInfoBodyInput" v-model="phoneNumber" placeholder="Enter something..." clearable style="width: 200px" /></li>
                <li>
                    <Select v-model="workingTruth" style="width:200px">
                        <Option value="working">工作ing...<i class="fa fa-smile-o fa-lg" style="float:right;margin-top:2px;color: #2d8cf0"></i></Option>
                        <Option value="unemployed">待业ing...<i class="fa fa-hand-grab-o fa-lg" style="float:right;margin-top:2px;color: red"></i></Option>
                    </Select>
                </li>
                <li><Input class="userInfoBodyInput" 
                            v-model="selectSort" 
                            placeholder="Enter something..." 
                            clearable style="width: 200px"
                            @on-focus="showModal"
                             /></li>
                <!-- <li><Input v-model="value14" placeholder="Enter something..." clearable style="width: 200px" /></li> -->
            </ul>
        </div>
    </Modal>
    <WorkSort
            :modal="modalShow"
            @hideModal="hideModal"
            @getJobSelectValue="getJobSelectValue">
    </WorkSort>
  </div>
 
</template>
<script>


import WorkSort from "@/components/workSort/WorkSort.vue";
    export default {
        props:{
            'showInfoModal':false,
        }, 
        components:{WorkSort},
        data () {
            return {
                modal1: false,
                nickName: '',
                gender:'',
                email:'',
                phoneNumber:'',
                workingTruth:'',
                selectSort:'',
                modalShow:false,
            }
        },
        methods: {
            ok () {
                var _this = this;
                var store = this.$store;
                var router = this.$router;
                this.$axios({
                    method: 'post',
                    url: '/knbolg/userInformation/updateUserInfo.do',
                    data:{
                        nickName:this.nickName,
                        email:this.email,
                        gender:this.gender,
                        phoneNumber:this.phoneNumber,
                        workingTruth:this.workingTruth,
                        selectSort:this.selectSort 
                    },
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    }
                }).then(function (response) {
                    // store.state.user= response.data.loginUser;
                    // router.push({ name: 'blogMain', params: { blogSort: 'tuijian' }});
                    if(response.data.result == 1){
                        let newUserInfo = {
                            nickName:_this.nickName,
                            email:_this.email,
                            gender:_this.gender,
                            phoneNumber:_this.phoneNumber,
                            workingTruth:_this.workingTruth,
                            selectSort:_this.selectSort 
                        };
                        store.commit('updateUserInfo',newUserInfo);  //调用mulations方法
                        _this.$Message.success('修改成功');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.$emit("hideInfoModalFunction");
            },
            cancel () {
                this.$emit("hideInfoModalFunction");
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
                this.selectSort = v;
            },
        },
        mounted(){
            this.nickName = this.$store.state.userInfo.nickName;
            this.gender = this.$store.state.userInfo.gender;
            this.email = this.$store.state.userInfo.email;
            this.gender = this.$store.state.userInfo.gender;
            this.phoneNumber = this.$store.state.userInfo.phoneNumber;
            this.workingTruth = this.$store.state.userInfo.workingTruth;
            this.selectSort = this.$store.state.userInfo.selectSort;
        },
        watch: {
            showInfoModal: function(val) {
                //监听props中的属性
                this.modal1 = val;
            }
        }
    }
</script>

<style scoped>
.userInfoDiv{
    width: 100%;
    height: 274px;
}
.userInfoTitleUL{
    width: 21%;
    list-style: none;
    margin-left: 60px;
    margin-top: 8px;
    float: left;
}

.userInfoTitleUL li{
   font-size: 14px;
   color:#1a2a3a;
   height: 40px;
    font-weight:bold;
}

.userInfoBodyUL{
        list-style: none;
    float: left;
    margin-top: 3px;

}


.userInfoBodyUL li{
   font-size: 14px;
   color:#1a2a3a;
   height: 40px;
    
}

.userInfoBodyInput{
    color:#1a2a3a;
    
}
</style>
