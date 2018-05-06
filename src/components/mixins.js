import { mapMutations, mapState, mapActions } from 'vuex'

export const vuexMixin = {
  computed: mapState(['user', 'pageIndex', 'isMoving',
    'motherPic', 'selfPic', 'userGender', 'picResult', 'personalInfo']),
  methods: {
    ...mapActions(['getUser']),
    ...mapMutations(['saveUser', 'setMoving', 'moveUp', 'moveDown', 'moveTo',
      'saveMotherPic', 'saveSelfPic', 'setUserGender', 'setPicResult', 'setPersonalInfo']),
  }
}
