import request from '@/utils/request'
import requestMethod from '@/utils/requestMethod.js'
// 获取权限列表
export function loadAuthModuleLists(params) {
  console.log(params)
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authModule/loadAuthModuleList',
    method: 'post',
    data
  })
}

// 修改权限信息
export function UpdateAuthModules(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authModule/updateAuthModule',
    method: 'POST',
    data
  })
}

// 删除权限信息
export function deletAuthModules(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authModule/deletAuthModule',
    method: 'POST',
    data
  })
}

// 添加权限
export function addAuthModules(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authModule/addAuthModule',
    method: 'POST',
    data
  })
}
