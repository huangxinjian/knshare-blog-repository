<template>
    <div style="background-color:#f6f6f6;min-height:754px;">
        <MenuBar></MenuBar>
        <div class="msgLeftMenu">
            <Menu :theme="theme2" :active-name="activeMenu" mode="vertical" :width="menuWidth" @on-select="changeWidth" style="transition:width 300ms ease-out 0s">
                <MenuItem  name="1" :to="{ name: 'chatting'}" >
                    <Icon type="ios-people" />
                    私信消息
                </MenuItem >
                <MenuItem  name="2" :to="{ name: 'systemMsg'}" >
                    <Icon type="ios-stats" />
                     系统消息
                </MenuItem >
                <!-- <MenuItem  name="3" :to="{ name: 'illegalMsg'}">
                    <Icon type="ios-paper" />
                    违规消息
                </MenuItem > -->
            </Menu>
             
        </div>
     
        <router-view class="msgRightContent"></router-view>

    </div>
</template>

<script>

import MenuBar from '@/components/common/MenuBar.vue'
export default {
    name:'msgcenter',
      components:{
        MenuBar,
        
    },
    data() {
        return {
            theme2:'light',
            activeMenu:'2',
            menuWidth:'150px',
        }
    },
    methods: {
        changeWidth(name){
            if(name == 2 ){
                this.menuWidth = '240px';
            }else{
                 this.menuWidth = '150px';
            }
        }
    },  
    mounted() {
        
        if (sessionStorage.getItem("msgType") == "systemMsg") {
            this.$router.push({ name: 'systemMsg'});
            this.activeMenu = '2';
            this.menuWidth = '240px';
        }else{
            this.$router.push({ name: 'chatting'});
            this.activeMenu = '1';
        }
        //  
    },
   destroyed() {
       sessionStorage.setItem("msgType","chatting");
   },
}
</script>

<style scoped>

.msgLeftMenu{
    display: inline-block;
    vertical-align: top;
    background-color: white;
    height: 564px;
    margin-top: 51px;
    border: 1px solid rgba(133,133,133,0.4);
    /* border-right: 0px; */
    margin-left: 190px;
}

.msgRightContent{
    display: inline-block;
    vertical-align: top;
    background-color: white;
    min-height: 564px;
    margin-top: 51px;
    border: 1px solid rgba(133,133,133,0.4);
    /* border-right: 0px; */
    width: 800px;
    margin-bottom: 15px;
}
</style>
