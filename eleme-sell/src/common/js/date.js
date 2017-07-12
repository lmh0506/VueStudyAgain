export function formatDate (date, fmt) {
  if (/(y+)/i.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))   // RegExp.$1 表示匹配到的值
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let key in o) {
    if (new RegExp(`(${key})`, 'i').test(fmt)) {
      let str = o[key] + ''
      let s = RegExp.$1

      fmt = fmt.replace(s, (s.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
