import {
  loadAuthAppLists,
  updateAuthApps,
  DeletAuthApps,
  AddAuthApps,
  SearchAuthApps
} from '@/api/roles'
import {
  promises
} from 'fs';
const errorLog = {
  state: {
    AppList: []
  },
  mutations: {
    UPDATA_APP_LIST: (state, list) => {
      state.AppList = list
    },
  },
  actions: {
    // 加载权限表
    loadAuthAppList({
      commit
    }, AppsList) {
      return new Promise((resolve, reject) => {
        loadAuthAppLists(AppsList.params).then(req => {
          console.log(req)
          commit('UPDATA_APP_LIST', req.data.data.dataSet.rows)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      // commit('UPDATA_APP_LIST', Apps)
    },
    // 更新某一个数据
    updateAuthApp({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        updateAuthApps(params).then(req => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除该数据
    DeletAuthApp({
      commit
    }, App) {
      return new Promise((resolve, reject) => {
        console.log(App)
        DeletAuthApps(App).then(req => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加权限
    AddAuthApp({
      commit
    }, App) {
      return new Promise((resolve, reject) => {
        AddAuthApps(App).then(req => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询App
    SearchAuthApp({
      commit
    }, App) {
      return new Promise((resolve, reject) => {
        SearchAuthApps(App).then(req => {
          commit('UPDATA_APP_LIST', req.data.data.dataSet.rows)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default errorLog
