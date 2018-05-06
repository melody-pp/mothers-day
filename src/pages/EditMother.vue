<template>
  <div class="page">
    <img src="../assets/editMother/pic_01.jpg" class="page-bg">
    <img src="../assets/editMother/pic_04.png" class="pic-frame center">
    <img src="../assets/editMother/pic_06.png" class="mask center">
    <img :src="motherPic" class="motherPic center">
    <img src="../assets/editMother/pic_01.png" class="tips center">
    <img src="../assets/editMother/pic_02.png" class="next center">
    <input class="next center" type="file" ref="self" @change="takeSelf">
    <img src="../assets/editMother/pic_03.png" class="reTake center">
    <input class="reTake center" type="file" ref="mother" @change="takeMother">
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins'
  import { parseFile } from '../components/utils'

  export default {
    name: 'EditMother',
    mixins: [vuexMixin],
    methods: {
      takeSelf () {
        parseFile(this.$refs.self.files[0], result => {
          this.moveDown()
          this.saveSelfPic(result)
        })
      },
      takeMother () {
        parseFile(this.$refs.mother.files[0], this.saveMotherPic)
      }
    }
  }
</script>

<style scoped>
  .pic-frame {
    top: 15vw;
    width: 75vw;
  }

  .mask {
    top: 17.5vw;
    width: 69.5vw;
  }

  .motherPic {
    top: 17.5vw;
    max-width: 69.5vw;
    max-height: 96.7vw;
  }

  .tips {
    top: 119vw;
    width: 75vw;
  }

  .next {
    top: 127vw;
    width: 45vw;
  }

  input.next {
    height: 12vw;
    opacity: 0;
  }

  .reTake {
    top: 140vw;
    width: 36vw;
  }

  input.reTake {
    height: 12vw;
    opacity: 0;
  }
</style>
