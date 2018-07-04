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
const userManager = {
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
    }, Parm) {
      return await setUserStatuss(Parm)
    },
    // 加载权限表
    async loadAuthRoleList({
      commit
    }, Parm) {
      commit('UPDATA_APP_ROLES', (await loadAuthRoleLists(Parm)).data.rows)
    },
    // 加载权限表
    async loadAuthUserList({
      commit
    }, Parm) {
      const response = await loadAuthUserLists(Parm)
      commit('UPDATA_APP_USERX', response.data.rows)
      return response
    },
    async loadRoleDataSetForUserAssign({
      commit
    }, Parm) {
      const obj = {}
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
    async loadOrgListX({
      commit
    }, Parm) {
      const response = await loadOrgLists(Parm)
      commit('UPDATA_APP_ORG', response)
      return response
    },
    // 删除该数据
    async deletAuthRole({
      commit
    }, Parm) {
      return await deletAuthRoles(Parm)
    },
    // 添加权限
    async createAccount({
      commit
    }, Parm) {
      return await createAccounts(Parm)
    }
  }
}

export default userManager
