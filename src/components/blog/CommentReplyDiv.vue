<template>
    <div class="commentDetailDiv">
        <div class="commentUserProfile">
            <img class="commentUserProfile-userIcon" :src="userinfo.headIconUrl"/>
            <span class="commentUserProfile-userName">
                {{userinfo.nickName==$store.state.articleDetail.user.userInformation.nickName?userinfo.nickName+" (博主)":userinfo.nickName}}
            </span>
            <div class="replySomeoneProfile" v-if="parent!=null">
                <span style="font-size: 14px;color: #76839b;">回复</span>
                <span class="replyName" v-if="parent.user">
                    {{parent.user.userInformation.nickName==$store.state.articleDetail.user.userInformation.nickName?parent.user.userInformation.nickName+" (博主)":parent.user.userInformation.nickName}}
                </span>
            </div>
            <!-- <div v-else class="zhanweizhide">

            </div> -->
            <span class="commentUserProfile-commentPublishTime"><Time :time="commentPublishTime" :interval="15" /></span>
        </div>
        <div class="commentContent">
           {{content}}
        </div>
    </div>
</template>

<script>
export default {
    name:'commentReplyDiv',
    props:{
        userinfo:Object,
        commentId:Number,
        commentPublishTime:String,
        content:String,
        parent:Object
    },
    data() {
        return {
            showReplyInputStatus:false,
            replayContent:'',
            replayTip:'回复',
        }
    },
    methods: {
        showReplyInput(){
            this.showReplyInputStatus = !this.showReplyInputStatus;
            if(this.showReplyInputStatus == true){
                    this.replayTip="取消回复";
            }else{
                 this.replayTip="回复";
            }
            
        },
        showThisAllReply(){

            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/comment/loadCommentByCommentId.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:this.commentId
            }).then( (response) => {
                _this.$emit("showThisReplayFunction",response.data.result,response.data.commentDtoList);
            })
            .catch(function (error) {
                _this.$Message.info('加载评论失败！请重新尝试！');
            });
        }
    },

}
</script>

<style scoped>

.commentDetailDiv{
    min-height: 80px;
    width: 100%;
    background-color: #fff;
    margin-bottom: 0px;
    border-bottom: 1px solid rgba(133,133,133,0.1);
    cursor: pointer;
}


.commentUserProfile{
    height: 31px;
    width: 100%;
    margin-bottom: 9px;
    text-align: left;
    padding-left: 15px;
    padding-top: 11px;
}

.commentUserProfile-userIcon{
    width: 25px;
    height: 25px;
    border-radius: 5px;
}

.commentContent{
    min-height: 17px;
    width: 91%;
    margin-left: 48px;
    text-align: left;
    font-size: 13px;
}


.commentUserProfile-userName{
    font-size: 14px;
    color: #1a2a3a;
    font-weight: bold;
    margin-left: 5px;
}

.commentUserProfile-commentPublishTime{
    font-size: 13px;
    color: #858585;
    font-weight: bold;
    /* margin-left: 166px; */
    margin-right: 15px;
    /* text-align: right; */
    float: right;
}
.replySomeoneProfile{
    display: inline-block;
    margin-left: 7px;
}

.replyName{
    margin-left: 7px;
    font-size: 14px;
    color: #1a2a3a;
    font-weight: bold;
}

.buttonDiv{
    width: 92%;
    height: 28px;
    margin-left: 44px;
    text-align: right;
}

.reply{
    display: inline-block;
    font-size: 14px;
    margin-left: 0px;
    margin-top: 4px;
    margin-right: 25px;
    cursor: pointer;
    color: #76839b;
}
.reply:hover{
    color: #2d8cf0
}
.commenting{
    display: inline-block;
    font-size: 14px;
    margin-left: 0px;
    margin-top: 4px;
    margin-right: 8px;
    cursor: pointer;
    color: #76839b;
}

.commenting:hover{
    color:#2d8cf0
}

.replyDiv{
    width: 100%;
    min-height: 32px;
    margin-bottom:5px;
    padding-left: 22px;
}
</style>
