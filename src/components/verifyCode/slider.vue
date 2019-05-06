<template>
    <div id= "loginSliderBar" style="height: 50px;width: 447px;"></div>
</template>

<script>
    import './style.js';
    import './style.css';
    export default {
        name: "loginSlider",
        data() {
          return {
              dom:'',
             dataList:'[0,1]',
             options:'',
             flag:'',
              _this:''
          }
        },
        mounted() {
             this.dom = document.getElementById("loginSliderBar");
            // this.dataList = ["0","1"];
            this._this = this;
            this.options = {
                dataList: this.dataList,
                _this:this._this,
                success:function(){
                    this._this.fatherSubmit();
                },
                fail: function(){

                }
            };
            SliderBar(this.dom,this.options);
        },
        methods: {
            fatherSubmit(){
                this.$emit('submit','');
            }
        },
        watch: {
            flag: function () {

            }
        }
    }
</script>

<style scoped>

</style>