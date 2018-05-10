<template>
  <div class="page">
    <img src="../assets/personalInfo/pic_01.jpg" class="page-bg">
    <img src="../assets/personalInfo/pic_01.png" class="title">
    <!-- zzh -->
    <!-- <img src="../assets/personalInfo/pic_03.png" class="text-title center"> -->
    <div class="text-title center"></div>
    <div class="inforInput">
      <div class="xingming">
        <input type="text" v-model="xingming">
      </div>
      <div class="dianhua">
        <input type="text" v-model="dianhua">
      </div>
      <div class="chengshi">
        <input type="text" v-model="chengshi">
      </div>
      <div class="chexing">
        <select name="" id="" v-model="chexing">
          <option disabled value="">请选择</option>
          <option v-for="cartype in cartypes" :value="cartype">{{cartype}}</option>
        </select>
      </div>
    </div>
    <!-- zzh -->
    <!-- <img src="../assets/personalInfo/pic_02.png" class="infoBtn" @click="submitInfo"> -->
    <div class="infoBtn" @click="submitInfo"></div>
    <div class="warningBox" v-show="showModal">
      <div class="bgBox center">
        <!-- zzh -->
        <!-- <img src="../assets/personalInfo/tishi.png" class="tishi center"> -->
        <div class="tishi center"></div>
        <img src="../assets/personalInfo/queren.png" class="queren" @click="queren">
        <img src="../assets/personalInfo/quxiao.png" class="quxiao" @click="quxiao">
      </div>
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
        cartypes: [
          'QQ', 'A1', 'A3', 'A5',
          'E3', 'E5', 'G3', 'G5', 'G6',
          'M1', 'M5', 'V5', 'V8', 'X1', 'X5',
          '艾瑞泽3', '艾瑞泽5', '艾瑞泽7', '艾瑞泽7e',
          '艾瑞泽M7', '东方之子', '风云', '风云2', '旗云',
          '瑞虎3', '瑞虎3X', '瑞虎5', '瑞虎5x', '瑞虎7', '瑞虎8'
        ]
      }
    },
    methods: {
      submitInfo () {
        if (!this.xingming || !this.dianhua || !this.chengshi || !this.chexing) {
          return alert('请将信息填写完整！')
        }

        if (!/^((1[3-8][0-9])+\d{8})$/.test(this.dianhua)) {
          return alert('手机号格式错误！')
        }

        this.showModal = true
        this.setPersonalInfo({
          username: this.xingming,
          phone: this.dianhua,
          address: this.chengshi,
          cartype: this.chexing
        })
      },
      queren () {
        this.ewmShowModal = true
        this.showModal = false
        this.postPersonalInfo().then(() => {
          this.getPerson()
          this.setSuccflag(true)

        })
      },
      quxiao () {
        this.showModal = false
      },
      followBtn () {
        this.moveDown()

      }
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

  // zzh
  .text-title {
    top: 15vw;
    width: 40vw;
    height: 5.85vw;
    background: url(../assets/personalInfo/pic_03.png) no-repeat center;
    background-size: contain;
  }

  // zzh
  .infoBtn {
    position: absolute;
    top: 69%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    height: 13.75vw;
    background: url(../assets/personalInfo/pic_02.png) no-repeat center;
    background-size: contain;
  }

  .inforInput {
    > div {
      width: 74vw;
      height: 12vw;
      background-size: 94vw;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -92%);
      > input {
        margin-left: 22vw;
        height: 6vw;
        width: 51vw;
        border: none;
        outline: none;
        font-size: 5.1vw;
        background-color: transparent;
      }
      > select {
        margin-left: 22vw;
        height: 7vw;
        width: 51vw;
        border: none;
        outline: none;
        font-size: 5.1vw;
        background-color: transparent;
      }

    }
    .xingming {
      background-image: url("../assets/personalInfo/xingming.png");
      background-repeat: no-repeat;
      top: 30%;
    }
    .dianhua {
      background-image: url("../assets/personalInfo/dianhua.png");
      background-repeat: no-repeat;
      top: 40%;
    }
    .chengshi {
      background-image: url("../assets/personalInfo/chengshi.png");
      background-repeat: no-repeat;
    }
    .chexing {
      background-image: url("../assets/personalInfo/chexing.png");
      background-repeat: no-repeat;
      top: 60%;
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
      background: url("../assets/personalInfo/beijing.png") no-repeat;
      background-size: cover;
      width: 96vw;
      height: 60vw;
      top: 50vw;
    }
    // zzh
    .tishi {
      width: 60vw;
      height: 20.7vw;
      position: absolute;
      top: 18vw;
      background: url(../assets/personalInfo/tishi.png) no-repeat center;
      background-size: contain;
    }
    .queren {
      width: 23vw;
      position: absolute;
      top: 42vw;
      left: 19vw;
    }
    .quxiao {
      width: 23vw;
      position: absolute;
      top: 42vw;
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
