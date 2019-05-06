<template>
    <div class="bolgListDiv">
        <!-- <ul class="blogListUl">
            <li class="bolgListLi">{{sort}}</li>
        </ul> -->
       
    </div>
</template>

<script>


export default {
    name: "blogList",
    props:{
        sort:String
    },
    data() {
        return {
            list:[]
        }
    },
    beforeMount(){
        console.log(this.sort);
        this.list.push(this.sort);
    }
}
</script>

<style scoped>

.bolgListDiv{
    width: 100%;
    height: 697px;
    background-color: green;
}

.blogListUl{
    list-style: none;
}
</style>
