<template>
    <div class="commentDiv">
        <div class="commentProfile">
            <div class="commentProfile-commentPeople">
                <img style="width:24px;height:24px;" :src="commentPeople.userInformation.headIconUrl">
                <span>{{commentPeople.userInformation.nickName}}</span>
            </div>
            <span class="commentProfile-commentTime"><Time :time="commentTime" :interval="15"></Time></span>
            <span class="commentProfile-commentTime">回复了你的博客</span>
            <span class="commentProfile-commentTitle">{{article.title}}</span>
        </div>

        <div class="commentBody">
            <i class="fa fa-quote-left" style="margin-right:10px;" aria-hidden="true"></i>
            <span class="commentBody-content">{{commentContent}}</span>
            <i class="fa fa-quote-right" style="margin-left:10px;" aria-hidden="true"></i>
        </div>


        <div class="commentButton">
            <span class="replyComment" @click="showReplyInput">{{replayTip}}</span>            
            <span class="deleteComment" @click="showDeleteModal">删除</span>            
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
    props:{
        'commentPeople':Object, //评论人
        'article':Object, //评论了哪篇文章
        'commentId':Number, // 评论的Id
        'commentTime':String, //评论时间
        'commentContent':String,//评论内容
    },
    data() {
        return {
            replayTip:'快速回复',
            showReplyInputStatus:false,
            replayContent:'',
            confirmDelete:false
        }
    },
    methods:{
       showReplyInput(){
            this.showReplyInputStatus = !this.showReplyInputStatus;
            if(this.showReplyInputStatus == true){
                    this.replayTip="取消回复";
            }else{
                 this.replayTip="快速回复";
            }
            
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
                        'articleId':_this.article.articleId
                    },
                    'parent':{
                        'commentId':_this.commentId,
                    }
                }
            }).then( (response) => {
                if(response.data.integer == 1){
                    console.log(response.data);
                    _this.$Message.success('回复评论成功！');
                }
                // console.log(response.data);
            })
            .catch(function (error) {
                _this.$Message.info('添加评论失败！请重新尝试！');
            });
        },
        showDeleteModal(){
            this.confirmDelete = true;
        },
        hideConfirmDeleteModal(){
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
               for (let index = 0; index < _this.$store.state.userCommentList.length; index++) {
                   if(_this.commentId == _this.$store.state.userCommentList[index].commentId){
                        _this.$store.commit("spliceUserCommentList",index);
                        break;
                   }
               }
            })
            .catch(function (error) {
                _this.$Message.info('删除评论失败！请重新尝试！');
            });
        }
    }
}
</script>

<style scoped>

.commentDiv{
    margin-bottom: 11px;
    position: relative;
}

.commentProfile{
    height: 38px;
    width: 96%;
    margin: 0 auto;
    border-top: 0.5px solid #f6f6f6;
    background-color: #fff;
}

.commentProfile-commentPeople{
    display: inline-block;
    padding: 10px 0 0 14px;
    vertical-align: top;
}

.commentProfile-commentPeople span{
    color: black;
    font-size: 14px;
    display: inline-block;
    /* padding-left: 5px; */
    padding-top: 0px;
    /* line-height: 9px; */
    height: 25px;
    margin-left: 5px;
}

.commentProfile-commentTime{
    display: inline-block;
    color: #999;
    font-size: 14px;
    padding: 12px 0 0 14px;
}

.commentProfile-commentTitle{
    display: inline-block;
    color: #2d8cf0;
    font-size: 14px;
    padding: 12px 0 0 14px;
    cursor: pointer;
}

.commentBody{
    width: 94%;
    padding-top: 6px;
    padding-left: 7px;
    /* height: 50px; */
    margin: 0 auto;
    background-color: #fff;
}

.commentButton{
    position: absolute;
    right: 22px;
    bottom: 0px;
    width: 112px;

}

.replyComment{
    display: inline-block;
    width: 74px;
    color: #2d8cf0;
    cursor: pointer;
}

.deleteComment{
     display: inline-block;
    color: #ca0c16;
    cursor: pointer;
}

.replyDiv{
        padding-left: 30px;
    margin-top: 10px;
}

</style>
