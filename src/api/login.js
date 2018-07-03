import request from '@/utils/request'
import md5 from '../../static/jquery.md5.min.js'
import requestMethod from '@/utils/requestMethod.js'

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
