<template>
   <label>{{errormsg}}</label>
</template>

<script>
export default {
    props:[
        'errormsg'
    ]
}
</script>

<style scoped>
label{
        margin: 0;
        border: 0;

        color: red;
        font-size: 14px;
}
</style>
