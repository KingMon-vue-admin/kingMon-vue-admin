import request from '@/utils/request'
import requestMethod from '@/utils/requestMethod.js'
// 获取权限列表
export function updateAuthApp(pid, params) {
  const data = requestMethod({
    pid,
    params
  })
  return request({
    url: 'auth/authMenu/loadAuthMenuTree',
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
    params
  })
  return request({
    url: 'auth/authApp/loadAuthAppList',
    method: 'POST',
    data
  })
}
// 修改权限信息
export function updateAuthApps(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authApp/updateAuthApp',
    method: 'POST',
    data
  })
}

// 删除权限信息
export function DeletAuthApps(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authApp/deletAuthApp',
    method: 'POST',
    data
  })
}

// 添加权限
export function AddAuthApps(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authApp/addAuthApp',
    method: 'POST',
    data
  })
}
