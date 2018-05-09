<template>
  <div id="app">
    <!--<img src="./assets/home/LOGO.png" class="logo" v-show="pageIndex!==4">-->
    <audio id="bgmusic" autoplay loop src="./assets/bgm.mp3"></audio>
    <MainView/>
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

      this.saveUrlParams(urlParams)
      this.getVoteperson()

      if (+urlParams.photoflag === 1) {
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
          wx.onMenuShareTimeline(this.getShareConfig())
          wx.onMenuShareAppMessage(this.getShareConfig())
          document.getElementById('bgmusic').play()
        })
        wx.error(err => console.log(err))
      },
      getShareConfig () {
        const title = '你陪我长大，我陪你变老#致敬母爱，小伙伴们快来帮我最美的妈妈投票吧'
        const link = location.origin + '/mother/index.php/index/index/person_index?openid=' + this.urlParams.openid
        const imgUrl = location.origin + require('./assets/copywriting/pic_01.png')
        // const desc = '这里是一些描述文案'

        return {title, link, imgUrl}
      },
    },
  }
</script>

<style>
  #app {
    width: 100vw;
    height: 100vh;
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
    width: 100vw;
    height: 100vh;
  }

  .center {
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
</style>
