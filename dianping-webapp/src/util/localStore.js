export default {
  getItem (key) {
    let value
    try {
      value = localStorage.getItem(key)
    } catch (err) {
      console.log('localStorage.getItem报错：' + err.message)
    }
    return value
  },
  setItem (key, value) {
    try {
      // ios safari 无痕模式下。直接使用 localStorage.setItem 会报错
      localStorage.setItem(key, value)
    } catch (err) {
      console.log('localStorage.setItem报错' + err.message)
    }
  }
}
