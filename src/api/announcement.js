import request from '@/utils/request'
import requestMethod from '@/utils/requestMethod.js'
// 获取权限列表
export function loadBizQuestionAnswerDataSet(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'manage/bizQuestionAnswer/loadBizQuestionAnswerDataSet',
    method: 'post',
    data
  })
}
// 获取通知公告列表
export function loadBizNoticeDataSet(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'manage/bizNotice/loadBizNoticeDataSet',
    method: 'post',
    data
  })
}
// 院系

export function loadSysOrganizationDataSet(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'base/sysOrganization/loadSysOrganizationDataSet',
    method: 'post',
    data
  })
}
export function loadBizNoticeDataSetsA(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'manage/bizNotice/loadBizNoticeDataSet',
    method: 'post',
    data
  })
}

export function loadStudentInOrNoOrganization(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'base/sysOrganization/loadStudentInOrNoOrganization',
    method: 'post',
    data
  })
}

export function removeStudentFromOrganization(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'base/sysOrganization/removeStudentFromOrganization',
    method: 'post',
    data
  })
}

export function addStudentToOrganization(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'base/sysOrganization/addStudentToOrganization',
    method: 'post',
    data
  })
}

export function loadBizBasicFactsDataSetTT(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: 'demo/bizBasicFacts/loadBizBasicFactsDataSet',
    method: 'post',
    data
  })
}