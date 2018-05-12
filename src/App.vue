<template>
  <div id="app" :style="{height: winHeight+'px'}">
    <img src="./assets/home/LOGO.png" class="logo" v-show="pageIndex!==4 && pageIndex!==6">
    <audio id="bgmusic" autoplay loop src="./assets/bgm.mp3"></audio>
    <MainView/>
    <div class="ajaxloader" v-show="ajaxLoading">
      <img src="./assets/loading.gif" class="loading">
    </div>

    <div class="for background img">
      <img src="./assets/editSelf/compoundBtn.png">
      <img src="./assets/picResult/beijing.png">
      <img src="./assets/picResult/shuoming.png">
      <img src="./assets/copywriting/pic_02.png">
      <img src="./assets/personalInfo/pic_03.png">
      <img src="./assets/personalInfo/pic_02.png">
      <img src="./assets/personalInfo/beijing.png">
      <img src="./assets/personalInfo/tishi.png">
      <img src="./assets/personalInfo/followBtn.png">
    </div>
  </div>
</template>

<script>
  import 'normalize.css'
  import MainView from './pages/MainView'
  import { vuexMixin } from './components/mixins'

  export default {
    name: 'App',
    mixins: [vuexMixin],
    components: {MainView},
    created () {
      const urlParams = location.search.slice(1).split('&').reduce((params, paramStr) => {
        const [key, value] = paramStr.split('=')
        params[key] = value

        return params
      }, {})

      this.setState({urlParams})
      this.getVoteperson()

      if (+urlParams.photoflag === 1 || +urlParams.self === 0) {
        this.moveTo(8)
        this.getPerson()
      }

      this.getSignPackage().then(({data}) => {
        this.configWX(data)
      })
    },
    methods: {
      configWX ({appId, nonceStr, signature, timestamp}) {
        const wx = require('weixin-js-sdk')
        wx.config({
          appId,
          nonceStr,
          signature,
          timestamp,
          debug: false,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
          ]
        })
        wx.ready(() => {
          wx.onMenuShareTimeline(this.getShareConfig(1))
          wx.onMenuShareAppMessage(this.getShareConfig(0))
          document.getElementById('bgmusic').play()
        })
        wx.error(err => console.log(err))
      },
      getShareConfig (type) {
        const link = location.origin + '/mother/index.php/index/index/person_index?openid=' + this.urlParams.openid
        const imgUrl = location.origin + require('./assets/WeChat.jpg')

        const title = +this.urlParams.succflag === 1
          ? (type ? '#你陪我长大，我陪你变老#奇瑞车主俱乐部致敬母亲节，晒合影，赢油卡' : '珍藏你的美')
          : (type ? '奇瑞车主俱乐部，礼献母亲节，快来参与互动赢取精美大奖!' : '珍藏你的美')

        const desc = +this.urlParams.succflag === 1
          ? '#你陪我长大，我陪你变老# 奇瑞车主俱乐部致敬母亲节，晒合影，赢油卡'
          : '奇瑞车主俱乐部，礼献母亲节，快来参与互动赢取精美大奖!'

        return {title, link, imgUrl, desc}
      },
    },
    watch: {
      urlParams () {
        const wx = require('weixin-js-sdk')
        wx.onMenuShareTimeline(this.getShareConfig(1))
        wx.onMenuShareAppMessage(this.getShareConfig(0))
      }
    }
  }
</script>

<style lang="scss">
  #app {
    overflow: hidden;
    position: relative;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .logo {
    top: 5vw;
    right: 0;
    z-index: 2;
    width: 30vw;
    position: absolute;
  }

  .go {
    left: 50%;
    bottom: 15vw;
    z-index: 2;
    width: 12vw;
    position: absolute;
    animation: go 3s infinite;
  }

  @keyframes go {
    0% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(7vw);
    }
    100% {
      transform: translateX(-50%) translateY(0);
    }
  }

  .page-bg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .center {
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
  }

  .glass {
    filter: blur(5px);
  }

  .ajaxloader {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, .5);
    .loading {
      top: 50%;
      left: 50%;
      width: 15vw;
      position: absolute;
      transform: translate(-50%, -50%);
    }
  }

  .for.background.img {
    position: absolute;
    left: -99999px;
  }
</style>
