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
      commit('setPerson', res.data[0])
    })
  },
  // 获取用户点赞信息
  getVoteperson ({state, commit}) {
    http.post('/get_voteperson', {
      openid: state.urlParams.openid
    }).then(res => {
      commit('setVoted', res.data)
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
      // openid: state.urlParams.openid,
      openid: state.urlParams.openid,
      ...state.personalInfo,
    })
  },
  // 投票
  postVote ({state, commit}, voteopenid) {
    http.post('/add_vote', {
      // openid: state.urlParams.openid,
      openid: state.urlParams.openid,
      voteopenid,
    }).then(() => {
      commit('addVote', voteopenid)
    })
  },
  // 查询
  postSearch ({commit}, nickname) {
    commit('setLoading', true)
    http.post('/search_message', {nickname}).then(res => {
      commit('setRankList', res.data)
      setTimeout(() => {
        commit('setLoading', false)
      }, 200)
    })
  },
  // 获取排行榜信息
  getRankList ({commit}, pageNo) {
    commit('setLoading', true)
    http.post('/ranking', {pageNo}).then(res => {
      commit('pushRankList', res.data)
      setTimeout(() => {
        commit('setLoading', false)
      }, 200)
    })
  },
}
