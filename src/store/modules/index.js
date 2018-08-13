import {
  loadBizTuitionFeeDataSet
} from '@/api/index'
const student = {
  state: {
    indexList: []
  },
  mutations: {
    UPDATA_INDEX_LIST: (state, list) => {
      state.indexList = list
    }
  },
  actions: {
    // 学费缴纳门户显示
    async loadBizTuition({
      commit
    }, Parm) {
      const list = await loadBizTuitionFeeDataSet(Parm)
      commit('UPDATA_STUDENT_LIST', list.data)
      return list
    }
  }
}

export default student
