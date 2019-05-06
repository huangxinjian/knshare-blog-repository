<template>
    <div class="systemMsgDiv">
        <span class="title">{{title}}</span>
        <span class="content">{{content}}</span>
        <span class="time"><Time :time="time" /></span>
    </div>
</template>

<script>
export default {
    name:'systemMsgDiv',
    props:{
        title:String,
        content:String,
        time:Number
    }
}
</script>

<style scoped>

.systemMsgDiv{
    width: 94%;
    min-height: 60px;
    background-color: white;
    border-top: 1px solid rgba(133,133,133,0.2);
    position: relative;
    margin: 0 auto;
    /* padding-top: 5px; */
}

.title{
    display: block;
    font-size: 15px;
    color: #1a2a3a;
    padding-left: 11px;
    padding-top: 5px;
}

.content{
    display: block;
    padding-left: 11px;
    padding-top: 6px;
    min-height: 30px;
}

.time{
    position: absolute;
    bottom: 8px;
    right: 11px;
    color: #76839b;
}
</style>
