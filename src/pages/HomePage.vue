<template>
  <div class="page">
    <img class="page-bg" src="../assets/copywriting/pic_01.jpg">
    <img class="title" src="../assets/copywriting/pic_01.png">
    <img class="picBG" src="../assets/homePage/pic_03.png">
    <img class="tips" src="../assets/homePage/pic_01.png">
    <img src="../assets/homePage/cansaiyouka.png" class="youkanBtn">
    <img src="../assets/picResult/rulesBtn.png" class="rulesBtn">
    <img src="../assets/picResult/prizeBtn.png" class="prizeBtn">
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'
  import { parseFile } from '../components/utils'

  export default {
    name: 'HomePage',
    mixins: [vuexMixin],
    methods: {}
  }
</script>

<style scoped>
  .title {
    top: 5vw;
    left: 5vw;
    width: 17vw;
    position: absolute;
  }

  .picBG {
    position: absolute;
    top: 6vw;
    left: 17vw;
    width: 72vw;
  }

  .prizeBtn {
    position: absolute;
    top: 140vw;
    right: 10vw;
    width: 34vw;
  }

  .rulesBtn {
    position: absolute;
    top: 140vw;
    left: 10vw;
    width: 34vw;
  }

  .tips {
    position: absolute;
    width: 40vw;
    top: 106vw;
    left: 34vw;
  }

</style>
