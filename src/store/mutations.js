const MAX_PAGE_INDEX = 10

export default {
  saveUser (state, user) {
    state.user = user
  },
  setMoving (state, isMoving) {
    // 设置是否正在翻页
    state.isMoving = isMoving
  },
  moveUp (state) {
    // 翻页中或者已翻到顶，不再触发
    if (!state.isMoving || !state.pageIndex) {
      state.pageIndex--
      state.isMoving = true
    }
  },
  moveDown (state) {
    // 翻页中或者已翻到底，不再触发
    if (!state.isMoving || state.pageIndex > MAX_PAGE_INDEX) {
      state.pageIndex++
      state.isMoving = true
    }
  },
  moveTo (state, index) {
    if (!state.isMoving) {
      state.isMoving = true
      state.pageIndex = index
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
  }
}
