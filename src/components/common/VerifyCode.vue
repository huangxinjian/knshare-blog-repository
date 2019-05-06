<template>
    <div class="drag" ref="dragDiv">
        <div class="drag_bg"></div>
        <div class="drag_text">{{confirmWords}}</div>
        <div ref="moveDiv" @mousedown="mousedownFn($event)" :class="{'handler_ok_bg':confirmSuccess}" class="handler handler_bg" style="position: absolute;top: 0px;left: 0px;"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                beginClientX:0,           
                mouseMoveStata:false,    
                maxwidth:'',              
                confirmWords:'拖动滑块验证',   
                confirmSuccess:false           
            }
        },
        methods: {
            mousedownFn:function (e) {
                if(!this.confirmSuccess){
                    e.preventDefault && e.preventDefault();   
                    this.mouseMoveStata = true;
                    this.beginClientX = e.clientX;
                }
            },        
            successFunction(){
                this.confirmSuccess = true
                this.confirmWords = '验证通过';
                if(window.addEventListener){
                    document.getElementsByTagName('html')[0].removeEventListener('mousemove',this.mouseMoveFn);
                    document.getElementsByTagName('html')[0].removeEventListener('mouseup',this.moseUpFn);
                }else {
                    document.getElementsByTagName('html')[0].removeEventListener('mouseup',()=>{});
                }
                document.getElementsByClassName('drag_text')[0].style.color = '#fff'
                document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
                document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px';
                this.$emit('showGoLoginButton');
            },                
            mouseMoveFn(e){
                if(this.mouseMoveStata){
                    let width = e.clientX - this.beginClientX;
                    if(width>0 && width<=this.maxwidth){
                        document.getElementsByClassName('handler')[0].style.left = width + 'px';
                        document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
                    }else if(width>this.maxwidth){
                        this.successFunction();
                    }
                }
            },                  
            moseUpFn(e){
                this.mouseMoveStata = false;
                var width = e.clientX - this.beginClientX;
                if(width<this.maxwidth){
                    document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
                    document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
                }
            }                      
        },
        mounted(){
            this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
            document.getElementsByTagName('html')[0].addEventListener('mousemove',this.mouseMoveFn);
            document.getElementsByTagName('html')[0].addEventListener('mouseup',this.moseUpFn)
        }
    }
</script>

<style scoped>
    .drag{
        position: relative;
        background-color: #e8e8e8;
        top: 98px;
        left: 126px;
        width: 50%;
        height: 34px;
        line-height: 34px;
        text-align: center;
    }
    .handler{
        width: 40px;
        height: 32px;
        border: 1px solid #ccc;
        cursor: move;
    }
    .handler_bg{
        background: #fff no-repeat center;
    }
    .handler_ok_bg{
        background: #fff  no-repeat center;
    }
    .drag_bg{
        background-color: #7ac23c;
        height: 34px;
        width: 0px;
    }
    .drag_text{
        position: absolute;
        top: 0px;
        width: 100%;text-align: center;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        -o-user-select:none;
        -ms-user-select:none;
    }
</style>