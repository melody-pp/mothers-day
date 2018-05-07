<template>
  <div class="page">
    <img src="../assets/editSelf/pic_01.jpg" class="page-bg">
    <img src="../assets/editSelf/pic_05.png" class="pic-frame center">
    <img src="../assets/editSelf/pic_06.png" class="mask center">
    <img :src="selfPic" class="selfPic">
    <img src="../assets/editSelf/pic_04.png" class="tips center">
    <!--<img src="../assets/editSelf/pic_02.png" class="next male" @click="next(0)">-->
    <!--<img src="../assets/editSelf/pic_01.png" class="next female" @click="next(1)">-->
    <div class="center genderBox clearfix">
      <label class="fl" for=""><input type="radio">先生</label><label class="fr" for=""><input type="radio">女士</label>
    </div>
    <img src="../assets/editSelf/compoundBtn.png" class="reTake center">
    <img src="../assets/editSelf/pic_03.png" class="reTake center" style="top:150vw;">
    <input class="reTake center" type="file" ref="self" @change="takeSelf">
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'
  import { parseFile } from '../components/utils'

  export default {
    name: 'EditSelf',
    mixins: [vuexMixin],
    methods: {
      next (gender) {
        this.moveDown()
        this.setUserGender(gender)
      },
      takeSelf () {
        parseFile(this.$refs.self.files[0], this.saveSelfPic)
      },
    }
  }
</script>

<style scoped lang="scss">
  .pic-frame {
    top: 15vw;
    width: 75vw;
  }

  .mask {
    top: 17.5vw;
    width: 69.5vw;
    z-index: 10;
  }

  .selfPic {
    top: 17.5vw;
    left: 15vw;
    position: absolute;
    max-width: 69.5vw;
    max-height: 96.7vw;
    z-index: 11;
  }

  .genderBox {
    top: 73%;
    width: 40vw;
    > label {

    }
  }

  .tips {
    top: 119vw;
    width: 65vw;
  }

  .next {
    top: 127vw;
    width: 30vw;
    position: absolute;
    &.male {
      left: 15vw;
    }
    &.female {
      right: 15vw;
    }
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
