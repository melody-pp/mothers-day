import axios from 'axios'

const http = axios.create({
  baseURL: '/mother/index.php/index/index/',
})
http.interceptors.response.use(
  response => response,
  ({config, response}) => {
    alert(`系统错误：${config.url.split('/').pop()} ${response.status} ${response.statusText}`)
  }
)

export default {
  // 获取微信签名
  getSignPackage () {
    return http.post('/getSignPackage', {
      url: location.href
    })
  },
  // 获取个人主页展示信息
  getPerson ({state, commit}) {
    commit('setState', {ajaxLoading: true})
    http.post('/get_person', {
      openid: state.urlParams.shareOpenId
    }).then(res => {
      commit('setState', {ajaxLoading: false})
      commit('setState', {person: res.data[0]})
    }, () => {
      commit('setState', {ajaxLoading: false})
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
  // 上传两张照片
  postPic ({state, commit}, callback) {
    const data = new FormData
    data.append('openid', 'owW8vs2JTZgGhCBUzij-ihItqh2w')
    data.append('tothumb2', state.selfPic)
    data.append('tothumb1', state.motherPic)

    commit('setState', {processing: true})
    http.post('/uploadimage', data).then(res => {
      commit('setState', {togetherPic: res.data.thumb})
      callback && callback()
    }, () => {
      commit('setState', {processing: false})
    })
  },
  // 上传合照
  postPicResult ({state, commit}, callback) {
    const data = new FormData
    data.append('openid', 'owW8vs2JTZgGhCBUzij-ihItqh2w')
    data.append('tothumb', state.picResult)
    commit('setState', {ajaxLoading: true})
    http.post('/uploadthumb', data).then(res => {
      commit('setPhotoflag', 1)
      commit('setState', {ajaxLoading: false})
      callback && callback()
    }, () => {
      commit('setState', {ajaxLoading: false})
    })
  },
  // 上传个人信息
  postPersonalInfo ({state, commit}, callback) {
    commit('setState', {ajaxLoading: true})
    http.post('/add_person', {
      ...state.personalInfo,
      openid: state.urlParams.openid,
    }).then(() => {
      commit('setState', {ajaxLoading: false})
      callback && callback()
    }, () => {
      commit('setState', {ajaxLoading: false})
    })
  },
  // 投票
  postVote ({state, commit}, {voteopenid, callback}) {
    http.post('/add_vote', {
      voteopenid,
      openid: state.urlParams.openid,
    }).then(({data: {message, success}}) => {
      if (success) {
        commit('addVote', voteopenid)
        callback && callback()
      } else {
        alert(message)
      }
    })
  },
  // 查询
  postSearch ({commit}, nickname) {
    commit('setState', {isLoading: true})
    http.post('/search_message', {nickname}).then(res => {
      commit('setRankList', res.data)
      setTimeout(() => commit('setState', {isLoading: false}), 200)
    })
  },
  // 获取排行榜信息
  getRankList ({commit}, pageNo) {
    commit('setState', {isLoading: true})
    http.post('/ranking', {pageNo}).then(res => {
      commit('pushRankList', res.data)
      setTimeout(() => commit('setState', {isLoading: false}), 200)
    })
  },
}
