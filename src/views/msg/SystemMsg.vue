<template>
    <div class="systemDiv">
        <div class="operator">
            <span style="margin-right:25px;" @click="setAllReadStatus">全部设为已读</span>
            <span @click="hideAllMessage">清空已读消息</span>
        </div>
        <!-- <SystemMsgDiv v-for="item in SystemMsg" 
                      :key="item.smId"
                      :title="item.smTitle"
                      :content="item.smContent"
                      :time="item.smTime"></SystemMsgDiv> -->
        <div v-if="SystemMsg.length ==0 " style="    text-align: center;
    font-size: 16px;
    color: #2d8cf0;">
            <span>暂无消息</span>
        </div>
        <el-card  v-else class="box-card" v-for="(item,index) in SystemMsg" :key="item.smId"  
        style="padding: 0px;width: 95%;margin: 0 auto;margin-bottom: 8px;cursor:pointer;transition:height 300ms ease-out 0s" 
        :style="{ 'height':cardHeight[index]}">
                <div slot="header" style="height:18px;padding:0px;" class="clearfix">
                    <div v-if="item.read_status == 0" class="rotateDiv">未读</div>
                    <span>{{item.smTitle}}</span>
                    <el-button  style="float: right;padding: 4px 0px;font-size: 12px;color: #2d8cf0;margin-left: 15px;" @click="cardClick(index,item.smId)" type="text" >{{cardTip[index]}}</el-button>
                    <Time  style="color:#76839b;float: right; padding: 3px 0" :time="item.smTime"></Time>
                </div>
                <div class="text item">
                        {{item.smContent}}
                </div>
        </el-card>
       
         <Page :total="pageParams.totalRecord" :page-size="pageParams.limit"  @on-change="nextPage" show-total class="page" />
    </div>
</template>

<script>

import SystemMsgDiv from '../../components/msg/SystemMsgDiv.vue'

export default {
    name:'systemDiv',
    components:{
        SystemMsgDiv
    },
    data() {
        return {
            pageParams:{
                page:1,
                limit:4,
                totalRecord:0,
                totalPage:0
            },
            SystemMsg:[],
            cardHeight:[],
            cardTip:[],
        }
    },
    computed: {
        smIds:function(){
            let arr = [];
             for (let index = 0; index < this.SystemMsg.length; index++) {
               arr.push(this.SystemMsg[index].smId);
            }
            return arr;
        }
    },
    methods:{
        cardClick(index,msId){
            if (this.cardTip[index] == '展开') {
                this.lookDetail(index,msId);
            }else{
                this.hideDetail(index);
            }
        },
        lookDetail(index,msId){
            this.$set(this.cardHeight,index,'150px');
            this.$set(this.cardTip,index,'收起');
            // 把消息设为已读
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/systemMessage/setMessageReadStatus.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:[msId]
            }).then( (response) => {
                console.log(response.data);
                for (let index = 0; index < _this.SystemMsg.length; index++) {
                        if (msId == _this.SystemMsg[index].smId) {
                            _this.SystemMsg[index].read_status = 1;
                        }
                    
                }
            })
            .catch(function (error) {
            
            });
        },
        hideDetail(index){
            this.$set(this.cardHeight,index,'90px');
            this.$set(this.cardTip,index,'展开');;
        },
        setAllReadStatus(){
            // 把消息设为已读
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/systemMessage/setMessageReadStatus.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.smIds
            }).then( (response) => {
                console.log(response.data);
                for (let index = 0; index < _this.SystemMsg.length; index++) {
                    _this.SystemMsg[index].read_status = 1;
                }
            })
            .catch(function (error) {
            
            });
        },
        hideAllMessage(){
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/systemMessage/hideAllMessage.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.smIds
            }).then( (response) => {
                console.log(response.data);
                var i =  _this.SystemMsg.length;
                while(i--){
                    if(_this.SystemMsg[i].read_status == 1){
                        _this.SystemMsg.splice(i,1);
                    }
                }
            })
            .catch(function (error) {
            
            });
        },
        loadAllMessage(){
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/systemMessage/findAllSystemMessage.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'page':_this.pageParams.page,
                    'limit':_this.pageParams.limit,
                    'userId':_this.$store.state.user.userId,
                }
            }).then( (response) => {
                console.log(response.data);
                _this.SystemMsg = response.data.pageParams.content;
                _this.pageParams.page = response.data.pageParams.page;
                _this.pageParams.limit = response.data.pageParams.limit;
                _this.pageParams.totalRecord = response.data.pageParams.totalRecord;
                _this.pageParams.totalPage = response.data.pageParams.totalPage;
                for (let index = 0; index < _this.SystemMsg.length; index++) {
                    _this.cardHeight.push('90px');
                    _this.cardTip.push('展开');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        ,
        nextPage(page){
            // this.$Message.info(""+page);
            this.pageParams.page = page;
            this.SystemMsg.splice(0,this.SystemMsg.length);
            this.loadAllMessage();
        },
    },
    mounted(){
        
        this.loadAllMessage();
    }
}
</script>

<style scoped>

.systemDiv{
    position: relative;
}

.page{
    height: 50px;
    width: 80%;
    /* margin: 0 auto; */
    text-align: center;
    padding-top: 10px;
    position: absolute;
    bottom: 0px;
    left: 77px;
}

.operator{
    height: 49px;
    text-align: right;
    padding-top: 15px;
}
.operator span{
   font-size: 13px;
    color: #76839b;
    font-weight: bold;
    margin-right: 28px;
    cursor: pointer;
}

.operator span:hover{
  color:#2d8cf0;
}

.box-card >>> .el-card__header{
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 9px;
    position: relative;
    overflow: hidden;
}

.rotateDiv{
    position: absolute;
    height: 19px;
    width: 55px;
    background-color: red;
    border-left: 7px solid red;
    offset-rotate: 45%;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    left: -9px;
    color: white;
    padding-left: 8px;
    padding-top: 1px;
    top: 5px;
    font-weight: 400;
    font-size: 12px;
}

</style>
