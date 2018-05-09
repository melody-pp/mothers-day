import EXIF from 'exif-js'

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

      EXIF.getData(img, function () {
        const ctx = canvas.getContext('2d')
        const orientation = EXIF.getTag(this, 'Orientation')

        // 在这里，用ctx.filter改变图片的饱和度、灰度等
        ctx.filter = 'saturate(30%)'

        // 修正图片方向
        if (orientation === 6) {
          ctx.rotate(Math.PI / 2)
        }
        if (orientation === 8) {
          ctx.rotate(-Math.PI / 2)
        }

        ctx.drawImage(img,
          0, 0, imgWidth,
          imgHeight, 0, 0,
          imgWidth * ratio,
          imgHeight * ratio)
        callBack(canvas.toDataURL())
      })
    }
  }, false)
}
