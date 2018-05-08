import axios from 'axios'

const http = axios.create({
  baseURL: '/mother/index.php/index/index/',
})

export default {
  // 获取微信签名
  getSignPackage () {
    return http.post('/getSignPackage', {
      url: location.href
    })
  },
  getPerson ({state, commit}) {
    http.post('/get_person', {
      openid: state.urlParams.shareOpenid
    }).then(res => {
      commit('setPerson', res.data)
    })
  },
  getVoteperson ({state, commit}) {
    http.post('/get_voteperson', {
      openid: state.urlParams.openid
    }).then(res => {
      commit('setVoted', res.data)
    })
  },
  // 上传合照
  postPicResult ({state}) {
    return http.post('/uploadthumb', {
      // openid: state.urlParams.openid,
      openid: 'oGgAGv_ndEDNb2E3-ryRgMG1z3JY',
      motherthumb: state.motherPic,
      childthumb: state.selfPic,
      tothumb: state.picResult,
    })
  },
  // 上传个人信息
  postPersonalInfo ({state}) {
    return http.post('/add_person', {
      // openid: state.urlParams.openid,
      openid: 'oGgAGv_ndEDNb2E3-ryRgMG1z3JY',
      ...state.personalInfo,
    })
  },
  // 投票
  postVote ({state, commit}, voteopenid) {
    http.post('/add_vote', {
      // openid: state.urlParams.openid,
      openid: 'oGgAGv_ndEDNb2E3-ryRgMG1z3JY',
      voteopenid,
    }).then(() => {
      commit('addVote', voteopenid)
    })
  },
  // 查询
  postSearch ({commit}, nickname) {
    http.post('/search_message', {nickname}).then(res => {
      commit('setRankList', res.data)
    })
  },
  // 获取排行榜信息
  getRankList ({commit}) {
    http.post('/ranking').then(res => {
      commit('setRankList', res.data)
    })
  },
}
