import {
  loadAuthRoleLists,
  updateRoles,
  addRoles,
  deletAuthRoles
} from '@/api/userRoles'
import {
  loadAuthAppLists
} from '@/api/roles'
import {
  promises
} from 'fs'
const errorLog = {
  state: {
    UserList: []
  },
  mutations: {
    UPDATA_APP_USER: (state, list) => {
      state.UserList = list
    }
  },
  actions: {
    // 加载应用表
    loadAuthAppListApp({
      commit
    }, AppsList) {
      return new Promise((resolve, reject) => {
        loadAuthAppLists(AppsList).then(req => {
          console.log(req)
          commit('UPDATA_APP_LIST', req.data.data.dataSet.rows)
          resolve(req)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 加载权限表
    loadAuthRoleList({
      commit
    }, AppsList) {
      return new Promise((resolve, reject) => {
        loadAuthRoleLists(AppsList).then(req => {
          commit('UPDATA_APP_USER', req.data.rows)
          resolve(req.data.rows)
        }).catch(error => {
          reject(error)
        })
      })
      // commit('UPDATA_APP_LIST', Apps)
    },
    // 更新某一个数据
    updateRole({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        updateRoles(params).then(req => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除该数据
    deletAuthRole({
      commit
    }, App) {
      return new Promise((resolve, reject) => {
        console.log(App)
        deletAuthRoles(App).then(req => {
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
