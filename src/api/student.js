import request from '@/utils/request'
import requestMethod, { MockrequestMethod } from '@/utils/requestMethod.js'

// 获取宿舍列表
export function hotelLists(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: '/demo/baseHostel/loadBaseHostelDataSet',
    method: 'post',
    data
  })
}
// 查钱
export function loadBizTuitionFeeDataSets(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: '/demo/bizTuitionFee/loadBizTuitionFeeDataSet',
    method: 'post',
    data
  })
}
// 来校方式列表
export function cominglist(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: '/demo/bizComeSchoolMode/loadBizComeSchoolModeDataSet',
    method: 'post',
    data
  })
}
// 学生基本信息列表
export function Students(params) {
  const data = MockrequestMethod({
    ...params
  })
  return request({
    url: '/base/bizStudent/loadBizStudentDataSet',
    method: 'post',
    data
  })
}
// 军训服装列表
export function clothingList(params) {
  const data = MockrequestMethod({
    ...params
  })
  return request({
    url: '/demo/bizClothing/loadBizClothingDataSet',
    method: 'post',
    data
  })
}
// 助学贷款
export function bizLoan(params) {
  const data = MockrequestMethod({
    ...params
  })
  return request({
    url: '/demo/bizLoan/loadBizLoanDataSet',
    method: 'post',
    data
  })
}
// 班级管理列表
export function baseClazz(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: '/manage/baseClazz/loadBaseClazzDataSet',
    method: 'post',
    data
  })
}
// 专业列表
export function loadBaseMajorDataSet(params) {
  const data = requestMethod({
    ...params
  })
  return request({
    url: '/manage/baseMajors/loadBaseMajorsDataSet',
    method: 'post',
    data
  })
}
// 学院列表
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
