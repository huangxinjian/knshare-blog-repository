<template>
    <div class="commentDetailDiv"
        v-on:mouseenter="showButton()"
        v-on:mouseleave="hideButton()">
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
            <span class="commentUserProfile-commentPublishTime"> <Time :time="commentPublishTime" :interval="15" /></span>
        </div>
        <div class="commentContent">
            {{content}}
        </div>
        <div class="buttonDiv">
            <span class="deleteReComment" @click="deleteComment" v-if="(userinfo.nickName == $store.state.userInfo.nickName)&&buttonshow"><i class="fa fa-trash-o" style="margin-right: 4px;"></i>删除</span>
            <span class="reply" @click="showReplyInput" v-if="buttonshow"><i class="fa fa-reply" style="margin-right: 4px;"></i>{{replayTip}}</span>
            <span class="commenting" @click="showThisAllReply"><i class="fa fa-commenting" style="margin-right: 4px;"></i>查看全部回复</span>
        </div>
        <div class="replyDiv" v-if="showReplyInputStatus">
            <Input  v-model="replayContent" placeholder="在此输入你的评论..." type="textarea" 
                            autosize  style="width:466px;margin-right:21px;" />
            <Button type="primary" @click="commitReply" size="default" >回复</Button>
        </div>

        <Modal v-model="confirmDelete" scrollable width="360" :mask-closable="false" :closable="false">
            <div style="text-align:center">
                <p style="font-size: 18px;color:#1a2a3a;">你确定要删除这条评论吗？</p>
            </div>
            <div slot="footer" style="padding:0">
                <Button type="default" size="large" @click="hideConfirmDeleteModal" style="margin-right: 49px;width:80px;">取消</Button>
                <Button type="error" size="large" @click="lastConfirmDelete" style="margin-right: 59px;width:80px;">确认</Button>
            </div>
         </Modal>
     
        
    </div>
</template>

<script>
export default {
    name:'commentDivCompent',
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
            buttonshow:false,  // 显示 回复和删除两个按钮
            confirmDelete:false, // 是否确认删除的模态框
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
                data:_this.commentId
            }).then( (response) => {
                _this.$emit("showThisReplayFunction",response.data.result,response.data.commentDtoList);
            })
            .catch(function (error) {
                _this.$Message.info('加载评论失败！请重新尝试！');
            });
        },
        commitReply(){  //提交回复
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/comment/insertComment.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'content':_this.replayContent, // 评论的内容
                    'user':{
                        'userId':_this.$store.state.user.userId
                     } , // 评论人
                    'article':{
                        'articleId':_this.$store.state.articleDetail.articleId
                    },
                    'parent':{
                        'commentId':_this.commentId,
                        'user':{
                            'userInformation':{
                                    'nickName':_this.userinfo.nickName
                            }
                        }
                    }
                }
            }).then( (response) => {
                if(response.data.integer == 1){
                    console.log(response.data);
                    _this.$Message.success('添加评论成功！');
                    let obj = response.data.commentDto;
                    obj.user.userInformation = _this.$store.state.userInfo
                    // console.log(obj);
                    _this.showReplyInput();
                    _this.$emit("addReplyComment",obj);
                    // _this.commentList.unshift(obj);
                }
                // console.log(response.data);
            })
            .catch(function (error) {
                _this.$Message.info('添加评论失败！请重新尝试！');
            });
        },
        showButton(){  //显示 回复和 删除按钮
            this.buttonshow = true;
        },
        hideButton(){  //隐藏 回复和 删除按钮
            this.buttonshow = false;
        },
        deleteComment(){  // 显示删除评论的模态框
            this.confirmDelete = true;
        },
        hideConfirmDeleteModal(){  //隐藏删除评论的模态框
            this.confirmDelete = false;
        },
        lastConfirmDelete(){
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/comment/deleteComment.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.commentId
            }).then( (response) => {
               _this.$Message.success('删除评论成功');
               _this.confirmDelete = false;
               _this.$emit("deleteComentFunction",_this.commentId);
            })
            .catch(function (error) {
                _this.$Message.info('删除评论失败！请重新尝试！');
            });
        }
    },

}
</script>

<style scoped>


.commentDetailDiv{
    min-height: 70px;
    width: 100%;
    background-color: #fff;
    margin-bottom: 4px;
    border-bottom: 1px solid rgba(133,133,133,0.1);
    cursor: pointer;
}

.commentDetailDiv:hover{
    background-color: rgba(133,133,133,0.1);
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

/* .zhanweizhide{
    width: 116px;
    height: 9px;
    display: inline-block;
} */
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
.deleteReComment:hover{
    color: #ca0c16
}

.deleteReComment{
    display: inline-block;
    font-size: 14px;
    margin-left: 0px;
    margin-top: 4px;
    margin-right: 25px;
    cursor: pointer;
    color: #76839b;
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
