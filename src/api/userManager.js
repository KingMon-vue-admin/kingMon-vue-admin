import request from '@/utils/request'
import requestMethod from '@/utils/requestMethod.js'
// 获取权限列表
export function loadAuthUserLists(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authUser/loadAuthUserList',
    method: 'post',
    data
  })
}

// 查询某些App
export function SearchAuthApps(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authApp/loadAuthAppList',
    method: 'post',
    data
  })
}

// 获取所有APP权限
export function loadAuthAppLists(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authApp/loadAuthAppList',
    method: 'POST',
    data
  })
}
// 修改权限信息
export function loadOrgLists(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'sys/sysOrg/loadOrgList',
    method: 'POST',
    data
  })
}

// 删除权限信息
export function deletAuthRoles(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authRole/deletAuthRole',
    method: 'POST',
    data
  })
}

// 添加权限
export function createAccounts(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authUser/createAccount',
    method: 'POST',
    data
  })
}
// 获取权限列表
export function loadAuthRoleLists(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authRole/loadAuthRoleList',
    method: 'post',
    data
  })
}


// 修改用户权限
export function setUserStatuss(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authUser/setUserStatus',
    method: 'POST',
    data
  })
}

// 查询当前用户角色
export function loadRoleDataSetForUserAssigns(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authUser/loadRoleDataSetForUserAssign',
    method: 'POST',
    data
  })
}

// 单点删除权限
export function removeRoleFromUsers(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authUser/removeRoleFromUser',
    method: 'POST',
    data
  })
}

// 单点增加角色
export function addRolesToUsers(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authUser/addRolesToUser',
    method: 'POST',
    data
  })
}

// 查询用户权限
export function loadPermDataSetForUserAssigns(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authUser/loadPermDataSetForUserAssign',
    method: 'POST',
    data
  })
}

// 单个用户增加权限
export function addPremsToUsers(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authUser/addPremsToUser',
    method: 'POST',
    data
  })
}

// 单个用户增加权限
export function removePremsFromUsers(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authUser/removePremsFromUser',
    method: 'POST',
    data
  })
}
