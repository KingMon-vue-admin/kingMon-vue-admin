import request from '@/utils/request'
import requestMethod from '@/utils/requestMethod.js'

// 获取门户上传图片列表接口
export function baseFilesAddress(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: '/banner/bizBanner/loadBizBannerDataSet',
    method: 'post',
    data
  })
}
