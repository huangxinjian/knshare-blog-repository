<template>
    <div style="position:absolute;">
       <el-upload
        class="avatar-uploader"
        action="/knbolg/user/updateHeadIcon.do"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        >
        <img v-on:mouserenter="showHoverDiv" v-if="$store.state.userInfo.headIconUrl" :src="$store.state.userInfo.headIconUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> 
    </div>

  
</template>

<script>
export default {
    data() {
      return {
        imageUrl: '',
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(res);
        this.$store.commit("updateHeadIconUrl",res.newUrl);
        this.$Message.success("修改头像成功");
      },
      showHoverDiv(){
          this.showHover = true;
      }
    }
}
</script>


<style scoped>


.avatar-uploader{
   width: 152px;
   height: 152px;
}

 .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 152px;
    height: 152px;
  }
  .avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 152px;
    height: 152px;
    display: block;
  }
</style>
