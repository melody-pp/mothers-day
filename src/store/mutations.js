const MAX_PAGE_INDEX = 10

export default {
  saveUrlParams (state, urlParams) {
    state.urlParams = urlParams
  },
  moveEnd (state) {
    // 翻页完成回调
    state.isMoving = false
    state.useAnimate = true
  },
  moveUp (state, disableAnimate) {
    // 翻页中或者已翻到顶，不再触发
    if (!state.isMoving && state.pageIndex) {
      state.pageIndex--
      state.isMoving = !(disableAnimate === true)
      state.useAnimate = !(disableAnimate === true)
    }
  },
  moveDown (state, disableAnimate) {
    // 翻页中或者已翻到底，不再触发
    if (!state.isMoving && state.pageIndex < MAX_PAGE_INDEX) {
      state.pageIndex++
      state.isMoving = !(disableAnimate === true)
      state.useAnimate = !(disableAnimate === true)
    }
  },
  moveTo (state, index, disableAnimate) {
    if (!state.isMoving) {
      state.pageIndex = index
      state.isMoving = !(disableAnimate === true)
      state.useAnimate = !(disableAnimate === true)
    }
  },
  saveMotherPic (state, motherPic) {
    state.motherPic = motherPic
  },
  saveSelfPic (state, selfPic) {
    state.selfPic = selfPic
  },
  setUserGender (state, userGender) {
    state.userGender = userGender
  },
  setPicResult (state, picResult) {
    state.picResult = picResult
  },
  setPersonalInfo (state, personalInfo) {
    state.personalInfo = personalInfo
  },
  setRankList (state, rankList) {
    state.rankList = rankList
  },
  setVoted (state, votedList) {
    state.votedList = votedList
  },
  addVote (state, voteopenid) {
    state.votedList.push(voteopenid)
    state.rankList.find(item => item.voteopenid === voteopenid).vote += 1
  },
}
