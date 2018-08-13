import request from '@/utils/request'
import requestMethod from '@/utils/requestMethod.js'

// 加载数据字典
export function loadComboboVo(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: '/sys/sysDic/loadComboboVo',
    method: 'post',
    data
  })
}
