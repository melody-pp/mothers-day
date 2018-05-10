<template>
  <div class="page">
    <img class="page-bg" src="../assets/copywriting/pic_01.jpg">
    <div class="searchBox center">
      <input class="searchInput" placeholder="请输入关键字" v-model="searchText" @keydown.enter="postSearch(searchText)">
      <img src="../assets/ranking/sousuo1.png" class="searchIcon" @click="postSearch(searchText)">
    </div>
    <div class="rankingBox center">
      <RankItem v-for="item of rankList" :item="item" :key="item.openid" class="rankItem" @holdback="showModal=true"/>
    </div>
    <img src="../assets/ranking/gerenzhongxin.png" class="mine" @click="moveTo(8)">
    <img src="../assets/ranking/huodongguize.png" class="rules" @click="moveTo(7)">
    <div class="waringModal" v-show="showModal" @click="showModal=false">
      <div class="contentBox">
        <img src="../assets/ranking/wenzi.png" class="wenzi center">
      </div>
    </div>
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'
  import RankItem from '../components/RankItem'

  export default {
    name: 'Ranking',
    mixins: [vuexMixin],
    components: {RankItem},
    data: () => ({
      searchText: '',
      showModal: false
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
    height: 44vw;
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

  .waringModal {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    position: absolute;
    background: rgba(0, 0, 0, .6);
    .contentBox {
      background: url("../assets/picResult/beijing.png") no-repeat;
      background-size: cover;
      width: 86vw;
      height: 22vw;
      top: 77vw;
      left: 7vw;
      position: absolute;
      .wenzi {
        width: 74vw;
        top: 9vw;
      }

    }
  }
</style>
