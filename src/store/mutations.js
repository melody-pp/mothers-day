const MAX_PAGE_INDEX = 10

export default {
  saveUser (state, user) {
    state.user = user
  },
  moveEnd (state) {
    // 翻页完成回调
    state.isMoving = false
    state.useAnimate = true
  },
  moveUp (state, disableAnimate) {
    // 翻页中或者已翻到顶，不再触发
    if (!state.isMoving || !state.pageIndex) {
      state.pageIndex--
      state.isMoving = true
      state.useAnimate = !disableAnimate
    }
  },
  moveDown (state, disableAnimate) {
    // 翻页中或者已翻到底，不再触发
    if (!state.isMoving || state.pageIndex > MAX_PAGE_INDEX) {
      state.pageIndex++
      state.isMoving = true
      state.useAnimate = !disableAnimate
    }
  },
  moveTo (state, index, disableAnimate) {
    if (!state.isMoving) {
      state.isMoving = true
      state.pageIndex = index
      state.useAnimate = !disableAnimate
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
}
