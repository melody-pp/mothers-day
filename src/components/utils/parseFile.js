import EXIF from 'exif-js'
import AlloyImage from '../AlloyImage'

export const parseFile = (file, callBack) => {
  if (!file) {
    return
  }
  const canvas = document.createElement('canvas')
  canvas.width = 549
  canvas.height = 764

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.addEventListener('load', () => {
    const img = new Image()
    img.src = reader.result

    img.onload = function () {
      const imgWidth = this.width
      const imgHeight = this.height
      const zoom = window.innerWidth / 790
      const scale = Math.max(549 / imgWidth, 764 / imgHeight)
      const ratio = zoom * scale

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img,
        0, 0, imgWidth,
        imgHeight, 0, 0,
        imgWidth * ratio,
        imgHeight * ratio)

      callBack(canvas.toDataURL())
    }
  }, false)
}
