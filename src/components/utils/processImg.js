export const processImg = (img, callback) => {
  img.loadOnce(function () {
    const aiImg = $AI(this)
    aiImg.ps('复古').replace(this)
  })
}