import {
  loadAuthRoleLists,
  updateRoles,
  addRoles,
  deletAuthRoles,
  loadPermDataSetForRoleAssigns,
  addPermsToRoles,
  removePermsFromRoles
} from "@/api/userRoles";
import { loadAuthAppLists } from "@/api/roles";
import { AuthRequest } from "@/utils/requestMethod";
const userRoles = {
  state: {
    UserList: []
  },
  mutations: {
    UPDATA_APP_USER: (state, list) => {
      state.UserList = list;
    }
  },
  actions: {
    // 单点删除权限
    async removePermsFromRole({ commit }, Parm) {
      await removePermsFromRoles(Parm);
    },
    // 单点增加角色权限
    async addPermsToRole({ commit }, Parm) {
      await addPermsToRoles(Parm);
    },
    // 加载权限
    async loadPermDataSetForRoleAssign({ commit }, Parm) {
      const yes = await loadPermDataSetForRoleAssigns({
        ...Parm,
        isInRole: true,
        page: 1,
        rows: 10000
      });
      const no = await loadPermDataSetForRoleAssigns({
        ...Parm,
        isInRole: false,
        page: 1,
        rows: 10000
      });
      return {
        yes: yes.data.rows,
        no: no.data.rows
      };
    },
    // 加载应用表
    async loadAuthAppListApp({ commit }, Parm) {
      const response = await loadAuthAppLists(Parm);
      commit("UPDATA_APP_LIST", response.data.data.dataSet.rows);
      return response;
    },
    // 加载权限表
    async loadAuthRoleList({ commit }, Parm) {
      const response = await loadAuthRoleLists(Parm);
      commit("UPDATA_APP_USER", response.data.rows);
      return response;
    },
    // 更新某一个数据
    async updateRole({ commit }, Parm) {
      return await updateRoles(Parm);
    },
    // 删除该数据
    async deletAuthRoleX({ commit }, Parm) {
      return await deletAuthRoles(Parm);
    },
    // 添加权限
    async addRoleX({ commit }, Parm) {
      return await addRoles(Parm);
    },
    // test
    async testas({ commit }, Parm) {
      return await AuthRequest(Parm);
    }
  }
};

export default userRoles;
