import { PERMISSION, SOURCE, PROMOTE_SOURCE } from '@/config'
const maxlen15 = (value) => {
  if (!value) return '—'
  if (value.length > 15) {
    return value.split('', 15).join('') + '...'
  } else {
    return value
  }
}
const permission = (value) => {
  for (let i of PERMISSION) {
    if (value === i.key) {
      return i.name
    }
  }
}
const source = (source) => {
  for (let i of SOURCE) {
    if (source === i.key) {
      return i.name
    }
  }
}
const timeFormat = (time) => {
  if (time) {
    return time.date_format().format('yyyy-MM-dd hh:mm')
  } else {
    return '-'
  }
}
const promoteSource = (source) => {
  for (let i of PROMOTE_SOURCE) {
    if (source === i.value) {
      return i.label
    }
  }
}
const promoteSonSource = (source, promoteSource) => {
  for (let i of PROMOTE_SOURCE) {
    if (promoteSource === i.value) {
      for (let j of i.children) {
        if (source === j.value) {
          return j.label
        }
      }
    }
  }
}
export { maxlen15, permission, source, timeFormat, promoteSource, promoteSonSource }
