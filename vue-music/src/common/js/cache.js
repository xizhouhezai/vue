import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

/**
 * 把搜索历史插入storage中
 * @param {array} arr storage原始列表
 * @param {string} val 需要插入storage的值
 * @param {function} compare 比较函数
 * @param {number} maxLen 插入缓存的最大长度
 */
function insertArray(arr, val, compare, maxLen) {
  let index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteArray(arr, compare) {
  let index = arr.findIndex(compare)
  if (index >= 0) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  // 获取storage原始列表
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 为state初始化cache
export function localsearch() {
  return storage.get(SEARCH_KEY, [])
}

// 删除历史搜索的方法
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 删除所有历史搜索的方法
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}