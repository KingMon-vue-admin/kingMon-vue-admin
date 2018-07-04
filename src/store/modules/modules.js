import {
  loadAuthModuleLists,
  UpdateAuthModules,
  deletAuthModules,
  addAuthModules
} from '@/api/modules'
import {
  loadAuthAppLists
} from '@/api/roles'
const modules = {
  state: {
    ModulesList: []
  },
  mutations: {
    UPDATA_APP_LIST: (state, list) => {
      state.ModulesList = list
    }
  },
  actions: {
    async loadAuthAppListModules({
      commit
    }, Parm) {
      const response = await loadAuthAppLists(Parm)
      return response
    },
    // 加载权限表
    async loadAuthModuleList({
      commit
    }, Parm) {
      const response = await loadAuthModuleLists(Parm)
      commit('UPDATA_APP_LIST', response.data.rows)
      return response
    },
    // 更新某一个数据
    async updateAuthModuleChange({
      commit
    }, Parm) {
      return await UpdateAuthModules(Parm)
    },
    // 删除该数据
    async deletAuthModule({
      commit
    }, Parm) {
      return await deletAuthModules(Parm)
    },
    // 添加权限
    async addAuthModule({
      commit
    }, Parm) {
      return await addAuthModules(Parm)
    }
  }
}

export default modules
