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
