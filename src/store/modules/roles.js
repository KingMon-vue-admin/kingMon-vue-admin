import {
  loadAuthAppLists,
  updateAuthApps,
  DeletAuthApps,
  AddAuthApps,
  SearchAuthApps
} from '@/api/roles'
const roles = {
  state: {
    AppList: []
  },
  mutations: {
    UPDATA_APP_LIST: (state, list) => {
      state.AppList = list
    }
  },
  actions: {
    // 加载权限表
    async loadAuthAppListRoles({
      commit
    }, Parm) {
      const response = await loadAuthAppLists(Parm)
      commit('UPDATA_APP_LIST', response.data.data.dataSet.rows)
      return response
    },
    // 更新某一个数据
    async updateAuthApp({
      commit
    }, Parm) {
      return await updateAuthApps(Parm)
    },
    // 删除该数据
    async DeletAuthApp({
      commit
    }, Parm) {
      return await DeletAuthApps(Parm)
    },
    // 添加权限
    async AddAuthApp({
      commit
    }, Parm) {
      return await AddAuthApps(Parm)
    },
    // 查询App
    async SearchAuthApp({
      commit
    }, Parm) {
      const response = await SearchAuthApps(Parm)
      commit('UPDATA_APP_LIST', response.data.data.dataSet.rows)
      return response
    }
  }
}

export default roles
