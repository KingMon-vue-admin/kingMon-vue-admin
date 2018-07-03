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
