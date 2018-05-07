<template>
  <div class="page">
    <img class="page-bg" src="../assets/home/pic_01.jpg">
    <img src="../assets/home/GO.png" class="go" @click="moveDown">
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'

  export default {
    name: 'Home',
    mixins: [vuexMixin],
  }
</script>

<style scoped>

</style>
