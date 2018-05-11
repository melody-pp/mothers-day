import axios from 'axios'

const http = axios.create({
  baseURL: '/mother/index.php/index/index/',
})
http.interceptors.response.use(response => response,
  ({config, response}) => alert(`系统错误：${config.url.split('/').pop()} ${response.status} ${response.statusText}`))

export default {
  // 获取微信签名
  getSignPackage () {
    return http.post('/getSignPackage', {
      url: location.href
    })
  },
  // 获取个人主页展示信息
  getPerson ({state, commit}) {
    http.post('/get_person', {
      openid: state.urlParams.shareOpenId
    }).then(res => {
      commit('setState', {person: res.data[0]})
    })
  },
  // 获取用户点赞信息
  getVoteperson ({state, commit}) {
    http.post('/get_voteperson', {
      openid: state.urlParams.openid
    }).then(res => {
      commit('setState', {votedInfo: res.data})
    })
  },
  // 上传合照
  postPicResult ({state, commit}, callback) {
    const data = new FormData
    data.append('openid', state.urlParams.openid)
    data.append('tothumb', state.picResult)
    http.post('/uploadthumb', data).then(res => {
      commit('setPhotoflag', true)
      callback && callback()
    })
  },
  // 上传个人信息
  postPersonalInfo ({state}) {
    return http.post('/add_person', {
      ...state.personalInfo,
      openid: state.urlParams.openid,
    })
  },
  // 投票
  postVote ({state, commit}, voteopenid) {
    http.post('/add_vote', {
      voteopenid,
      openid: state.urlParams.openid,
    }).then(() => {
      commit('addVote', voteopenid)
    })
  },
  // 查询
  postSearch ({commit}, nickname) {

    commit('setState', {isLoading: true})
    http.post('/search_message', {nickname}).then(res => {
      commit('setRankList', res.data)
      setTimeout(() => {
        commit('setState', {isLoading: false})
      }, 200)
    })
  },
  // 获取排行榜信息
  getRankList ({commit}, pageNo) {
    commit('setState', {isLoading: true})

    http.post('/ranking', {pageNo}).then(res => {
      commit('pushRankList', res.data)
      setTimeout(() => {
        commit('setState', {isLoading: false})
      }, 200)
    })
  },
}
