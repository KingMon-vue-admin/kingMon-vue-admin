import {
  loadAuthModuleLists,
  UpdateAuthModules,
  deletAuthModules,
  addAuthModules
} from '@/api/modules'
import {
  promises
} from 'fs';
const errorLog = {
  state: {
    ModulesList: []
  },
  mutations: {
    UPDATA_APP_LIST: (state, list) => {
      state.ModulesList = list
    },
  },
  actions: {
    // 加载权限表
    loadAuthModuleList({
      commit
    }, AppsList) {
      return new Promise((resolve, reject) => {
        loadAuthModuleLists(AppsList).then(req => {
          console.log(req)
          commit('UPDATA_APP_LIST', req.data.rows)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      // commit('UPDATA_APP_LIST', Apps)
    },
    // 更新某一个数据
    updateAuthModuleChange({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        UpdateAuthModules(params).then(req => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除该数据
    deletAuthModule({
      commit
    }, App) {
      return new Promise((resolve, reject) => {
        console.log(App)
        deletAuthModules(App).then(req => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加权限
    addAuthModule({
      commit
    }, App) {
      return new Promise((resolve, reject) => {
        addAuthModules(App).then(req => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default errorLog
