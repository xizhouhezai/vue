const mutations = {
  increment (state, count) {
    var i = parseInt(count)
    state.count = i + 1
  }
}

export default mutations
