<template>
  <div class="page">
    <img class="page-bg" src="../assets/copywriting/pic_01.jpg">
    <div class="searchBox center">
      <input class="searchInput" placeholder="请输入关键字" v-model="searchText" @keydown.enter="postSearch(searchText)">
      <img src="../assets/ranking/sousuo1.png" class="searchIcon" @click="postSearch(searchText)">
    </div>
    <div class="rankingBox center">
      <RankItem v-for="item of rankList" :item="item" :key="item.openid" class="rankItem"/>
    </div>
    <img src="../assets/ranking/gerenzhongxin.png" class="mine">
    <img src="../assets/ranking/huodongguize.png" class="rules">
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'
  import { parseFile } from '../components/utils'
  import RankItem from '../components/RankItem'

  export default {
    name: 'Ranking',
    mixins: [vuexMixin],
    components: {RankItem},
    data: () => ({
      searchText: ''
    }),
    mounted () {
      this.getRankList()
    },
  }
</script>

<style scoped lang="scss">
  .searchBox {
    background-image: url("../assets/ranking/sousuo.png");
    background-repeat: no-repeat;
    width: 90vw;
    height: 20vw;
    top: 13vw;
    .searchInput {
      width: 79vw;
      height: 8vw;
      position: absolute;
      top: -9vw;
      padding-left: 2vw;
      font-size: 5vw;
      background-color: transparent;
      border: none;
      outline: none;
    }
    .searchIcon {
      position: absolute;
      top: -8vw;
      right: 0vw;
      width: 6.5vw;
    }
  }

  .rankingBox {
    top: 10vh;
    width: 96vw;
    overflow: auto;
    height: 85vh;
  }

  .rankItem {
    width: 40vw;
    margin: 3.9vw;
    float: left;
  }

  .mine, .rules {
    position: absolute;
    right: 5vw;
    bottom: 10vw;
    width: 12vw;
  }

  .mine {
    bottom: 24vw;
  }
</style>
