let lastIndex = 0
let searched = false

export default {
  setState (state, data) {
    Object.keys(data).forEach(key => state[key] = data[key])
  },
  moveEnd (state) {
    // 翻页完成回调
    state.isMoving = false
    state.useAnimate = true
  },
  moveUp (state, disableAnimate) {
    if (!state.isMoving) {
      lastIndex = state.pageIndex

      state.pageIndex--
      state.isMoving = !(disableAnimate === true)
      state.useAnimate = !(disableAnimate === true)
    }
  },
  moveDown (state, disableAnimate) {
    if (!state.isMoving) {
      lastIndex = state.pageIndex

      state.pageIndex++
      state.isMoving = !(disableAnimate === true)
      state.useAnimate = !(disableAnimate === true)
    }
  },
  moveBack (state) {
    if (!state.isMoving) {
      state.pageIndex = lastIndex
      state.useAnimate = false
    }
  },
  moveTo (state, index) {
    if (!state.isMoving) {
      lastIndex = state.pageIndex

      state.pageIndex = index
      state.useAnimate = false
    }
  },
  setRankList (state, rankList) {
    searched = true
    state.rankList = rankList
    if (!rankList || !rankList.length) {
      alert('无此用户信息！')
    }
  },
  pushRankList (state, rankList) {
    if (searched) {
      state.rankList = rankList
    } else {
      state.rankList.push(...rankList)
    }

    searched = false
  },
  addVote (state, voteopenid) {
    state.votedInfo = {flag: 1, voteopenid}

    const user = state.rankList.find(item => item.voteopenid === voteopenid)
    if(user){
      user.vote = Number(user.vote) + 1
    }

    if (voteopenid === state.person.openid) {
      state.person = Object.assign(state.person, {vote: Number(state.person.vote) + 1})
    }
  },
  setPhotoflag (state, flag) {
    state.urlParams = Object.assign(state.urlParams, {photoflag: flag})
  },
  setSuccflag (state, flag) {
    state.urlParams = Object.assign(state.urlParams, {succflag: flag})
  },
}
