import request from '@/utils/request'
import requestMethod from '@/utils/requestMethod.js'
// 获取权限列表
export function loadChildSysOrgs(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'sys/sysOrg/loadSysOrg/loadChildSysOrg',
    method: 'post',
    data
  })
}

// 查询某些App
export function createSysOrgs(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'sys/sysOrg/createSysOrg',
    method: 'post',
    data
  })
}

// 修改权限信息
export function deleteSysOrgs(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'sys/sysOrg/deleteSysOrg',
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
export function addRoles(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'auth/authRole/addRole',
    method: 'POST',
    data
  })
}
