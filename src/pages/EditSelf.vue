<template>
  <div class="page">
    <img src="../assets/editSelf/pic_01.jpg" class="page-bg">
    <img src="../assets/editSelf/pic_05.png" class="pic-frame center">
    <img src="../assets/editSelf/pic_06.png" class="mask center">
    <img :src="selfPic" class="selfPic center">
    <img src="../assets/editSelf/pic_04.png" class="tips center">
    <img src="../assets/editSelf/pic_02.png" class="next male" @click="next(0)">
    <img src="../assets/editSelf/pic_01.png" class="next female" @click="next(1)">
    <img src="../assets/editSelf/pic_03.png" class="reTake center">
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

  .mask, .selfPic {
    top: 17.5vw;
    width: 69.5vw;
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
