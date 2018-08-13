import {
  loginByUsername,
  logout,
  getUserInfo,
  captchaImg,
  loadMenu,
  loadAuthCodes,
  test,
  loadAuthKey,
  loadBizComeSchoolModeDataSetToDay,
  loadSysOrganizationDataSetStore
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    random: '',
    setting: {
      articlePlatform: []
    },
    routers: []
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_RANDOM: (state, random) => {
      state.random = random
    },
    SET_MENU: (state, router) => {
      state.routers = router;
    }
  },

  actions: {
    // 用户名登录
    async loadBizComeSchoolModeDataSetToDays({
      commit
    }, Parm) {
      return loadBizComeSchoolModeDataSetToDay()
    },
    Logins({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.captcha, userInfo.loginOrgin).then(response => {
          if (response.data.statusCode == 200) {
            commit('SET_TOKEN', 'admin')
            setToken('admin')
            // 循环拼接所有学院专业
            // 
            loadSysOrganizationDataSetStore({
              page:1,
              rows:1000
            }).then(req => {
              console.log(req,'xsaxasxas')
            })
            // 当前目标只默认APP_ROOT
            loadMenu({
              appkey: "APP_ROOT"
            }).then(response => {
              const routers = response.data.data.navMenuData.map(rows => {
                rows.hidden = false;
                rows.alwaysShow = false;
                return rows;
              });
              commit("SET_MENU", routers);
              loadAuthCodes({page:1,rows:1000}).then(res => {
                let auts = {}
                res.data.recordRows.map(s =>{
                  auts[s.permCode] = s.url
                })
                console.log(res,'autssssssssssss')
                sessionStorage.setItem('Auth', JSON.stringify(auts))
              })
              let keys = {}
              loadAuthKey({
                rows: 1000,
                page: 1
              }).then(res => {
                function reload(now) {
                  if (keys[now.parentId] == undefined) {
                    keys[now.id] = {
                      children: {}
                    }
                  } else {
                    console.log(keys[now.parentId], now.parentId)
                    keys[now.parentId].children[now.dicNum] = now.dicAliasName
                  }
                  return
                }
                res.data.data.dataSet.rows.map(s => {
                  reload(s)
                })
                let realoads = {}
                // 重构格式
                for (var key in keys) {
                  for (let i = 0; i < res.data.data.dataSet.rows.length; i++) {
                    key
                    if (res.data.data.dataSet.rows[i].id == key) {
                      realoads[res.data.data.dataSet.rows[i].dicNum] = keys[key]
                    }
                  }
                }
                sessionStorage.setItem('KeysSchool', JSON.stringify(realoads))
              })
              resolve(response);
            });
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取图形验证码
    ImgIndexCaptcha({
      commit
    }, random) {
      return new Promise((resolve, reject) => {
        captchaImg(random).then(res => {
          console.log(res)
          commit('SET_RANDOM', res)
        })
      })
    },
    // 单独加载menu
    loadsMenus({
      commit
    }) {
      return new Promise((resolve, reject) => {
        loadMenu({
          appkey: "APP_ROOT"
        }).then(response => {
          const routers = response.data.data.navMenuData.map(rows => {
            rows.hidden = false;
            return rows;
          });
          commit("SET_MENU", routers);
          resolve(routers)
        }).catch(res => {
          return reject(res)
        });
      })

    },
    // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({
      commit
    }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
