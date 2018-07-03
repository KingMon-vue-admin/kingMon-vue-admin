import {
  loadChildSysOrgs,
  createSysOrgs,
  addRoles,
  deleteSysOrgs
} from '@/api/sysOrg'
import {
  promises
} from 'fs'
const errorLog = {
  state: {
    Org: [],
    Nows: []
  },
  mutations: {
    UPDATA_APP_USER: (state, list) => {
      state.Org = list
    },
    UPDATA_APP_NOWS: (state, data) => {
      state.Nows = data
    }
  },
  actions: {
    // 查询子集
    loadMorex({
      commit
    }, AppsList) {
      return new Promise((resolve, reject) => {
        loadChildSysOrgs(AppsList).then(req => {
          console.log(req)
          commit('UPDATA_APP_NOWS', req.data.data.sysOrg)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      // commit('UPDATA_APP_LIST', Apps)
    },
    // 加载权限表
    loadChildSysOrg({
      commit
    }, AppsList) {
      return new Promise((resolve, reject) => {
        loadChildSysOrgs(AppsList).then(req => {
          commit('UPDATA_APP_USER', req.data.data.sysOrg)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      // commit('UPDATA_APP_LIST', Apps)
    },
    // 更新某一个数据
    createSysOrg({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        createSysOrgs(params).then(req => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除该数据
    deleteSysOrg({
      commit
    }, App) {
      return new Promise((resolve, reject) => {
        deleteSysOrgs(App).then(req => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加权限
    addRole({
      commit
    }, App) {
      return new Promise((resolve, reject) => {
        addRoles(App).then(req => {
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
