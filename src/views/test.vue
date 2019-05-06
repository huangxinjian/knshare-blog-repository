<template>
<div class="set">
   <!-- <div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-primary">
                <div class="panel-heading">聊天室</div>
                <div id="msg" v-html="msg" class="panel-body">
                    
                </div>
                <div class="panel-footer">
                    在线人数<span id="onlineCount">1</span>人
                </div>
            </div>
        </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <p class="text-right">
              <Input type="text" small v-model="sendUser"/>
              <Input type="text" small v-model="toUser"/>
              <Input type="text" v-model="message" long />
            <button @click="sendMsg" class="btn btn-success">发送</button>
            <button onclick="closeWebSocket();" class="btn btn-success">关闭连接</button>
            </p>
        </div>
    </div>
</div> -->
    <!-- <chattingLeftBubble></chattingLeftBubble>
    <ChattingRightBubble></ChattingRightBubble> -->

     <Slider></Slider>
</div>
        
</template> 

<script>
import Slider from "@/components/verifyCode/slider.vue";
import chattingLeftBubble from '../components/msg/ChattingLeftBubble'
import ChattingRightBubble from '../components/msg/ChattingRightBubble'

export default {
    name: 'test',
    data () {
      return {
        myWebsocket: '',
        msg:'',
        sendUser:this.$store.state.user.userId,
        toUser:'',
        message:''
      }
    },
    components:{
      chattingLeftBubble,ChattingRightBubble,Slider
    },
    // mounted () {
    //   this.initWebSocket();
    // },
    // methods: {
    //   WebSocketOnError(){
    //     this.setMessageInnerHTML("error");
    //   },
    //   WebSocketOnOpen(){
    //     this.setMessageInnerHTML("加入连接");
    //   },
    //   WebSocketOnMessage(event){
    //     this.setMessageInnerHTML(event.data);
    //   },
    //   WebSocketOnClose(event){
    //     this.setMessageInnerHTML("断开连接");
    //   },
    //   setMessageInnerHTML(html){
    //     this.msg += "<br/>"+html;
    //   },
    //   initWebSocket(){
    //       //判断当前浏览器是否支持WebSocket
    //       if ('WebSocket' in window) {
    //           this.myWebsocket = new WebSocket("ws://127.0.0.1:8080/knbolg/websocket/"+this.$store.state.user.userId);
    //           //连接发生错误的回调方法
    //           this.myWebsocket.onerror = this.WebSocketOnError
    //           //连接成功建立的回调方法
    //           this.myWebsocket.onopen = this.WebSocketOnOpen
    //           //接收到消息的回调方法
    //           this.myWebsocket.onmessage = this.WebSocketOnMessage
    //           //连接关闭的回调方法
    //           this.myWebsocket.onclose = this.WebSocketOnClose
    //       }
    //       else {
    //           alert("对不起！你的浏览器不支持webSocket")
    //       }

    //   },
    //   closeWebSocket(){
    //     this.myWebsocket.close();
    //   },
    //   sendMsg(){
    //       var jsonMsg = {"sendUser":this.sendUser,"toUser":this.toUser,"message":this.message}
    //       this.myWebsocket.send(JSON.stringify(jsonMsg));
    //       this.msg += "<br/>"+this.message;
    //   }
    // }
  }
  
</script>


<style scoped>





</style>
