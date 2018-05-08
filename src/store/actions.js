import axios from 'axios'

const http = axios.create({
  baseURL: '/mother/index.php/index/index/',
})
export default {

  postPicResult ({state}) {
    return http.post('/uploadthumb', {
      // openid: state.user.openid,
      openid: 'oGgAGv_ndEDNb2E3-ryRgMG1z3JY',
      motherthumb: state.motherPic,
      childthumb: state.selfPic,
      tothumb: state.picResult,
    })
  },
  postPersonalInfo ({state}) {
    return http.post('/add_person', {
      openid: 'oGgAGv_ndEDNb2E3-ryRgMG1z3JY',
      ...state.personalInfo,
    })
  },
  postVote ({state}) {
    return http.post('/add_vote', {
      openid: 'oGgAGv_ndEDNb2E3-ryRgMG1z3JY',
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
