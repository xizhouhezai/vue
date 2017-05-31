import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex)

const state = {
  count: 0,
  id: 0,
  articles: [],
  todos: [
    {id: 1, text: '12345', done: true},
    {id: 2, text: 'nihao', done: false}
  ]
}

const getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  }
}

const mutations = {
  increment (state, payload) {
    state.count += payload.amount
  },
  getArticle (state) {
    console.log(vue)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
