import request from '@/utils/request'
import requestMethod from '@/utils/requestMethod.js'

// 获取宿舍列表
export function loadBizTuitionFeeDataSet(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: '/user/banner/bizBanner/loadBizTuitionFeeDataSet',
    method: 'post',
    data
  })
}
