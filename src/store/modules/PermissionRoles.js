import {
  loadAuthPermissionLists,
  updatePermissions,
  addPermissions,
  deletAuthPermissions
} from '@/api/PermissionRoles'
import {
  loadAuthAppLists
} from '@/api/roles'
const Permission = {
  state: {
    Permission: []
  },
  mutations: {
    UPDATA_APP_LIST: (state, Permission) => {
      state.Permission = Permission
    }
  },
  actions: {
    // 查看
    async loadAuthAppListPermission({
      commit
    }, Parm) {
      const response = await loadAuthAppLists(Parm)
      return response
    },
    // 查看权限
    async loadAuthPermissionList({
      commit
    }, Parm) {
      const response = await loadAuthPermissionLists(Parm)
      commit('UPDATA_APP_LIST', response.data.rows)
      return response.data
    },
    // 更新权限
    async updatePermission({
      commit
    }, Parm) {
      await updatePermissions(Parm)
    },
    // 增加权限
    async addPermission({
      commit
    }, Parm) {
      await addPermissions(Parm)
    },
    // 删除权限
    async deletAuthPermission({
      commit
    }, Parm) {
      await deletAuthPermissions(Parm)
    }
  }
}

export default Permission
