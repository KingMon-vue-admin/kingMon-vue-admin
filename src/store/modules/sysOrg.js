import {
  loadChildSysOrgs,
  createSysOrgs,
  addRoles,
  deleteSysOrgs
} from '@/api/sysOrg'
const sysOrg = {
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
    async loadMorex({
      commit
    }, Parm) {
      const response = await loadChildSysOrgs(Parm)
      commit('UPDATA_APP_NOWS', response.data.data.sysOrg)
      return response
    },
    // 加载权限表
    async loadChildSysOrg({
      commit
    }, Parm) {
      const response = loadChildSysOrgs(Parm)
      commit('UPDATA_APP_USER', response.data.data.sysOrg)
      return response
    },
    // 更新某一个数据
    async createSysOrg({
      commit
    }, Parm) {
      return await createSysOrgs(Parm)
    },
    // 删除该数据
    async deleteSysOrg({
      commit
    }, Parm) {
      return await deleteSysOrgs(Parm)
    },
    // 添加权限
    async addRole({
      commit
    }, Parm) {
      return await addRoles(Parm)
    }
  }
}

export default sysOrg
