<template>
  <div class="page">
    <img class="page-bg" src="../assets/copywriting/pic_01.jpg">
    <img class="title" src="../assets/copywriting/pic_01.png">
    <img class="text center" src="../assets/copywriting/pic_02.png">
    <img class="button center" src="../assets/copywriting/pic_03.png">
    <img class="tips center" src="../assets/copywriting/pic_04.png">
    <input class="button center" type="file" ref="mother" @change="takeMother">
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'
  import { parseFile } from '../components/utils'

  export default {
    name: 'Copywriting',
    mixins: [vuexMixin],
    methods: {
      takeMother () {
        parseFile(this.$refs.mother.files[0], result => {
          console.log('aaa')
          this.moveDown()
          this.saveMotherPic(result)
        })
      }
    }
  }
</script>

<style scoped>
  .title {
    top: 5vw;
    left: 5vw;
    width: 17vw;
    position: absolute;
  }

  .text {
    top: 55vw;
    width: 70vw;
  }

  .button {
    top: 110vw;
    width: 35vw;
  }

  input.button {
    height: 12vw;
    opacity: 0;
  }

  .tips {
    top: 125vw;
    width: 70vw;
  }
</style>
