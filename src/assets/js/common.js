export function calcImgSize(width, height, maxVal) {
  let oh = width || 1520
  let ow = height || 2880
  let max = maxVal || true
  let nw = document.documentElement.clientWidth
  let nh = nw / ow * oh
  if (ow !== 0 && oh !== 0) {
    if (nh > 800 && max) {
      nh = 800
    }
  } else {
    console.log('height:' + height)
  }
  return nh + 'px'
}
