export const parseFile = (file, callBack) => {
  const reader = new FileReader()
  file && reader.readAsDataURL(file)

  reader.addEventListener('load', () => callBack(reader.result), false)
}
