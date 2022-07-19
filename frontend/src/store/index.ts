import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
export default createStore({
  state,
  getters: {
    curCompList: (state:any, getters) => {
      let comps = state.comps_sum.filter((v:any) => v.type === state.compType);
      return comps&& comps.length>0 ? comps[0].children: []
    }
  },
  mutations,
  actions: {
    setName: (ctx, value) => {
      ctx.commit('name', value)
    }
  }
})
