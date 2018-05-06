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
  import { mapMutations } from 'vuex'
  import { parseFile } from '../components/utils'

  export default {
    name: 'Copywriting',
    methods: {
      ...mapMutations(['saveMotherPic', 'moveDown']),
      takeMother () {
        parseFile(this.$refs.mother.files[0], result => {
          this.moveDown()
          this.saveMotherPic(result)
        })
      }
    }
  }
</script>

<style scoped>
  .title {
    top: 2vh;
    left: 5vw;
    width: 17vw;
    position: absolute;
  }

  .text {
    top: 55vw;
    width: 70vw;
  }

  .button {
    top: 105vw;
    width: 35vw;
  }

  input.button {
    height: 12vw;
    opacity: 0;
  }

  .tips {
    top: 120vw;
    width: 70vw;
  }
</style>
