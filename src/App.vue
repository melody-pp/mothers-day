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
      this.getSignPackage().then(({data}) => {
        this.configWX(data)
      })
    },
    methods: {
      configWX (data) {
        const wx = require('weixin-js-sdk')
        wx.config({
          ...data,
          debug: false,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
          ]
        })
        wx.ready(() => {
          wx.onMenuShareTimeline(this.getShareConfig())
          wx.onMenuShareAppMessage(this.getShareConfig())
        })
        wx.error(err => console.log(err))
      },
      refreshConfig () {
        const wx = require('weixin-js-sdk')
        wx.onMenuShareTimeline(this.getShareConfig())
        wx.onMenuShareAppMessage(this.getShareConfig())
      },
      getShareConfig () {
        return {
          title: this.getShareTitle(),
          link: this.getShareLink(),
          imgUrl: this.getShareImg(),
          desc: this.getDesc(),
        }
      },
      getShareTitle () {
        return 'title'
      },
      getShareLink () {
        return location.origin + '/shareLink'
      },
      getShareImg () {
        return 'img'
      },
      getDesc () {
        return 'desc'
      }
    },
    watch: {
      personalInfo () {
        this.refreshConfig()
      },
      picResult () {
        this.refreshConfig()
      }
    }
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
