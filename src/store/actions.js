import axios from 'axios'

const http = axios.create({
  baseURL: '/mother/index.php/index/',
})
export default {
  postMotherPic ({state}) {
    return http.post('/uploadmotherthumb', {
      openid: state.user.openid,
      motherthumb: state.motherPic,
    })
  },
  postSelfPic ({state}) {
    return http.post('/uploadmotherthumb', {
      openid: state.user.openid,
      childthumb: state.selfPic,
    })
  },
  postPicResult ({state}) {
    return http.post('/uploadchildthumb', {
      openid: state.user.openid,
      togetherthumb: state.picResult,
    })
  },
  postPersonalInfo ({state}) {
    return http.post('/add_person', {
      openid: state.user.openid,
      ...state.personalInfo,
    })
  },
  postVote ({state}) {
    return http.post('/add_vote', {
      openid: state.user.openid,
      voteopenid: state.user.voteopenid,
    })
  },
  postSearch ({commit}, nickname) {
    http.post('/search_message', {nickname}).then(res => {
      console.log(res)
      commit('setRankList', res.data)
    })
  },
  getRankList ({commit}) {
    http.post('/ranking').then(res => {
      console.log(res)
      commit('setRankList', res.data)
    })
  },
}
