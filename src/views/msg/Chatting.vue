<template>
    <div class="chattingDiv">
        <div class="chattingLeft">
            <div class="chattingLeft-title">
                <i class="fa fa-envelope"></i>
                <span>私信消息</span>
            </div>
            <div class="chattingPeopleList"
                 v-for="(item,index) in peopleList" 
                 :key="item.friendListId" 
                 :style="{ 'background-color': bgc[index]}"
                 @click="loadChatRecord(index,item.friendId.userId,item.friendId.userInformation.nickName,item.friendId.userInformation.headIconUrl)">
                    <Badge :dot="chattingList[index].dot">
                        <Avatar  icon="ios-person" :src="item.friendId.userInformation.headIconUrl"/>
                    </Badge>
                    <span class="peopleName">{{item.friendId.userInformation.nickName}}</span>
            </div>
        </div>
        <div class="chattingRight">
            <div class="chattingPeople">
                <span style="font-size:13px;color:white;"  v-if="chatting.toUser.userId != ''">正在和</span>
                <span style="font-size:13px;color:white;font-weight:bold;margin-left:5px;margin-right:5px;"  v-if="chatting.toUser.userId != ''">{{chatting.toUser.nickName}}</span>
                <span style="font-size:13px;color:white;"  v-if="chatting.toUser.userId != ''">对话中</span>
            </div>
            <div class="chattingContent" ref="chattingContent" >
                <div v-if="chattingList.length != 0">
                    <div v-for="(item,index) in chattingList[nowFriendIndex].record" :key="index" >
                            <ChattingRightBubble v-if="item.fromUser.userId == $store.state.user.userId" 
                                                :msg="item.messageContent"
                                                :time="item.messageDate"
                                                  :headIconUrl ="item.fromUser.userInformation.headIconUrl"
                                                ></ChattingRightBubble>
                            <chattingLeftBubble v-else-if="item.fromUser.userId != $store.state.user.userId " 
                                                :msg="item.messageContent"
                                                :headIconUrl ="item.fromUser.userInformation.headIconUrl"
                                                :time="item.messageDate"></chattingLeftBubble>
                    </div>
                </div>
            </div>
            <div class="chattingInput" >
                <Input style="width:92%;display:block;margin: 0 auto;" v-if="chatting.toUser.userId != ''" v-model="sendMessageRecord" type="textarea" :autosize="{minRows: 4,maxRows: 4}" placeholder="在此输入你要发送的信息...." />
                 <Button class="sendMessageButton" size="small" v-if="chatting.toUser.userId != ''" type="primary" @click="sendMsg()">发送</Button>
            </div>
        </div>
    </div>
</template>

<script>

import chattingLeftBubble from '../../components/msg/ChattingLeftBubble'
import ChattingRightBubble from '../../components/msg/ChattingRightBubble'

