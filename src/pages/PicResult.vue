<template>
  <div class="page">
    <img src="../assets/picResult/pic_01.jpg" class="page-bg">
    <img :src="picResult" class="picResult center">
    <img src="../assets/picResult/pic_01.png" class="tips center">
    <img src="" class="button confirm" @click="confirm">
    <img src="" class="button reTake" @click="reTake">
    <div class="modal" v-show="showModal"></div>
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'

  export default {
    name: 'PicResult',
    mixins: [vuexMixin],
    data: () => ({
      showModal: false,  // 是否显示遮罩
    }),
    computed: {
      picResult () {
        return this.userGender
          ? require('../assets/picResult/pic_02.png')
          : require('../assets/picResult/pic_03.png')
      }
    },
    methods: {
      confirm () {
        this.showModal = true
      },
      reTake () {

      }
    }
  }
</script>

<style scoped lang="scss">
  .picResult {
    top: 4vw;
    width: 94vw;
  }

  .tips {
    top: 145vw;
    width: 50vw;
  }

  .button {
    &.confirm {

    }
    & .reTake {

    }
  }

  .modal {
    top: 0;
    left: 0;
    z-index: 2;
    height: 100vh;
    position: absolute;
    background: rgba(0, 0, 0, .5);
  }
</style>
