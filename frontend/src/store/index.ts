import { createStore } from 'vuex'

export default createStore({
  state: {
    list: []
  },
  getters: {
    
  },
  mutations: {
    name: (state, newValue) => {
      state.name = newValue
    }
  },
  actions: {
    setName: (ctx, value) => {
      ctx.commit('name', value)
    }
  }
})