export default {
    name:'chatting',
    data() {
        return {
            peopleList:[], // 需要 id 用户名 头像
            bgc:['','','','','','','','','','',''],
            chattingList:[],
            chatting:{
                'toUser':{
                    'userId':'',
                    'nickName':'',
                    'headIconUrl':'',
                },
                'record':[
                   
                ]
            },
            myWebsocket: '', // websocket连接
            msg:'',
            sendMessageRecord:'',
            nowFriendIndex:0,
        }
    },
    components:{
        chattingLeftBubble,ChattingRightBubble
    },
    methods: {
      loadPeopleList(){ // 加载聊天列表
        let _this = this;
        this.$axios({
            method: 'post',
            url: '/knbolg/friendList/loadAllFriendList.do',
            headers:{
                    "Content-Type":"application/json;charset=UTF-8"
            },
            data:_this.$store.state.user.userId,
        }).then( (response) => {
            console.log(response.data);
            _this.peopleList = response.data.friendListList;
            for (let index = 0; index < _this.peopleList.length; index++) {
                _this.chattingList.push(
                    {
                        'toUser':{
                            'userId':_this.peopleList[index].friendId.userId,
                            'nickName':_this.peopleList[index].friendId.userInformation.nickName,
                            'headIconUrl':_this.peopleList[index].friendId.userInformation.headIconUrl,
                        },
                        'record':[
                        
                        ],
                        'dot':false
                    }
                );
            }
        
        })
        .catch(function (error) {
            console.log(error);
        });
      },
      loadChatRecord(i,userId,nickName,headIconUrl){ // 加载聊天记录
        for (let index = 0; index < this.bgc.length; index++) {
            if (i == index) {
                    this.$set(this.bgc,i,'rgba(45,139,240,0.7)');
                    continue;
            }
            this.$set(this.bgc,index,'');
        }
        this.msg=''
        this.chatting.toUser.userId = userId;
        this.chatting.toUser.nickName = nickName;
        this.chatting.toUser.headIconUrl = headIconUrl;
        this.nowFriendIndex = i;

        let _this = this;
        this.$axios({
            method: 'post',
            url: '/knbolg/chat/loadChatRecord.do',
            headers:{
                    "Content-Type":"application/json;charset=UTF-8"
            },
            data:{
                'fromId':_this.$store.state.user.userId,
                'toId':userId
            },
        }).then( (response) => {
            console.log(response.data);
            if (JSON.stringify(response.data) == '{}') {
                console.log(123);
                _this.chatting.record = [];
                _this.chattingList[i].record = [];
            }else{
                // _this.chatting.record = response.data.chatList;
                _this.chattingList[i].record = response.data.chatList;
                _this.chattingList[i].dot=false;
            }
            this.scrollBottom();
        })
        .catch(function (error) {
            console.log(error);
        });

        
      },
      WebSocketOnError(){  // 连接 websocket 发生错误
        // this.setMessageInnerHTML("error");
      },
      WebSocketOnOpen(){
        // this.setMessageInnerHTML("加入连接");
      },
      WebSocketOnMessage(event){
          console.log(event.data);
          let arr = event.data.split('-');
        this.setMessageInnerHTML(arr[0],arr[1]);
      },
      WebSocketOnClose(event){
        // this.setMessageInnerHTML("断开连接");
      },
      setMessageInnerHTML(html,fromId){
        // this.msg += "<br/>"+html;
        console.log(fromId);
        let obj = {
            'fromUser':{
                'userId':this.chatting.toUser.userId,
                'userInformation':{
                    'headIconUrl':this.chatting.toUser.headIconUrl,
                }
            },
            'messageContent':'',
            'messageDate':''
        }
        obj.messageContent = html;
        obj.messageDate = Date.parse(new Date());
        // this.chatting.record.push(obj);
        for (let index = 0; index < this.chattingList.length; index++) {
             console.log(this.chattingList[index].toUser.userId);
            if (fromId == this.chattingList[index].toUser.userId) {
                this.chattingList[index].record.push(obj);
                this.chattingList[index].dot = true;
                break;
            }
        }
        this.scrollBottom();
      },
      initWebSocket(){
          //判断当前浏览器是否支持WebSocket
          if ('WebSocket' in window) {
              this.myWebsocket = new WebSocket("ws://127.0.0.1:8080/knbolg/websocket/"+this.$store.state.user.userId);
              //连接发生错误的回调方法
              this.myWebsocket.onerror = this.WebSocketOnError
              //连接成功建立的回调方法
              this.myWebsocket.onopen = this.WebSocketOnOpen
              //接收到消息的回调方法
              this.myWebsocket.onmessage = this.WebSocketOnMessage
              //连接关闭的回调方法
              this.myWebsocket.onclose = this.WebSocketOnClose
          }
          else {
              alert("对不起！你的浏览器不支持webSocket")
          }

      },
      closeWebSocket(){ // 关闭websocket
        this.myWebsocket.close();
      },
      sendMsg(){ // 往服务器发送信息
          var jsonMsg = {"sendUser":this.$store.state.user.userId,"toUser":this.chattingList[this.nowFriendIndex].toUser.userId,"message":this.sendMessageRecord}
          let obj = {
              'fromUser':{
                  'userId':this.$store.state.user.userId,
                  'userInformation':{
                      'headIconUrl':this.$store.state.userInfo.headIconUrl,
                  }
               },
               'messageContent':'',
               'messageDate':''
          }
          obj.messageContent = this.sendMessageRecord;
          obj.messageDate = Date.parse(new Date());
        //   this.chatting.record.push(obj);
          this.chattingList[this.nowFriendIndex].record.push(obj);
          this.scrollBottom();
          this.myWebsocket.send(JSON.stringify(jsonMsg));
         
        //   this.msg += '<div style="height:52px;" class="rightd">'+
        //               '<span ng-class="rightd_h">'+
        //                  '<img ng-src="user/userIcon/defaultIcon.jpg" />'+
        //              '  </span>'+   
        //                     '<div class="speech right" ng-class="speech right">'+
        //                         this.sendMessageRecord+
        //                     '</div>  '   +
        //                '</div>';
      },
      scrollBottom(){
            this.$nextTick(() => {
	                this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight;
            })
      }
    },
    mounted() {
        // 加载好友列表
        this.loadPeopleList();

        // 发起websocket连接
        this.initWebSocket();
    },
    destroyed() { // 组件销毁时断开websocket连接
        this.closeWebSocket();
    },
}
</script>

<style scoped>

