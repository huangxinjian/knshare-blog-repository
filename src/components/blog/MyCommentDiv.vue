<template>
    <div class="myCommentDiv">
        <div class="myCommentProfile">
            <div class="myCommentProfile-myCommentPeople">
                <span>你</span>
            </div>
            <span class="myCommentProfile-myCommentTime"><Time :time="commentTime" :interval="15"></Time></span>
            <span class="myCommentProfile-myCommentTime">在博客</span>
            <span class="myCommentProfile-myCommentTitle">{{article.title}}</span>
            <span class="myCommentProfile-myCommentTime" v-if="parent == null"> 发布了评论：</span>
            <span class="myCommentProfile-myCommentTime" v-else> 回复了 <span class="myCommentProfile-myCommentParent"> {{parent.user.userInformation.nickName}} </span> </span>
        </div>

        <div class="myCommentBody">
            <i class="fa fa-quote-left" style="margin-right:10px;" aria-hidden="true"></i>
            <span class="myCommentBody-content">{{commentContent}}</span>
            <i class="fa fa-quote-right" style="margin-left:10px;" aria-hidden="true"></i>
        </div>

        <div class="myCommentButton">
              <span class="deletemyComment" @click="showDeleteModal">删除</span>            
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
        'parent':Object // 父评论
    },
    data() {
        return {
            confirmDelete:false
        }
    },
    methods:{
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
               for (let index = 0; index < _this.$store.state.myCommentList.length; index++) {
                   if(_this.commentId == _this.$store.state.myCommentList[index].commentId){
                        _this.$store.commit("spliceMyCommentList",index);
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

.myCommentDiv{
    margin-bottom: 11px;
    position: relative;
}

.myCommentProfile{
    height: 38px;
    width: 96%;
    margin: 0 auto;
    border-top: 0.5px solid #f6f6f6;
    background-color: #fff;
}

.myCommentProfile-myCommentPeople{
       display: inline-block;
    padding: 12px 0 0 14px;
    vertical-align: top;
}

.myCommentProfile-myCommentPeople span{
    color: black;
    font-size: 14px;
    display: inline-block;
    /* padding-left: 5px; */
    padding-top: 0px;
    /* line-height: 9px; */
    height: 25px;
    margin-left: 5px;
}

.myCommentProfile-myCommentTime{
    display: inline-block;
    color: #999;
    font-size: 14px;
    padding: 0 0 0 11px;
}

.myCommentProfile-myCommentParent{
    display: inline-block;
    color: #2d8cf0;
    font-size: 14px;
    padding: 0 0 0 11px;
}

.myCommentProfile-myCommentTitle{
    display: inline-block;
    color: #2d8cf0;
    font-size: 14px;
    padding: 12px 0 0 14px;
    cursor: pointer;
}

.myCommentBody{
    width: 94%;
    padding-top: 6px;
    padding-left: 7px;
    /* height: 50px; */
    margin: 0 auto;
    background-color: #fff;
}

.myCommentButton{
    position: absolute;
    right: 22px;
    bottom: 0px;
    width: 112px;

}

.replymyComment{
    display: inline-block;
    width: 74px;
    color: #2d8cf0;
}

.deletemyComment{
    display: inline-block;
    color: #ca0c16;
    cursor: pointer;
}



</style>
