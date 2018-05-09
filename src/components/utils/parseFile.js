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
        const orientation = EXIF.getTag(this, 'Orientation')
        const ctx = canvas.getContext('2d')
        let rotate = false
        if (orientation === 6) {
          rotate = true
          ctx.translate(275, 382)
          ctx.rotate(Math.PI / 2)
        }
        if (orientation === 8) {
          rotate = true
          ctx.translate(275, 382)
          ctx.rotate(-Math.PI / 2)
        }
        ctx.drawImage(img,
          rotate ? -imgWidth / 2 : 0,
          rotate ? -imgHeight / 2 : 0,
          imgWidth, imgHeight, 0, 0,
          imgWidth * ratio, imgHeight * ratio)

        callBack(canvas.toDataURL())
      })
    }
  }, false)
}
