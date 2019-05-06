<template>
    <div class="focusPeopleDiv">
        <img :src="headIconUrl"  style="width:60px;height:60px;    border-radius: 7px;" alt="" srcset="">
        <span class="nickName">{{nickName}}</span>
        <span class="jobSort">工作方向：{{jobSort}}</span>
        <div class="cancelFocus" @mouseenter="changeFontContent" @mouseleave="restoreFontContent" @click="cacelAttention">
            <span style="line-height: 3em;">{{fontContent}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        'userId':Number, // 用户Id
        'headIconUrl':String, //关注人头像
        'nickName':String, //关注人姓名
        'jobSort':String // 工作方向
    },data() {
        return {
            fontContent:'已关注'
        }
    },
    methods: {
        changeFontContent(){
            this.fontContent = "取消关注"
        },
        restoreFontContent(){
            this.fontContent = "已关注"
        },
        cacelAttention(){
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/userRelation/deleteAttention.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.userId
            }).then( (response) => {
                console.log(response);
                _this.$Message.info('取消关注成功！');
                for(let i = 0; i < _this.$store.state.userRelation.attentionsDetail.length;i++){
                        if (_this.$store.state.userRelation.attentionsDetail[i].userInfoId == _this.userId) {
                            _this.$store.state.userRelation.attentionsDetail.splice(i,1);
                            break;
                        }
                }
            })
            .catch(function (error) {
                _this.$Message.info('取消关注失败！请重新尝试！');
            });
        }
    },
    computed: {
     
    },  
}
</script>


<style scoped>

.focusPeopleDiv{
    width: 350px;
    height: 74px;
    margin-left: 19px;
    background-color: #fff;
    display: inline-block;
    border: 1px solid #f6f6f6;
    border-radius: 7px;
    padding-top: 5px;
    padding-left: 5px;
    position: relative;
    margin-right: 80px;
    margin-top: 10px;
}

.nickName{
    color: black;
    font-size: 16px;
    display: inline-block;
    padding-top: 0px;
    height: 25px;
    vertical-align: top;
    margin-left: 10px;
    font-weight: bold;
}



.cancelFocus{
    /* right: 50px; */
    display: table-cell;
    background-color: #8590a6;
    width: 96px;
    text-align: center;
    height: 34px;
    border-radius: 5px;
    /* padding-top: 4px; */
    position: absolute;
    bottom: 18px;
    left: 69%;
    color: white;
    cursor: pointer;
}

.cancelFocus:hover{
    background-color: #ca0c16;
}
.jobSort{
    position: absolute;
    top: 32px;
    left: 74px;
    font-size: 12px;
    color: #76839b;
}

</style>
