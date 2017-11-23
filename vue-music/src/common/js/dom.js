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
