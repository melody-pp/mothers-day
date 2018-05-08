<template>
  <div class="page">
    <img src="../assets/personalInfo/pic_01.jpg" class="page-bg">
    <img src="../assets/personalInfo/pic_01.png" class="title">
    <img src="../assets/personalInfo/pic_03.png" class="text-title center">
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
          <option value="volvo">QQ</option>
          <option value="saab">A1</option>
          <option value="opel">A3</option>
          <option value="audi">A5</option>
        </select>
      </div>
    </div>
    <img src="../assets/personalInfo/pic_02.png" class="infoBtn" @click="submitInfo">
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'

  export default {
    name: 'PersonalInfo',
    mixins: [vuexMixin],
    data () {
      return {
        xingming: '',
        dianhua: '',
        chengshi: '',
        chexing: ''
      }
    },
    methods: {
      submitInfo () {
        // 这里是把personnalInfo存到store里面
        this.setPersonalInfo({
          username: this.xingming,
          phone: this.dianhua,
          address: this.chengshi,
          cartype: this.chexing
        })

        //  这里是发请求到后端，参数他会直接从store里面取，可以看postPersonalInfo这个方法里面
        //  postPersonalInfo 返回了一个promise, 可以用.then回调
        this.postPersonalInfo().then(this.moveDown)
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

  .text-title {
    top: 15vw;
    width: 40vw;
  }

  .infoBtn {
    position: absolute;
    top: 69%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
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

</style>
