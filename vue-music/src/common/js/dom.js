export function addClass(ele, className) {
  if (hasClass(ele, className)) {
    return
  }
  let newClass = ele.className.split(' ')
  newClass.push(className)
  ele.className = newClass.join(' ')
}

export function hasClass(ele, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(ele.className)
}

/**
 *
 * @param {*string} ele DOM元素
 * @param {*string} name 元素属性后缀名 example data-name
 * @param {*} val
 */
export function getData(ele, name, val) {
  const prifix = 'data-' + name
  if (val) {
    return ele.setAttribute(prifix, val)
  }
  return ele.getAttribute(prifix)
}

// autoPrefixer方法

// 能力检测
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

/**
 * @param {string} style 需要适配浏览器的css属性
 * @returns {string}
 */
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
