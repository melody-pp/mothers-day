const MAX_PAGE_INDEX = 10
let lastIndex = 0
let searched = false
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
      lastIndex = state.pageIndex
      state.pageIndex--
      state.isMoving = !(disableAnimate === true)
      state.useAnimate = !(disableAnimate === true)
    }
  },
  moveDown (state, disableAnimate) {
    // 翻页中或者已翻到底，不再触发
    if (!state.isMoving && state.pageIndex < MAX_PAGE_INDEX) {
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
  saveMotherPic (state, motherPic) {
    state.motherPic = motherPic
  },
  saveSelfPic (state, selfPic) {
    state.selfPic = selfPic
  },
  setPicResult (state, picResult) {
    state.picResult = picResult
  },
  setPersonalInfo (state, personalInfo) {
    state.personalInfo = personalInfo
  },
  setPerson (state, person) {
    state.person = person
  },
  setRankList (state, rankList) {
    state.rankList = rankList

    searched = true
  },
  pushRankList (state, rankList) {
    if (searched) {
      state.rankList = rankList
    } else {
      state.rankList.push(...rankList)
    }

    searched = false
  },
  setLoading (state, loading) {
    state.isLoading = loading
  },
  setVoted (state, votedInfo) {
    state.votedInfo = votedInfo
  },
  addVote (state, voteopenid) {
    state.votedInfo.flag = 1
    state.votedInfo.voteopenid = voteopenid
    const user = state.rankList.find(item => item.voteopenid === voteopenid)
    user.vote = Number(user.vote) + 1
  },
  setPhotoflag (state, flag) {
    state.urlParams.photoflag = flag
  },
  setSuccflag (state, flag) {
    state.urlParams.succflag = flag
  },
}
