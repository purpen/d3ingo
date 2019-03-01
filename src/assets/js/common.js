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

export function nameToAvatar(val) {
  if (val) {
    if (val && val.length > 2) {
      if (/\s/.test(val)) {
        // 有空格的情况
        let arr = val.split(/(?:[\s\n]+)/)
        let one = arr[0][0]
        let two = arr[1][0]
        if (one && /[a-zA-Z]/.test(one)) {
          one = one.toUpperCase()
        }
        if (two && /[a-zA-Z]/.test(two)) {
          two = two.toUpperCase()
        }
        return one + two
      } else {
        // 没空格
        if (/^[\u4e00-\u9fa5]+$/.test(val)) {
          // 全是汉字,取后两位
          return val.slice(val.length - 2)
        } else if (/^\d+$/.test(val)) { // 如果是纯数字,取后两位
          return val.slice(val.length - 2)
        } else {
          // 其他取前两位
          let strOne = val.charAt(0)
          let strTwo = val.charAt(1)
          if (strOne && /[a-zA-Z]/.test(strOne)) {
            strOne = strOne.toUpperCase()
          }
          if (strTwo && /[a-zA-Z]/.test(strTwo)) {
            strTwo = strTwo.toUpperCase()
          }
          return strOne + strTwo
        }
      }
    } else {
      let strOne = val.charAt(0)
      let strTwo = val.charAt(1)
      if (strOne && /[a-zA-Z]/.test(strOne)) {
        strOne = strOne.toUpperCase()
      }
      if (strTwo && /[a-zA-Z]/.test(strTwo)) {
        strTwo = strTwo.toUpperCase()
      }
      return strOne + strTwo
    }
  }
}

export function sliceImgName(val) { // 截取图片长度
  if (val) {
    if (val.length < 26) {
      return val
    } else {
      return val.substr(0, 10) + '...' + val.substr(val.length - 13)
    }
  }
}
