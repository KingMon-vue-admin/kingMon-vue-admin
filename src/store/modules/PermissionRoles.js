import {
  loadAuthPermissionLists,
  updatePermissions
} from '@/api/PermissionRoles'
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
    async loadAuthPermissionList({
      commit
    }, Parm) {
      commit('UPDATA_APP_LIST', (await loadAuthPermissionLists(Parm)).data.rows)
    },
    async updatePermission({
      commit
    }, Parm) {
      console.log(await updatePermissions(Parm))
    }
  }
}

export default Permission
