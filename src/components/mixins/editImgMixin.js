import { getValidNum } from '../utils'
import AlloyFinger from '../AlloyFinger'

export const editImgMixin = {
  data: () => ({
    deltaX: 0,  // 图片移动横坐标
    deltaY: 0,  // 图片移动纵坐标
    afInstance: null,
  }),
  computed: {
    imgStyle () {
      return {
        top: this.deltaY + 'px',
        left: this.deltaX + 'px',
      }
    }
  },
  created () {
    this.initAF = this.initAF.bind(this)
    this.pressMove = this.pressMove.bind(this)
  },
  methods: {
    pressMove (evt) {
      const motherImg = this.$refs.editImg
      const zoom = window.innerWidth / 790
      const frameWidth = 549 * zoom
      const frameHeight = 764 * zoom

      this.deltaX = getValidNum(this.deltaX + evt.deltaX, frameWidth - motherImg.width, 0)
      this.deltaY = getValidNum(this.deltaY + evt.deltaY, frameHeight - motherImg.height, 0)
    },
    initAF () {
      try {
        this.afInstance.destroy()
      } catch (e) {}
      this.afInstance = new AlloyFinger(this.$refs.mask, {pressMove: this.pressMove})
    }
  },
}
