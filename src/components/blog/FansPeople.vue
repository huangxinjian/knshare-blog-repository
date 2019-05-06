<template>
    <div class="fansPeopleDiv">
        <img :src="headIconUrl" style="width:60px;height:60px;    border-radius: 7px;" alt="" srcset="">
        <span class="fansNickName">{{nickName}}</span>
        <span class="jobSort">工作方向：{{jobSort}}</span>
        <div class="focusFans" @click="foucsHimOrHer" v-if="checkRepeat()">
            <span style="line-height: 3em;">关注他/她</span>
        </div>
        <div class="focusFansEither" v-else>
            <i class="fa fa-exchange fa-1x" style="margin-right: 5px;"></i>
            <span style="line-height: 3em;">互相关注</span>
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
    },
    methods: {
       foucsHimOrHer(){  // 关注某个人的函数
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/userRelation/addAttention.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.userId
            }).then( (response) => {
                console.log(response);
                _this.$Message.info('关注成功！');
                for(let i = 0; i < _this.$store.state.userRelation.fansDetail.length;i++){
                    if (_this.$store.state.userRelation.fansDetail[i].userInfoId == _this.userId) {
                        _this.$store.state.userRelation.attentionsDetail.push(_this.$store.state.userRelation.fansDetail[i]);
                        break;
                    }
                }
            })
            .catch(function (error) {
                _this.$Message.info('关注失败！请重新尝试！');
            });
        },
        checkRepeat(){
            for (let index = 0; index < this.$store.getters.samePeople.length; index++) {
                if(this.userId == this.$store.getters.samePeople[index].userInfoId)  {
                    return false;
                }  
            }
            return true;
        }
    },
}
</script>


<style scoped>

.fansPeopleDiv{
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

.fansNickName{
    color: black;
    font-size: 16px;
    display: inline-block;
    padding-top: 0px;
    height: 25px;
    vertical-align: top;
    margin-left: 10px;
    font-weight: bold;
}



.focusFans{
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

.focusFans:hover{
    background-color: #2d8cf0;
}

.focusFansEither{
       /* right: 50px; */
    display: table-cell;
    background-color: #2d8cf0;
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

.jobSort{
    position: absolute;
    top: 32px;
    left: 74px;
    font-size: 12px;
    color: #76839b;
}

</style>
