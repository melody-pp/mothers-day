<template>
  <div class="perRankingBox">
    <img :src="item.tothumb">
    <p>{{item.nickname}}</p>
    <div class="rankingInfo">
      <img :src="medalSrc" v-show="item.rank<4">
      <span class="noRank" v-show="item.rank>3">NO.{{item.rank}}</span>
      <span class="voteNum">{{item.vote}}</span>
      <span class="danwei">票</span>
      <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg @click="vote" class="voteIcon" :class="{voted}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           x="0px" y="0px" viewBox="-60 61.25 64 64" style="enable-background:new -60 61.25 64 64;" xml:space="preserve">
            <path d="M-27.968,120.29c-1.312,0-2.688-0.576-4.064-1.696c-0.032-0.032-0.096-0.064-0.128-0.128l-20.096-20.128
              c-3.04-3.04-4.704-7.072-4.704-11.392c0-4.288,1.664-8.352,4.704-11.36c6.272-6.272,16.48-6.272,22.752,0l1.472,1.472l1.504-1.504
              c3.136-3.136,7.456-4.832,11.904-4.672c1.024,0.032,1.792,0.896,1.76,1.888c-0.032,0.992-0.864,1.856-1.888,1.76
              c-3.424-0.096-6.784,1.216-9.216,3.616l-2.688,2.72c-0.32,0.384-0.8,0.64-1.312,0.64c-0.512,0.032-0.992-0.16-1.376-0.512
              l-2.784-2.784c-4.832-4.832-12.736-4.832-17.568,0c-2.336,2.304-3.616,5.44-3.616,8.768c0,3.328,1.28,6.432,3.616,8.8l20.032,20.064
              c1.248,1.024,1.888,1.152,3.104,0.032l20.128-20.128c2.944-2.976,4.224-7.2,3.392-11.328c-0.192-0.992,0.448-1.952,1.44-2.176
              c0.992-0.192,1.952,0.448,2.176,1.44c1.088,5.312-0.544,10.784-4.384,14.624l-20.16,20.16
              C-25.28,119.682-26.592,120.29-27.968,120.29z"/>
            <path d="M-7.552,82.946c-0.48,0-0.928-0.192-1.28-0.544l-3.648-3.648c-0.704-0.704-0.704-1.888,0-2.592
              c0.704-0.704,1.888-0.704,2.592,0l3.648,3.68c0.704,0.704,0.704,1.888,0,2.592C-6.624,82.786-7.072,82.946-7.552,82.946z"/>
            <path d="M-7.552,82.946c-0.48,0-0.928-0.192-1.28-0.544c-0.704-0.704-0.704-1.888,0-2.592l7.328-7.328
              c0.704-0.704,1.888-0.704,2.592,0c0.704,0.704,0.704,1.888,0,2.592l-7.328,7.36C-6.624,82.786-7.072,82.946-7.552,82.946z"/>
            <path d="M-28.128,106.562c-2.528,0-4.576-1.952-4.576-4.32v-1.248c0-1.024,0.832-1.824,1.824-1.824s1.824,0.832,1.824,1.824v1.248
              c0,0.352,0.416,0.672,0.928,0.672c0.48,0,0.928-0.32,0.928-0.672v-1.28c0-1.024,0.832-1.824,1.824-1.824s1.824,0.832,1.824,1.824
              v1.28C-23.552,104.61-25.6,106.562-28.128,106.562z"/>
          </svg>
    </div>
  </div>
</template>

<script>
  import { vuexMixin } from './mixins'

  export default {
    name: 'RankItem',
    props: ['item'],
    mixins: [vuexMixin],
    computed: {
      medalSrc () {
        switch (this.item.rank) {
          case 1:
            return require('../assets/ranking/jin.png')
          case 2:
            return require('../assets/ranking/yin.png')
          case 3:
            return require('../assets/ranking/tong.png')
          default:
            return ''
        }
      },
      voted () {
        return this.votedInfo.voteopenid === this.item.openid
      }
    },
    methods: {
      vote () {
        this.postVote(this.item.voteopenid)
      }
    }
  }
</script>

<style scoped lang="scss">
  .perRankingBox {
    text-align: center;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 0 5px #bbbaba;
    transition: all 1s;

    > img {
      width: 100%;
      vertical-align: middle;
    }

    > p {
      margin: 1vw 0;
      font-size: 4vw;
      font-weight: 800;
    }

    .rankingInfo {
      > img {
        width: 5vw;
      }
      > span {
        position: relative;
        top: -1.4vw;
      }
      .voteNum {
        margin-left: 1vw;
        width: 12vw;
        display: inline-block;
      }
      .danwei {
        margin-right: 1vw;
      }
      .noRank {
        font-style: italic;
        font-size: 3.5vw;
        color: #855432;
      }

      .voteIcon {
        width: 5.5vw;
        fill: #b5b6b6;
        &.voted {
          fill: #dc403f;
        }
      }
    }
  }
</style>