.chattingLeft-title{
    height: 52px;
    background-color: #2d8cf0;
    text-align: center;
    padding-top: 12px;
    
}
.chattingLeft-title i{
    color: white;
    font-size: 15px;
}
.chattingLeft-title span{
    font-size: 15px;
    color: white;
    font-weight: bold;
    margin-left: 7px;
}

.chattingLeft{
    width: 22%;
    height: 562px;
    background-color: rgba(45,139,240,0.3);
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(133,133,133,0.5);
    border-right:1px solid white;
}

.chattingRight{
    width: 78%;
    height: 562px;
    background-color: white;
    display: inline-block;
    vertical-align: top;
}

.chattingPeople{
    height: 52px;
    background-color: #2d8cf0;
    text-align: center;
    padding-top: 12px;
}

.chattingContent{
    height: 372px;
    background-color: #fff;
    text-align: center;
    padding-top: 12px;
    border: 1px solid rgba(133,133,133,0.5);
    overflow: auto;
}

.chattingInput{
    height: 139px;   
    background-color: white;
    position:relative;
    padding-top: 12px;
    border-right: 1px solid rgba(133,133,133,0.5);
    border-left: 1px solid rgba(133,133,133,0.5);
    border-bottom: 1px solid rgba(133,133,133,0.5);

}

.chattingPeopleList{
    height: 48px;
    padding-top: 9px;
    margin-top: 3px;
    cursor: pointer;
    padding-left: 30px;
}
.chattingPeopleList .peopleName{
    font-size: 14px;
    font-weight: bold;
    margin-left: 12px;
}

.chattingPeopleList:hover{
    background-color: rgba(45,139,240,0.7);
}

.sendMessageButton{
    position: absolute;
    right: 25px;
    bottom: 6px;
    width: 100px;
}

/* 微信气泡 */
div.speech {
    float: left;
    margin: 10px 0;
    padding: 8px;
    table-layout: fixed;
    word-break: break-all;
    position: relative;
    background: -webkit-gradient( linear, 50% 0%, 50% 100%, from(#ffffff), color-stop(0.1, #ececec), color-stop(0.5, #dbdbdb), color-stop(0.9, #dcdcdc), to(#8c8c8c) );
    border: 1px solid #989898;
    border-radius: 8px;
}
div.speech:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 15px;
    top: -20px;
    border: 10px solid;
    border-color: transparent transparent #989898 transparent;
}
div.speech:after {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 left: 17px;
 top: -16px;
 border: 8px solid;
 border-color: transparent transparent #ffffff transparent;
}
div.speech.right {
 display: inline-block;
 box-shadow: -2px 2px 5px #CCC;
 margin-right: 10px;
 max-width: 75%;
 float: right;
 background: -webkit-gradient( linear, 50% 0%, 50% 100%, from(#e4ffa7), color-stop(0.1, #bced50), color-stop(0.4, #aed943), color-stop(0.8, #a7d143), to(#99BF40) );
}
div.speech.right:before {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 top: 9px;
 bottom: auto;
 left: auto;
 right: -10px;
 border-width: 9px 0 9px 10px;
 border-color: transparent #989898;
}
div.speech.right:after {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 top: 10px;
 bottom: auto;
 left: auto;
 right: -8px;
 border-width: 8px 0 8px 9px;
 border-color: transparent #bced50;
}
div .left {
 display: inline-block;
 box-shadow: 2px 2px 2px #CCCCCC;
 margin-left: 10px;
 max-width: 75%;
 position: relative;
 background: -webkit-gradient( linear, 50% 0%, 50% 100%, from(#ffffff), color-stop(0.1, #eae8e8), color-stop(0.4, #E3E3E3), color-stop(0.8, #DFDFDF), to(#D9D9D9) );
}
div .left:before {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 top: 9px;
 bottom: auto;
 left: -10px;
 border-width: 9px 10px 9px 0;
 border-color: transparent #989898;
}
div .left:after {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 top: 10px;
 bottom: auto;
 left: -8px;
 border-width: 8px 9px 8px 0;
 border-color: transparent #eae8e8;
}
.leftimg {
 float: left;
 margin-top: 10px;
}
.rightimg {
 float: right;
 margin-top: 10px;
}
.leftd {
 clear: both;
 float: left;
 margin-left: 10px;
}
.rightd {
 clear: both;
 float: right;
 margin-right: 10px;
}
 
.leftd_h{
 width: 39px;
 height: 39px;
 border-radius: 100%;
 display: block;
 float: left;
 overflow: hidden;
}
 
.leftd_h img{
 display: block;
 width: 100%;
 height: auto;
}
.rightd_h{
 width: 39px;
 height: 39px;
 border-radius: 100%;
 display: block;
 float: right;
 overflow: hidden;
}
 
.rightd_h img{
 display: block;
 width: 100%;
 height: auto;
}
</style>
