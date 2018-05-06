export default {
  getUser ({commit}) {
    setTimeout(() => {
      commit('saveUser', {
        id: 1,
        name: '测试用户'
      })
    })
  }
}
