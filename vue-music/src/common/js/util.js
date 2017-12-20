function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * @function shuffle 打乱数组的方法
 * @param {array} arr 原始的数组
 * @return {array}
 */
export const shuffle = (arr) => {
  // 保持父本数组不变
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    // 获取随机整数
    let j = getRandomInt(0, i)
    let temp = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = temp
  }
  return _arr
}