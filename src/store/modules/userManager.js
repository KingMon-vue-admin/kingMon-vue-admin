import {
  loadAuthUserLists,
  updateRoles,
  createAccounts,
  deletAuthRoles,
  loadOrgLists,
  loadAuthRoleLists,
  updateSysPositions,
  setUserStatuss,
  loadRoleDataSetForUserAssigns,
  removeRoleFromUsers,
  addRolesToUsers,
  loadAuthAppLists
} from '@/api/userManager'
import {
  promises
} from 'fs'
const errorLog = {
  state: {
    userTable: '',
    sysOrgs: {},
    userX: []
  },
  mutations: {
    UPDATA_APP_USERX: (state, list) => {
      state.userTable = list
    },
    UPDATA_APP_ORG: (state, list) => {
      state.sysOrgs = list
    },
    UPDATA_APP_ROLES: (state, list) => {
      state.userX = list
    }
  },
  actions: {
    // 查询应用
    async loadAuthAppListManger({
      commit
    }, Parm) {
      return await loadAuthAppLists(Parm)
    },
    // 设置用户状态
    async updateSysPosition({
      commit
    }, Prm) {
      return await setUserStatuss(Prm)
    },
    // 加载权限表
    async loadAuthRoleList({
      commit
    }, AppsList) {
      commit('UPDATA_APP_ROLES', (await loadAuthRoleLists(AppsList)).data.rows)
    },
    // 加载权限表
    async loadAuthUserList({
      commit
    }, AppsList) {
      const response = await loadAuthUserLists(AppsList)
      commit('UPDATA_APP_USERX', response.data.rows)
      return response
    },
    async loadRoleDataSetForUserAssign({
      commit
    }, Parm) {
      let obj = {}
      Parm['isInUser'] = true
      obj.yes = (await loadRoleDataSetForUserAssigns(Parm)).data.rows
      Parm['isInUser'] = false
      obj.no = (await loadRoleDataSetForUserAssigns(Parm)).data.rows.map(rows => {
        return {
          ...rows,
          type: 'info'
        }
      })
      return obj
    },
    // 删除单个用户权限
    async removeRoleFromUser({
      commit
    }, Parm) {
      await removeRoleFromUsers(Parm)
    },
    // 单独增加
    async addRolesToUser({
      commit
    }, Parm) {
      await addRolesToUsers(Parm)
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
    loadOrgListX({
      commit
    }, param) {
      return new Promise((resolve, reject) => {
        loadOrgLists(param).then(req => {
          commit('UPDATA_APP_ORG', req)
          resolve()
        }).catch(err => {
          reject(err)
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
    createAccount({
      commit
    }, App) {
      return new Promise((resolve, reject) => {
        createAccounts(App).then(req => {
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
