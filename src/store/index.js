import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import roles from './modules/roles'
import modules from './modules/modules'
import userRoles from './modules/userRoles'
import userManager from './modules/userManager'
import sysOrg from './modules/sysOrg'
import PermissionRoles from './modules/PermissionRoles'
import userRightsManagement from './modules/userRightsManagement'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    roles,
    modules,
    userRoles,
    userManager,
    sysOrg,
    PermissionRoles,
    userRightsManagement
  },
  getters
})

export default store
