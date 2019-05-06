<template>
  <div>
    <Modal
      width="670"
      v-model="modal1"
      :scrollable = true
      @on-ok="ok"
      @on-cancel="cancel"
      :mask-closable="false"
      :styles="{top: '120px',right:'130px'}"
    >
      <p slot="header" style="color:#2b85e4;text-align:center;font-size:16px;">
        <span>工作种类</span>
      </p>

      <ol class="workOL">
        <li v-for="(jobItem,index) in categoryLists" :key=index>
          <div
            class="firstJobSort"
            v-on:mouseover="changeColor(index)"
            v-on:mouseout="restoreColor(index)"
            v-bind:class=" [activeClass == index ? 'colorClass': ''] "
          >
            <span class="titleSpan">{{jobItem.categoryName}}</span>
            <Icon
              v-if="changeColorStatus[index] == false"
              type="ios-arrow-forward"
              size="21"
              style="float: right; margin-top: 10px;"
            />
            <div
              class="secondJobSort"
              :class="[showDetailClass == index ? 'showDetail': 'hideDetail']"
            >
              <div class="detailTitle">{{jobItem.categoryName}}</div>
              <hr>
              <div class="detailContent">  <!-- 循环产生二级分类job -->
                <span 
                  v-for="(secondJobItem,subIndex) in jobItem.children" 
                  :key="subIndex"
                  v-on:mouseenter="changeDetailContentColor(subIndex)"
                  v-on:mouseleave="restoreDetailContentColor()"
                  v-on:click="selectJobSort(index,subIndex)"
                  v-bind:class=" [activeSubDetailClass == subIndex ? 'detailContentColorClass': ''] "
                  >
                    {{secondJobItem.categoryName}}
                </span>
              </div>
            </div>
          </div>
        </li>
      </ol>

      <div v-if="showFindJobImg" class="findJobDiv">
        <span>请选择您的工作方向</span>
        <img class="findJobImg" src="../../assets/images/findjob.png">
      </div>

      <div slot="footer">
                 <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    modal: false
  },
  data() {
    return {
      modal1: this.modal,
      changeColorStatus:[false,false,false,false,false,false,false,false], 
      activeClass:-1,
      showDetailClass:-1,
      activeSubDetailClass:-1,
      showFindJobImg: true,
      categoryLists:[]
      //  [ //JobSort
        // {
        //   categoryId:'',
        //   categoryName: '', // firstJobName
        //   children: [  // secondJobList
        //       {
        //           categoryId:'',
        //           categoryName:'',
        //           children:null
        //       }
        //   ]
        // }
      // ]
    };
  },
  watch: {
    modal: function(val) {
      //监听props中的属性
      this.modal1 = val;
    }
  },
  methods: {
    ok() {
      this.$emit("hideModal");
    },
    cancel() {
      this.$emit("hideModal");
    },
    changeColor(index) {
      var fuc = "this.changeColorStatus[" + index + "]=true;"
                +"this.showFindJobImg=false;"
                +"this.activeClass="+(index)+";"
                +"this.showDetailClass="+(index)+";"
      console.log(fuc)
      eval(fuc);
    },
    restoreColor(index) {
      var fuc = "this.changeColorStatus[" + index + "]=false;"
                +"this.showFindJobImg=true;"
                +"this.activeClass=-1;"
                +"this.showDetailClass=-1;";
      console.log(fuc)
      eval(fuc);
    },
    changeDetailContentColor(subIndex) {
        this.activeSubDetailClass = subIndex;
    },
    restoreDetailContentColor(){
        this.activeSubDetailClass = -1;
    },
    selectJobSort(index,subindex) {
      // alert("父亲在"+index+"儿子在"+subindex);
      this.$emit("getJobSelectValue",this.categoryLists[index].categoryName+"-"+this.categoryLists[index].children[subindex].categoryName);
      this.cancel() ;
    }
  },
  mounted(){
      var _this = this;
      this.$axios({
          method: 'post',
          url: '/knbolg/category/findAllCategory.do',
        }).then( (response) => {
          _this.categoryLists = response.data.categoryList;
        })
        .catch(function (error) {
          console.log(error);
      });
  }
};
</script>

<style scoped>


.workOL {
  list-style: none;
  height: 404px;
  border: 1px solid #aaa;
  /* background-color: #fff;
    padding-top: 10px; */
}

.workOL li {
  height: 50px;
}

.colorClass {
  color: #2b85e4;
  cursor: pointer;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
}

.findJobDiv {
  height: 399.5px;
  background-color: #fff;
  width: 438px;
  position: absolute;
  top: 69px;
  left: 215px;
  border-left: 1px solid #aaa;
}

.findJobDiv span {
  font-size: 13px;
  color: #aaa;
  position: absolute;
  top: 47%;
  left: 34%;
  font-family: 微软雅黑;
}

.findJobImg {
  position: absolute;
  top: 49%;
  left: 60%;
  width: 156px;
}

.firstJobSort {
  padding-top: 2px;
  background-color: #fff;
  width: 30%;
  height: 50px;
  /* border-right: 1px solid #aaa; */
  /* float: left; */
  /* margin-top: 1px; */
}

.firstJobSort .titleSpan {
  font-size: 15px;
  position: absolute;
  /* display: block; */
  padding: 10px 0px 0px 29px;
  width: 130px;
}

.secondJobSort {
  background-color: #fff;
  border: 1px solid #aaa;
  color: black;
  width: 66.7%;
  height: 73.9%;
  /* float: right; */
  position: absolute;
  top: 66px;
  left: 207px;
}

.detailTitle {
  font-size: 17px;
  font-weight: bold;
  padding: 9px 0px 7px 17px;
}

.detailContent {
  padding-top: 13px;
}

.detailContent span {
  /* font-size: 14px;
    margin-left: 30px;
    line-height: 15px; */

  font-size: 14px;
  margin-left: 24px;
  width: 84px;
  line-height: 37px;
  display: block;
  float: left;
  color: #aaa;
  cursor: pointer;
}

.showDetail {
  display: block;
}
.hideDetail {
  display: none;
}

.detailContentColorClass{
    color: #2b85e4!important;
}
</style>
