<template>
  <div class="page">
    <img src="../assets/rules/beijing.jpg" class="page-bg">
    <img src="../assets/personalInfo/pic_01.png" class="title">
    <img src="../assets/rules/guize.png" class="guize center">
    <img src="../assets/rules/fanhui.png" class="fanhui center" @click="moveBack">
    <img src="../assets/rules/shiquan.png" class="shiquan center">
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'

  export default {
    name: 'Rules',
    mixins: [vuexMixin],
  }
</script>

<style scoped lang="scss">
  .title {
    top: 5vw;
    left: 5vw;
    width: 17vw;
    position: absolute;
  }

  .guize {
    top: 37vw;
    width: 80vw;
  }

  .fanhui {
    top: 134vw;
    width: 30vw;
  }

  .shiquan {
    top: 145vw;
    width: 50vw;
  }
</style>
