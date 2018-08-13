import {
  loadComboboVo
} from '@/api/loadComboboVo'
const student = {
  state: {
    loadComboboVoList: []
  },
  mutations: {
    UPDATA_LOADCOMBOBOVO_LIST: (state, list) => {
      state.loadComboboVoList = list
    }
  },
  actions: {
    // 学院
    async loadComboboVoList({
      commit
    }, Parm) {
      const list = await loadComboboVo(Parm)
      commit('UPDATA_LOADCOMBOBOVO_LIST', list.data)
      return list
    }
  }
}

export default student
