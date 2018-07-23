import axios from 'axios'
import {
  Message
} from 'element-ui'
import Cookies from 'js-cookie'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
// import KingMonLoading from '../utils/loadings'
// console.log(layui,"laui")
axios.defaults.withCredentials = true
// create an axios instance
const service = axios.create({
  baseURL: 'test', // api的base_url
  timeout: 5000, // request timeout
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})
// request interceptor
service.interceptors.request.use(config => {
  // KingMonLoading('create')
  // KingMonLoading('create')
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()
    config.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01'
    config.headers['Connection'] = 'keep-alive'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    config.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01'
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
service.credentials = true
service.defaults.withCredentials = true

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    // KingMonLoading('remove')
    const body = response.data
    if (body.statusCode === 200 || body.statusCode === undefined) {
      return response
    }
    if (body.statusCode === 300) {
      Message({
        message: body.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    if (body.statusCode === 301) {
      if (body.message === '未登录') {
        Message({
          message: body.message,
          type: 'error',
          duration: 5 * 1000
        })
        Cookies.remove('Admin-Token')
        location.reload()
      }
    }
    if (body.statusCode === 303) {
      Message({
        message: body.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    if (body.statusCode === 401) {
      Message({
        message: body.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    if (body.statusCode === 402) {
      Message({
        message: body.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    if (body.statusCode === 500) {
      Message({
        message: body.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    throw body.message
    // const res = response.data
    // if (res.code !=== 20000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code ==== 50008 || res.code ==== 50012 || res.code ==== 50014) {
    //     // 请自行在引入 MessageBox
    //     // import { Message, MessageBox } from 'element-ui'
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }
  },
  error => {
    Message({
      message: 'xxxxxxxx',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
