<template>
  <div class="page">
    <img class="page-bg" src="../assets/copywriting/pic_01.jpg">
    <div class="searchBox center">
      <input class="searchInput" placeholder="请输入关键字" v-model="searchText" @keydown.enter="getSearchData">
      <img src="../assets/ranking/sousuo1.png" class="searchIcon" @click="getSearchData">
    </div>

    <img src="../assets/loading.gif" class="loading" :class="{pullUp, pullDown}" v-show="isLoading">
    <div ref="rankingBox" class="rankingBox center" :class="{pullUp, pullDown}"
         @touchstart="touchstart" @touchmove="touchmove">
      <RankItem class="rankItem"
                v-for="item of rankList"
                :item="item" :key="item.id"
                @holdback="showModal=true"/>
    </div>

    <img src="../assets/ranking/gerenzhongxin.png" class="mine" @click="moveTo(8)">
    <img src="../assets/ranking/huodongguize.png" class="rules" @click="moveTo(7)">

    <div class="waringModal" v-show="showModal" @click="showModal=false">
      <img src="../assets/ranking/beijing.png" class="wenzi center">
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
      pageNo: 1,
      clientY: null,
      searchText: '',
      isSearch: false,
      showModal: false,
      direction: 0 // 0下拉刷新   1上拉加载更多
    }),
    computed: {
      pullUp () {
        return this.isLoading && this.direction === 0
      },
      pullDown () {
        return this.isLoading && this.direction === 1
      }
    },
    methods: {
      touchstart (event) {
        this.clientY = this.getClientY(event)
      },
      touchmove (event) {
        if (this.isLoading || this.isSearch) {
          return
        }

        const rankingBox = this.$refs.rankingBox
        const scrollTop = rankingBox.scrollTop
        const maxScroll = this.getMaxScroll(rankingBox)
        const clientY = this.getClientY(event)
        const deltaY = this.clientY - clientY

        if (deltaY < -10 && scrollTop === 0) {
          this.pageNo = 1
          this.direction = 1
          this.setState({rankList: []})
          this.getRankData()
        }

        if (deltaY > 10 && maxScroll === scrollTop) {
          this.direction = 0
          this.getRankData()
        }

        this.clientY += deltaY
      },
      getClientY (event) {
        return event.touches[0].clientY
      },
      getMaxScroll (el) {
        return el.scrollHeight - el.offsetHeight
      },
      getRankData () {
        if (!this.isLoading) {
          this.isSearch = false
          this.getRankList(this.pageNo++)
        }
      },
      getSearchData () {
        if (this.isLoading) {
          return
        }

        if (this.searchText) {
          this.isSearch = true
          return this.postSearch(this.searchText)
        }

        this.pageNo = 1
        this.setState({rankList: []})
        this.getRankData()
      },
    },
    watch: {
      pageIndex (index) {
        if (index === 6) {
          this.pageNo = 1
          this.setState({rankList: []})
          this.getRankData()
        }
      }
    }
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

  .loading {
    width: 30px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    &.pullUp {
      bottom: 2vh;
    }
    &.pullDown {
      top: 65px;
    }
  }

  .rankingBox {
    top: 65px;
    width: 96vw;
    overflow: auto;
    height: 85vh;
    &.pullDown {
      top: 105px;
    }
  }

  .rankItem {
    width: 40vw;
    margin: 3.9vw;
    float: left;
    height: 44vw;
  }

  .mine, .rules {
    position: absolute;
    right: 1vw;
    bottom: 30vw;
    width: 12vw;
  }

  .mine {
    bottom: 44vw;
  }

  .waringModal {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    position: absolute;
    background: rgba(0, 0, 0, .6);

    .wenzi {
      width: 100vw;
      top: 63vw;
    }
  }
</style>
