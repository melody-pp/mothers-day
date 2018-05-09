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
      const ratio = Math.min(549 / this.width, 764 / this.height)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const zoom = window.innerWidth / 790
      canvas.width = 549
      canvas.height = 764

      ctx.drawImage(img, 0, 0, this.width, this.height, 0, 0, this.width * ratio * zoom, this.height * ratio * zoom)

      callBack(canvas.toDataURL())
    }
  }, false)
}
