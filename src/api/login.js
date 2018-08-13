import request from '@/utils/request'
import md5 from '../../static/jquery.md5.min.js'
import requestMethod, { MockrequestMethod } from '@/utils/requestMethod.js'

export function loginByUsername(username, passwordMD5, captcha, loginOrgin) {
  const password = (() => {
    var salt = 'zhtframework_94DABGioQOq2tTUO0AXYow'
    console.log(md5(salt + passwordMD5))
    return md5(salt + passwordMD5)
  })()
  console.log(requestMethod)
  const data = requestMethod({
    username,
    password,
    captcha,
    loginOrgin
  })
  return request({
    url: 'api/auth/login',
    method: 'post',
    data
  })
}
export function captchaImg(random) {
  const data = {
    random
  }
  return request({
    url: 'api/auth/captcha',
    method: 'get',
    data
  })
}
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}
export function loadMenu(Parm) {
  const data = requestMethod({
    ...Parm
  })
  return request({
    url: 'api/auth/loadMenu',
    method: 'post',
    data
  })
}

export function getAuthList(Parm) {
  const data = requestMethod({
    ...Parm
  })
  return request({
    url: '/base/sysOrganization/loadAuthPermission',
    method: 'post',
    data
  })
}
// 加载学院
export function loadSysOrganizationDataSetStore(Parm) {
  const data = requestMethod({
    ...Parm
  })
  return request({
    url: 'base/sysOrganization/loadSysOrganizationDataSet',
    method: 'post',
    data
  })
}
// 加载学院
export function loadBaseMajorsDataSetStore(Parm) {
  const data = requestMethod({
    ...Parm
  })
  return request({
    url: 'manage/baseMajors/loadBaseMajorsDataSet',
    method: 'post',
    data
  })
}


// 加载权限
export function loadAuthCodes(Parm) {
  const data = requestMethod({
    ...Parm
  })
  return request({
    url: '/auth/authPermission/loadAuthPermissionList',
    method: 'post',
    data
  })
}

export function loadAuthKey(Parm) {
  const data = requestMethod({
    ...Parm
  })
  return request({
    url: '/sys/sysDic/loadAllSysDic',
    method: 'post',
    data
  })
}

export function loadBizComeSchoolModeDataSetToDay(Parm) {
  const data = requestMethod({
    ...Parm
  })
  return request({
    url: '/demo/bizComeSchoolMode/loadBizComeSchoolModeDataSetToDay',
    method: 'post',
    data
  })
}

