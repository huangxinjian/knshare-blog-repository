<template>
    <div class="geneListDiv">
        <div class="addGene">
                <Input v-model="newGeneName" placeholder="Enter something..." clearable style="width: 300px;margin-right:15px;" />
                <Button type="success" @click="addNewGene">添加新基因</Button>
        </div>
        <div class="geneTitle">
                <span class="geneNameTitle">基因名</span>
                <span class="operatorTitle">操作</span>
                <span class="blogNoTitle">博文数量</span>
        </div>
        <div class="geneContent" v-for="(item,index) in $store.state.myAllGenePool" :key="index">
            <span class="geneNameContent" v-if="hideEditInput[index] == true ">{{item.geneName}}</span>
            <div  v-else-if=" hideEditInput[index] == false" style="display: inline-block;width: 64%;">
                <Input v-model="item.geneName" style="width: 214px;" />
                <span class="operatorContent">
                    <span style="color:#2d8cf0;cursor:pointer" @click="saveGene(item.geneId,item.geneName,index)">保存</span> | 
                    <span style="color:#2d8cf0;cursor:pointer;" @click="cacelGene(index)">取消</span> 
                </span>
            </div>
           
            <span class="operatorContent">
                <span style="color:#2d8cf0;cursor:pointer" @click="editorGene(index)">编辑</span> | 
                <span style="color:#ca0c16;cursor:pointer;" @click="deleteGene(item.geneId)">删除</span> 
            </span>
            <span class="blogNoContent">{{item.articleNo}}</span>
        </div>
       
    </div>
</template>

<script>
export default {
    name:'geneListDiv',
    data() {
        return {
            newGeneName:'',
            hideEditInput:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            oldGeneName:''
        }
    },
    methods: {
        editorGene(index){
            this.$Message.info("测试");
            this.$set(this.hideEditInput, index, false);
        },
        deleteGene(geneId){
            this.$Message.info("测试");
            
             let _this = this;
            let store = this.$store;
            this.$axios({
                method: 'post',
                url: '/knbolg/genePool/deleteGene.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'geneId':geneId,
                }
            }).then( (response) => {
                console.log(response.data);
                _this.$Message.success("删除成功！");
                for (let index = 0; index < _this.$store.state.myAllGenePool.length; index++) {
                   if(geneId == _this.$store.state.myAllGenePool[index].geneId){
                        _this.$store.commit("spliceMyAllGenePool",index);
                        break;
                   }
               }
            })
            .catch(function (error) {
                _this.$Message.info('删除基因失败');
            });
        },
        saveGene(geneId,name,index){
           this.$set(this.hideEditInput, index, true);
           
             let _this = this;
            let store = this.$store;
            this.$axios({
                method: 'post',
                url: '/knbolg/genePool/updateGene.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'geneId':geneId,
                    'geneName':name
                }
            }).then( (response) => {
                console.log(response.data);
                _this.$Message.success("修改成功！");
            })
            .catch(function (error) {
                _this.$Message.info('修改基因失败');
            });
        },
        cacelGene(index){
            this.$set(this.hideEditInput, index, true);
        },
        addNewGene(){
           
            let _this = this;
            let store = this.$store;
            this.$axios({
                method: 'post',
                url: '/knbolg/genePool/addNewGene.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'geneName':_this.newGeneName
                }
            }).then( (response) => {
                console.log(response.data);
                _this.$Message.success("添加成功！");
                _this.$store.state.myAllGenePool.splice(_this.$store.state.myAllGenePool.length-1,1);
                _this.$store.state.myAllGenePool.unshift(response.data.gene);
            })
            .catch(function (error) {
                _this.$Message.info('添加基因失败');
            });
        }
    },  

}
</script>


<style scoped>


.geneListDiv{
    width: 100%;
    height: 300px;
    background-color: white;
}
.addGene{
    width: 96%;
    height: 50px;
    background-color: white;
    padding-top: 11px;
    margin-left: 14px;
    padding-left: 7px;
    border-top: 1px solid rgba(133,133,133,0.2);
}

.geneTitle{
    width: 96%;
    height: 36px;
    background-color: white;
    padding-top: 8px;
    margin-left: 14px;
    padding-left: 7px;
    border-bottom: 1px solid rgba(133,133,133,0.1);
}
.geneContent{
    width: 96%;
    height: 50px;
    background-color: white;
    padding-top: 12px;
    margin-left: 14px;
    padding-left: 7px;
     border-bottom: 1px solid rgba(133,133,133,0.1);
}

.geneNameTitle{
    color: #76839b;
    font-size: 14px;
    width: 70%;
    display: inline-block;
    padding-left: 13px;
}
.operatorTitle{
    color: #76839b;
    font-size: 14px;
    width: 15%;
    display: inline-block;
}
.blogNoTitle{
    font-size: 14px;
    color: #76839b;
    width: 14%;
    display: inline-block;
}
.geneNameContent{
    color: #1a2a3a;
    font-size: 14px;
    width: 64%;
    display: inline-block;
    padding-left: 13px;
    text-align: left;
}
.operatorContent{
    color: #1a2a3a;
    font-size: 11px;
    width: 15%;
    margin-right: 19px;
    display: inline-block;
    text-align: center;
}
.blogNoContent{
    font-size: 11px;
    color: #1a2a3a;
    width: 14%;
    display: inline-block;
    text-align:center;
}
</style>
