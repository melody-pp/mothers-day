export { parseFile }from './parseFile'

export const getValidNum = (num, min, max) => {
  if (num < min) {
    return min
  }
  if (num > max) {
    return max
  }
  return num
}

export const isLoaded = img => img.complete && img.naturalWidth

