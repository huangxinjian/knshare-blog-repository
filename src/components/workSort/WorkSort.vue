<template>
  <div>
    <Modal
      width="670"
      v-model="modal1"
      @on-ok="ok"
      @on-cancel="cancel"
      :mask-closable="false"
      draggable
    >
      <p slot="header" style="color:#2b85e4;text-align:center;font-size:16px;">
        <span>工作种类</span>
      </p>

      <ol class="workOL">
        <li>
          <div
            class="firstJobSort"
            v-on:mouseover="changeColor('changeColorStatus1')"
            v-on:mouseout="restoreColor('changeColorStatus1')"
            v-bind:class="{ colorClass: changeColorStatus1 }"
          >
            <span class="titleSpan">互联网IT</span>
            <Icon
              v-if="changeColorStatus1 == false"
              type="ios-arrow-forward"
              size="21"
              style="float: right; margin-top: 10px;"
            />
            <div
              class="secondJobSort"
              :class="{showDetail:changeColorStatus1,hideDetail:!changeColorStatus1}"
            >
              <div class="detailTitle">互联网IT</div>
              <hr>
              <div class="detailContent">
                <span @click="selectJob()">Java开发</span>
                <span>UI设计师</span>
                <span>Web前端</span>
                <span>PHP</span>
                <span>Python</span>
                <span>Android</span>
                <span>美工</span>
                <span>深度学习</span>
                <span>算法工程师</span>
                <span>Hadoop</span>
                <span>Node.js</span>
                <span>数据开发</span>
                <span>数据分析师</span>
                <span>数据架构</span>
                <span>人工智能</span>
                <span>区块链</span>
                <span>电气工程师</span>
                <span>电子工程师</span>
                <span>PLC</span>
                <span>测试工程师</span>
                <span>设备工程师</span>
                <span>硬件工程师</span>
                <span>结构工程师</span>
                <span>工艺工程师</span>
                <span>产品经理</span>
                <span>新媒体运营</span>
                <span>运营专员</span>
                <span>淘宝运营</span>
                <span>天猫运营</span>
                <span>产品助理</span>
                <span>产品运营</span>
                <span>淘宝客服</span>
                <span>游戏运营</span>
                <span>编辑</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div
            class="firstJobSort"
            v-on:mouseover="changeColor('changeColorStatus2')"
            v-on:mouseout="restoreColor('changeColorStatus2')"
            v-bind:class="{ colorClass: changeColorStatus2 }"
          >
            <span class="titleSpan">金融</span>
            <Icon
              v-if="changeColorStatus2 == false"
              type="ios-arrow-forward"
              size="21"
              style="float: right; margin-top: 10px;"
            />
            <div
              class="secondJobSort"
              :class="{showDetail:changeColorStatus2,hideDetail:!changeColorStatus2}"
            >
              <div class="detailTitle">金融</div>
              <hr>
              <div class="detailContent">
                <span>Java开发</span>
                <span>UI设计师</span>
                <span>Web前端</span>
                <span>PHP</span>
                <span>Python</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div
            class="firstJobSort"
            v-on:mouseover="changeColor('changeColorStatus3')"
            v-on:mouseout="restoreColor('changeColorStatus3')"
            v-bind:class="{ colorClass: changeColorStatus3 }"
          >
            <span class="titleSpan">房地产/建筑</span>
            <Icon
              v-if="changeColorStatus3 == false"
              type="ios-arrow-forward"
              size="21"
              style="float: right; margin-top: 10px;"
            />
            <div
              class="secondJobSort"
              :class="{showDetail:changeColorStatus3,hideDetail:!changeColorStatus3}"
            >
              <div class="detailTitle">房地产/建筑</div>
              <hr>
              <div class="detailContent">
                <span>Java开发</span>
                <span>UI设计师</span>
                <span>Web前端</span>
                <span>PHP</span>
                <span>Python</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div
            class="firstJobSort"
            v-on:mouseover="changeColor('changeColorStatus4')"
            v-on:mouseout="restoreColor('changeColorStatus4')"
            v-bind:class="{ colorClass: changeColorStatus4 }"
          >
            <span class="titleSpan">贸易/零售/物流</span>
            <Icon
              v-if="changeColorStatus4 == false"
              type="ios-arrow-forward"
              size="21"
              style="float: right; margin-top: 10px;"
            />
            <div
              class="secondJobSort"
              :class="{showDetail:changeColorStatus4,hideDetail:!changeColorStatus4}"
            >
              <div class="detailTitle">贸易/零售/物流</div>
              <hr>
              <div class="detailContent">
                <span>Java开发</span>
                <span>UI设计师</span>
                <span>Web前端</span>
                <span>PHP</span>
                <span>Python</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div
            class="firstJobSort"
            v-on:mouseover="changeColor('changeColorStatus5')"
            v-on:mouseout="restoreColor('changeColorStatus5')"
            v-bind:class="{ colorClass: changeColorStatus5 }"
          >
            <span class="titleSpan">教育/传媒/广告</span>
            <Icon
              v-if="changeColorStatus5 == false"
              type="ios-arrow-forward"
              size="21"
              style="float: right; margin-top: 10px;"
            />
            <div
              class="secondJobSort"
              :class="{showDetail:changeColorStatus5,hideDetail:!changeColorStatus5}"
            >
              <div class="detailTitle">教育/传媒/广告</div>
              <hr>
              <div class="detailContent">
                <span>Java开发</span>
                <span>UI设计师</span>
                <span>Web前端</span>
                <span>PHP</span>
                <span>Python</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div
            class="firstJobSort"
            v-on:mouseover="changeColor('changeColorStatus6')"
            v-on:mouseout="restoreColor('changeColorStatus6')"
            v-bind:class="{ colorClass: changeColorStatus6 }"
          >
            <span class="titleSpan">服务业</span>
            <Icon
              v-if="changeColorStatus6 == false"
              type="ios-arrow-forward"
              size="21"
              style="float: right; margin-top: 10px;"
            />
            <div
              class="secondJobSort"
              :class="{showDetail:changeColorStatus6,hideDetail:!changeColorStatus6}"
            >
              <div class="detailTitle">服务业</div>
              <hr>
              <div class="detailContent">
                <span>Java开发</span>
                <span>UI设计师</span>
                <span>Web前端</span>
                <span>PHP</span>
                <span>Python</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div
            class="firstJobSort"
            v-on:mouseover="changeColor('changeColorStatus7')"
            v-on:mouseout="restoreColor('changeColorStatus7')"
            v-bind:class="{ colorClass: changeColorStatus7 }"
          >
            <span class="titleSpan">销售</span>
            <Icon
              v-if="changeColorStatus7 == false"
              type="ios-arrow-forward"
              size="21"
              style="float: right; margin-top: 10px;"
            />
            <div
              class="secondJobSort"
              :class="{showDetail:changeColorStatus7,hideDetail:!changeColorStatus7}"
            >
              <div class="detailTitle">销售</div>
              <hr>
              <div class="detailContent">
                <span>Java开发</span>
                <span>UI设计师</span>
                <span>Web前端</span>
                <span>PHP</span>
                <span>Python</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div
            class="firstJobSort"
            v-on:mouseover="changeColor('changeColorStatus8')"
            v-on:mouseout="restoreColor('changeColorStatus8')"
            v-bind:class="{ colorClass: changeColorStatus8 }"
          >
            <span class="titleSpan">人事/财务/行政</span>
            <Icon
              v-if="changeColorStatus8 == false"
              type="ios-arrow-forward"
              size="21"
              style="float: right; margin-top: 10px;"
            />
            <div
              class="secondJobSort"
              :class="{showDetail:changeColorStatus8,hideDetail:!changeColorStatus8}"
            >
              <div class="detailTitle">人事/财务/行政</div>
              <hr>
              <div class="detailContent">
                <span>Java开发</span>
                <span>UI设计师</span>
                <span>Web前端</span>
                <span>PHP</span>
                <span>Python</span>
                <span>Android</span>
                <span>美工</span>
                <span>深度学习</span>
                <span>算法工程师</span>
                <span>Hadoop</span>
                <span>Node.js</span>
                <span>数据开发</span>
                <span>数据分析师</span>
                <span>数据架构</span>
                <span>人工智能</span>
                <span>区块链</span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span>电气工程师</span>
                <span>电子工程师</span>
                <span>PLC</span>
                <span>测试工程师</span>
                <span>设备工程师</span>
                <span>硬件工程师</span>
                <span>结构工程师</span>
                <span>工艺工程师</span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span>产品经理</span>
                <span>新媒体运营</span>
                <span>运营专员</span>
                <span>淘宝运营</span>
                <span>天猫运营</span>
                <span>产品助理</span>
                <span>产品运营</span>
                <span>淘宝客服</span>
                <span>游戏运营</span>
                <span>编辑</span>
              </div>
            </div>
          </div>
          <div class="secondJobSort8" style="display:none"></div>
        </li>
      </ol>

      <div v-if="showFindJobImg" class="findJobDiv">
        <span>请选择您的工作方向</span>
        <img class="findJobImg" src="../../assets/images/findjob.png">
      </div>

      <!-- <div slot="footer">
                 <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>
      </div>-->
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
      changeColorStatus1: false,
      changeColorStatus2: false,
      changeColorStatus3: false,
      changeColorStatus4: false,
      changeColorStatus5: false,
      changeColorStatus6: false,
      changeColorStatus7: false,
      changeColorStatus8: false,
      showFindJobImg: true,
      JobSort: [
        {
          firstJobName: "互联网IT",
          secondJobList: [
            Java开发,
            UI设计师,
            Web前端,
            PHP,
            Python,
            Android,
            美工,
            深度学习,
            算法工程师,
            Hadoop,
            Node.js,
            数据开发,
            数据分析师,
            数据架构,
            人工智能,
            区块链,
            电气工程师,
            电子工程师,
            PLC,
            测试工程师,
            设备工程师,
            硬件工程师,
            结构工程师,
            工艺工程师,
            产品经理,
            新媒体运营,
            运营专员,
            淘宝运营,
            天猫运营,
            产品助理,
            产品运营,
            淘宝客服,
            游戏运营,
            编辑
          ]
        }
      ]
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
      this.$Message.info("Clicked ok");
      this.$emit("hideModal");
    },
    cancel() {
      this.$emit("hideModal");
      this.$Message.info("Clicked cancel");
    },
    changeColor(name) {
      var fuc = "this." + name + "=true;this.showFindJobImg=false;";
      eval(fuc);
    },
    restoreColor(name) {
      var fuc = "this." + name + "=false;this.showFindJobImg=true;";
      eval(fuc);
    },
    changeDetailContentColor() {},
    selectJob() {
      alert("nihao");
    }
  }
};
</script>

<style scoped>
.ivu-modal-body {
  padding-right: 0px !important;
}

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
</style>
