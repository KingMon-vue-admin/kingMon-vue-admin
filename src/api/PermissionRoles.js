import request from '@/utils/request'
import requestMethod from '@/utils/requestMethod.js'

// 加载所有权限
export function loadAuthPermissionLists(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authPermission/loadAuthPermissionList',
    method: 'POST',
    data
  })
}

// 修改所有权限
export function updatePermissions(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authPermission/updatePermission',
    method: 'POST',
    data
  })
}

// 增加权限
export function addPermissions(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authPermission/addPermission',
    method: 'POST',
    data
  })
}

// 增加权限
export function deletAuthPermissions(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authPermission/deletAuthPermission',
    method: 'POST',
    data
  })
}

