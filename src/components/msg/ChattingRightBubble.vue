<template>
    <div style="height:62px;padding-right:19px;position:relative;">
        <Avatar style="float: right;margin-top: 9px;margin-right:5px;" :src="headIconUrl" />   
        <div class="speech right" ng-class="speech right">
            {{msg}}
        </div>     
        <Time style="        position: absolute;
    right: 71px;
    bottom: 0px;
    color: rgb(118, 131, 155);
    font-size: 11px;" :time="time"></Time>
    </div>
</template>

<script>
export default {
    props:{
        msg:String,
        time:Number,
        headIconUrl:String
    }
}
</script>

<style scoped>
div.speech {
    float: left;
    margin: 6px 0;
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
 border-color: transparent #a7d143;
}
</style>
