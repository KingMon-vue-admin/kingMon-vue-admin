import request from '@/utils/request'
import requestMethod, { MockrequestMethod } from '@/utils/requestMethod.js'
// 获取权限列表
export function AuthCodes(url,params) {
  const data = MockrequestMethod({
    ...params
  })
  return request({
    url: url,
    method: 'post',
    data
  })
}
