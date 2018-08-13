import request from '@/utils/request'
import requestMethod from '@/utils/requestMethod.js'
// 获取院系列表
export function loadSysOrganizationDataSet(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: '/base/sysOrganization/loadSysOrganizationDataSet',
    method: 'post',
    data
  })
}
