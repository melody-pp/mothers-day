<template>
  <div class="page">
    <img src="../assets/personalInfo/pic_01.jpg" class="page-bg">
    <img src="../assets/personalInfo/hint.png" class="words">
    <!-- zzh -->
    <!-- <img src="../assets/personalInfo/pic_03.png" class="text-title center"> -->
    <img class="text-title" src="../assets/personalInfo/pic_03.png" alt="">
    <div class="inforInput">
      <div class="xingming">
        <input type="text" v-model="xingming">
      </div>
      <div class="dianhua">
        <input type="text" v-model="dianhua">
      </div>
      <div class="shengfenOut">
        <select v-model="shengfen">
          <option disabled value="">请选择</option>
          <option v-for="sheng in shengs" :value="sheng">{{sheng}}</option>
        </select>
      </div>
      <div class="chengshi">
        <input type="text" v-model="chengshi">
      </div>
      <div class="chexing">
        <input type="text" v-model="chexing">
      </div>
    </div>
    <!-- zzh -->
    <!-- <img src="../assets/personalInfo/pic_02.png" class="infoBtn" @click="submitInfo"> -->
    <div class="infoBtn" @click="submitInfo"></div>
    <div class="warningBox" v-show="showModal">
      <img src="../assets/personalInfo/beijing.png" class="bgBox center">
      <!-- zzh -->
      <img src="../assets/personalInfo/tishi.png" class="tishi center">
      <!--<div class="tishi center"></div>-->
      <img src="../assets/personalInfo/queren.png" class="queren" @click="queren">
      <img src="../assets/personalInfo/quxiao.png" class="quxiao" @click="quxiao">
    </div>

    <!--二维码弹框-->
    <div class="warningBox" v-show="ewmShowModal">
      <div class="ewmBox">
        <img src="../assets/personalInfo/ewm.png" class="ewm">
        <img src="../assets/personalInfo/ewmTxt.png" class="ewmTxt">
        <!-- zzh -->
        <img src="../assets/personalInfo/followBtn.png" class="followBtn" @click="followBtn">
        <div class="followBtn" @click="followBtn"></div>
        <img src="../assets/personalInfo/text.png" class="text">
      </div>
    </div>

  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'

  export default {
    name: 'PersonalInfo',
    mixins: [vuexMixin],
    data () {
      return {
        showModal: false,
        ewmShowModal: false,
        xingming: '',
        dianhua: '',
        chengshi: '',
        chexing: '',
        // cartypes: [
        //   '艾瑞泽5', '艾瑞泽7', '瑞虎3', '瑞虎3X', '瑞虎5x', '瑞虎7', '瑞虎8', '其他'
        // ],
        shengfen: '',
        shengs: [
          '北京市', '天津市', '上海市', '重庆市', '河北省',
          '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省',
          '浙江省', '安徽省', '福建省', '江西省', '山东省',
          '河南省', '湖北省', '湖南省', '广东省', '海南省',
          '四川省', '贵州省', '云南省', '甘肃省', '陕西省',
          '广西壮族自治区', '西藏自治区', '青海省', '宁夏回族自治区',
          '内蒙古自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'
        ]
      }
    },
    methods: {
      submitInfo () {
        if (!this.xingming || !this.dianhua || !this.chengshi || !this.chexing || !this.shengfen) {
          return alert('请将信息填写完整！')
        }

        if (!/^((1[3-8][0-9])+\d{8})$/.test(this.dianhua)) {
          return alert('手机号格式错误！')
        }

        this.showModal = true
        this.setState({
          personalInfo: {
            username: this.xingming,
            phone: this.dianhua,
            address: this.chengshi,
            cartype: this.chexing,
            shengfen: this.shengfen
          }
        })
      },
      queren () {
        this.ewmShowModal = true
        this.showModal = false
        this.postPersonalInfo(() => {
          this.getPerson()
          this.setSuccflag(1)

          const wx = require('weixin-js-sdk')
          wx.onMenuShareTimeline(this.getShareConfig(1))
          wx.onMenuShareAppMessage(this.getShareConfig(0))
          wx.ready(() => {
            wx.onMenuShareTimeline(this.getShareConfig(1))
            wx.onMenuShareAppMessage(this.getShareConfig(0))
          })
        })
      },
      quxiao () {
        this.showModal = false
      },
      followBtn () {
        this.moveDown()
        this.ewmShowModal = false
      },
      getShareConfig (type) {
        const link = location.origin + '/mother/index.php/index/index/person_index?openid=' + (this.urlParams.shareOpenId || this.urlParams.openid)
        const imgUrl = location.origin + require('../assets/WeChat.jpg')
        const title = type ? '#你陪我长大，我陪你变老# 奇瑞车主俱乐部致敬母亲节，晒合影，赢油卡' : '珍藏你的美'
        const desc = '#你陪我长大，我陪你变老# 奇瑞车主俱乐部致敬母亲节，晒合影，赢油卡'

        return {title, link, imgUrl, desc}
      },
    }
  }
