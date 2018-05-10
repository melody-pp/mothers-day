import EXIF from 'exif-js'

export const parseFile = (file, callBack) => {
  if (!file) {
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.addEventListener('load', () => {
    const img = new Image()
    img.src = reader.result

    img.onload = function () {
      const imgWidth = this.width
      const imgHeight = this.height
      const zoom = window.innerWidth / 790

      EXIF.getData(img, function () {
        const orientation = EXIF.getTag(this, 'Orientation')
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let scale = Math.max(549 / imgWidth, 764 / imgHeight)
        canvas.width = imgWidth * scale * zoom
        canvas.height = imgHeight * scale * zoom

        ctx.save()

        let rotate = false
        if (orientation === 6 || orientation === 8) {
          rotate = true

          scale = Math.max(549 / imgHeight, 764 / imgWidth)
          canvas.width = imgHeight * scale * zoom
          canvas.height = imgWidth * scale * zoom
          ctx.translate(canvas.width / 2, canvas.height / 2)
          ctx.rotate(Math.PI / 2 * (orientation === 6 ? 1 : -1))
        }

        ctx.drawImage(img,
          0, 0, imgWidth, imgHeight,
          rotate ? -canvas.height / 2 : 0,
          rotate ? -canvas.width / 2 : 0,
          rotate ? canvas.height : canvas.width,
          rotate ? canvas.width : canvas.height)

        ctx.restore()
        callBack(canvas.toDataURL())
      })
    }
  }, false)
}
