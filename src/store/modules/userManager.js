import {
  loadAuthUserLists,
  createAccounts,
  deletAuthRoles,
  loadOrgLists,
  loadAuthRoleLists,
  setUserStatuss,
  loadRoleDataSetForUserAssigns,
  removeRoleFromUsers,
  addRolesToUsers,
  loadAuthAppLists,
  loadPermDataSetForUserAssigns,
  addPremsToUsers,
  removePremsFromUsers
} from '@/api/userManager'
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
    // 单个用户删除权限
    async removePremsFromUser({
      commit
    }, Parm) {
      await removePremsFromUsers(Parm)
    },
    // 单个用户增加权限
    async addPremsToUser({
      commit
    }, Parm) {
      await addPremsToUsers(Parm)
    },
    // 查询用户权限
    async loadPermDataSetForUserAssign({
      commit
    }, Parm) {
      const yes = await loadPermDataSetForUserAssigns({
        ...Parm,
        isInUser: true,
        page: 1,
        rows: 10000
      })
      const no = await loadPermDataSetForUserAssigns({
        ...Parm,
        isInUser: false,
        page: 1,
        rows: 10000
      })
      return {
        yes: yes.data.rows,
        no: no.data.rows
      }
    },
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