</script>

<style scoped lang="scss">
  .title {
    top: 5vw;
    left: 5vw;
    width: 17vw;
    position: absolute;
  }

  .words {
    top: 27vw;
    left: 17vw;
    width: 66vw;
    position: absolute;
  }

  // zzh
  .text-title {
    top: 15vw;
    width: 40vw;
    height: 5.85vw;
    position: absolute;
    left: 30vw;
  }

  // zzh
  .infoBtn {
    position: absolute;
    top: 83%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    height: 13.75vw;
    background: url(../assets/personalInfo/pic_02.png) no-repeat center;
    background-size: contain;
  }

  .inforInput {
    > div {
      width: 80vw;
      height: 12vw;
      background-size: 94vw;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -92%);
      > input {
        margin-left: 27.5vw;
        margin-top: 2vw;
        height: 6vw;
        line-height: 6vw;
        width: 51vw;
        border: none;
        outline: none;
        font-size: 4.8vw;
        background-color: transparent;
      }
      > select {
        margin-left: 26.5vw;
        margin-top: 2vw;
        height: 7vw;
        line-height: 7vw;
        width: 51vw;
        border: none;
        outline: none;
        font-size: 4.8vw;
        background-color: transparent;
      }

    }
    .xingming {
      background: url("../assets/personalInfo/xingming.png") no-repeat center;
      background-size: contain;
      top: 30%;
    }
    .dianhua {
      background: url("../assets/personalInfo/dianhua.png") no-repeat center;
      background-size: contain;
      top: 40%;
    }
    .chengshi {
      background: url("../assets/personalInfo/chengshi.png") no-repeat center;
      background-size: contain;
      top: 60%;
    }
    .chexing {
      background: url("../assets/personalInfo/chexing.png") no-repeat center;
      background-size: contain;
      top: 70%;
    }
    .shengfenOut {
      background: url("../assets/personalInfo/shengfen.png") no-repeat center;
      background-size: contain;
      top: 50%;
    }
  }

  .warningBox {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .ewmBox {
      background-color: #fff;
      width: 90vw;
      height: 129vw;
      position: absolute;
      top: 20vw;
      left: 5vw;
    }
    .bgBox {
      width: 96vw;
      height: 60vw;
      top: 50vw;
    }
    // zzh
    .tishi {
      width: 60vw;
      height: 20.7vw;
      position: absolute;
      top: 65vw;
    }
    .queren {
      width: 23vw;
      position: absolute;
      top: 88vw;
      left: 19vw;
    }
    .quxiao {
      width: 23vw;
      position: absolute;
      top: 88vw;
      right: 19vw;
    }

    .ewm {
      width: 70vw;
      top: 12vw;
      left: 11vw;
      position: absolute;
    }

    .ewmTxt {
      width: 56vw;
      top: 86vw;
      left: 19vw;
      position: absolute;
    }

    // zzh
    .followBtn {
      width: 50vw;
      height: 13.8vw;
      top: 97vw;
      left: 22vw;
      position: absolute;
      background: url(../assets/personalInfo/followBtn.png) no-repeat center;
      background-size: contain;
    }

    .text {
      position: absolute;
      width: 74vw;
      top: 115vw;
      left: 8vw;
    }
  }
</style>
