<template>
  <div class="app-container">
    <div class="filter-container">
      <!--  -->
      <el-dialog v-el-drag-dialog title="角色设置" :visible.sync="dialogTableVisible">
        <el-form ref="form" :model="form" label-width="100px" style="width: 90%;margin: auto;">
          <p>当前用户名称：{{form.account}}</p>
          <p>当前用户I D：{{form.id}}</p>
          <!-- {{form}} -->
          <el-form-item label="选择App">
            <el-select class="kingMon-right" v-model="form.rules" @change="searchAppRoles" clearable style="width: 160px;" placeholder="选择App类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 所有角色 -->
          <el-form-item label="已拥有角色">
            <!-- userRoles[scope.row.defaultRole] -->
            <el-tag v-if="userRolesConfig.yes != undefined" v-for="tag in userRolesConfig.yes" :key="tag.name" closable :type="tag.type"
              @close="handleClose(tag)">
              {{tag.name}}
            </el-tag>
            <span v-if="userRolesConfig.yes == undefined">请先选择App</span>
            <span v-if="userRolesConfig.yes != undefined && userRolesConfig.yes.length == 0">该用户暂无角色</span>
          </el-form-item>
          <el-form-item label="未拥有角色">
            <!-- userRoles[scope.row.defaultRole] -->
            <el-tag v-for="tag in userRolesConfig.no" :key="tag.name" :type="tag.type">
              <span @click="addSelf(tag)">{{tag.name}}</span>
            </el-tag>
            <span v-if="userRolesConfig.yes == undefined">请先选择App</span>
            <span v-if="userRolesConfig.no != undefined && userRolesConfig.no.length == 0">该App下暂无角色</span>
          </el-form-item>
          <el-form-item label="用户开启状态">
            <el-switch v-model="form.status"></el-switch>
          </el-form-item>
          <el-form-item label="用户描述">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addStatic">立即创建</el-button>
            <el-button @click="dialogTableVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 顶部操作框 -->
      <el-select class="kingMon-right" v-model="searchFrom.rules" clearable style="width: 160px;" placeholder="选择App类型">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <!-- <el-input size="small" class="kingMon-right" v-model="searchs.name" style="width: 200px;height: 35px;" placeholder="输入AppKey查询"></el-input> -->
      <!-- <el-select class="kingMon-right" v-model="searchFrom.rules" clearable style="width: 90px" placeholder="选择顺序">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select class="kingMon-right" v-model="searchFrom.rules" clearable style="width: 120px" placeholder="选择类型">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select> -->
      <!-- <el-button class="kingMon-right" type="primary" icon="el-icon-search" @click="searchApp">搜索</el-button> -->
      <el-button class="kingMon-right" type="primary" icon="el-icon-edit" style="margin-left: 0px;" @click="dialogTableVisible = true">添加</el-button>
      <!-- 左侧选择最高权限 -->

      <!-- 图表操作 -->
      <el-checkbox-group v-model="checkboxVal">
        <!-- <el-checkbox label="apple">apple</el-checkbox>
        <el-checkbox label="banana">banana</el-checkbox>
        <el-checkbox label="orange">orange</el-checkbox> -->
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column class-name="status-col" label="用户ID" width="50">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="用户账号" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.account"></el-input>
          </template>
          <span v-else>{{scope.row.account}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="账户过期" width="100">
        <template slot-scope="scope">
          <div v-if="!scope.row.edit">
            <el-tag v-if="scope.row.accountExpired == 1">未过期</el-tag>
            <el-tag v-else type="danger">已过期</el-tag>
          </div>
          <el-switch v-else v-model="scope.row.accountExpired"></el-switch>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否上锁" width="100">
        <template slot-scope="scope">
          <div v-if="!scope.row.edit">
            <el-tag v-if="scope.row.accountLocked == 1">未上锁</el-tag>
            <el-tag v-else type="danger">已上锁</el-tag>
          </div>
          <el-switch v-else v-model="scope.row.accountLocked"></el-switch>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="账户等级" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input-number size="small" v-model="scope.row.authLevel"></el-input-number>
          </template>
          <el-button v-else type="primary">{{scope.row.authLevel}}</el-button>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="用户凭证" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch v-model="scope.row.credentialsExpired"></el-switch>
          </template>
          <div v-if="!scope.row.edit">
            <el-tag v-if="scope.row.credentialsExpired == 1">未过期</el-tag>
            <el-tag v-else type="danger">已过期</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="用户组织" width="150">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="form.appKey" clearable style="width:100%;" placeholder="分配组织">
              <el-option v-for="item in orgListSelect" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{orgList["'" + scope.row.defaultOrg + "'"]}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="用户职位" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.defaultPosition"></el-input>
          </template>
          <span v-else>{{scope.row.defaultPosition}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="用户角色" width="150">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-button type="primary" @click="opens(scope.row)">修改角色</el-button>
          </template>
          <span v-else>{{userRoles[scope.row.defaultRole]}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="用户openId" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.openId"></el-input>
          </template>
          <span v-else>{{scope.row.openId}}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column class-name="status-col" label="用户password" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.password"></el-input>
          </template>
          <span v-else>{{scope.row.password}}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column class-name="status-col" label="用户salt" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.salt"></el-input>
          </template>
          <span v-else>{{scope.row.salt}}</span>
        </template>
      </el-table-column> -->
      <el-table-column class-name="status-col" label="用户状态" width="100">
        <template slot-scope="scope">
          <div v-if="!scope.row.edit">
            <el-tag v-if="scope.row.status == 1">开启</el-tag>
            <el-tag v-else type="danger">关闭</el-tag>
          </div>
          <el-switch v-else v-model="scope.row.switch"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设置">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="ViewUpdateSysPosition(scope.row)" size="small" icon="el-icon-circle-check-outline">确认</el-button>
          <el-button v-if="scope.row.edit" type="danger" @click="confirmDel(scope.row)" size="small" icon="el-icon-circle-check-outline">删除</el-button>
          <el-button v-if="scope.row.edit" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination style="margin-top: 24px;" background layout="prev, pager, next" :total="1000" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="listQuery.page" :page-size="listQuery.limit">
    </el-pagination>
  </div>
</template>

<script>
  const defaultFormThead = ["appKey", "status", "remark"];
  import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
  import {
    init,
    run
  } from '@/utils/AOP'
  export default {
    name: "userManager",
    directives: {
      elDragDialog
    },
    data() {
      return {
        // 用户角色管理
        userRolesConfig: {},
        // 角色表
        userRoles: [],
        userRolesSelect: [],
        // 组织表
        orgList: [],
        orgListSelect: [],
        nowApps: "",
        // 分页改动
        listQuery: {
          page: 1,
          limit: 10,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        // 查询
        searchs: {},
        // 新增用戶
        form: {},
        dialogTableVisible: false,
        // 顺序
        options: [],
        // 搜索内容集合
        searchFrom: {},
        // 是否loading
        listLoading: false,
        // 表格集合
        tableData: [],
        key: 1, // table key
        checkboxVal: defaultFormThead, // checkboxVal
        formThead: defaultFormThead // 默认表头 Default header
      };
    },
    created() {
      this.upApp()
    },
    computed: {

    },
    methods: {
      // 设置用户权限极状态
      ViewUpdateSysPosition(val) {
        val.userIds = val.id
        val.status = (val.status ? 1 : 2)
        this.$store.dispatch('updateSysPosition', val).then(s => {
          this.$message({
            type: 'success',
            message: '修改完成!'
          });
          this.upApp()
        }).catch(error => {
          console.log(error, "查看返回的错误")
        })
      },
      // 查询所有权限
      upApp() {
        // 查询用户
        this.$store.dispatch('loadOrgListX').then(() => {
          this.orgListSelect = this.$store.state.userManager.sysOrgs.data.map(row => {
            return {
              id: row.orgTreeCode,
              name: row.name
            }
          })
          for (var value of this.$store.state.userManager.sysOrgs.data) {
            this.orgList["'" + (value.orgTreeCode || 0) + "'"] = value.name
          }
          this.$store.dispatch('loadAuthUserList', 1).then(() => {
            this.$store.dispatch('loadAuthRoleList', {
              params: 1,
            }).then(() => {
              this.listLoading = false
              this.updataLists()
              this.userRolesSelect = this.$store.state.userManager.userX.map(row => {
                return {
                  id: row.id,
                  name: row.name
                }
              })
              for (var value of this.$store.state.userManager.userX) {
                this.userRoles[(value.id || 0)] = value.name
              }
            })
          }).catch(() => {

          })
          // 查询角色列表

        }).catch(err => {
          console.log(err)
        })


      },
      // 分页改动
      handleCurrentChange() {

      },
      handleSizeChange() {

      },
      // 单个用户增加角色
      addSelf(tag) {
        this.$confirm('是否为用户：' + this.form.account + '增加角色' + tag.name + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('addRolesToUser', {
            roleIds: tag.id,
            userId: this.form.id
          }).then(() => {
            this.searchAppRoles()
            this.$message({
              type: 'success',
              message: '增加角色成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      // 单个用户移除权限
      handleClose(tag) {
        this.$confirm('此操作将删除用户：' + this.form.account + '下的角色' + tag.name + ' , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('removeRoleFromUser', {
            roleIds: tag.id,
            userId: this.form.id
          }).then(() => {
            this.searchAppRoles()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(err => {})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      // 展开查看
      opens(s) {
        this.$store.dispatch('loadAuthAppList', 1).then(() => {
          this.options = this.$store.state.roles.AppList.map(view => {
            return {
              value: view.appKey,
              label: view.name
            }
          })
          this.dialogTableVisible = true
          this.form = s
          this.listLoading = false
        }).catch(() => {
          alert("error")
        })

      },
      // 查询
      searchAppRoles() {
        this.$store.dispatch('loadRoleDataSetForUserAssign', {
          userId: this.form.id,
          appKey: this.form.rules,
        }).then(req => {
          this.userRolesConfig = req
        }).catch(err => {
          console.log(err)
        })
      },
      // 查询
      searchApp() {
        this.$store.dispatch('loadAuthRoleList', this.searchs).then(() => {
          this.$message({
            type: 'success',
            message: '查询完成!'
          });
          this.updataLists()
        }).catch(error => {
          this.$message({
            type: 'warning',
            message: '查询失败!'
          });
        })
      },
      // 添加
      addStatic() {
        this.$store.dispatch('addRole', {
          status: (this.form.status == true ? 1 : 2),
          appKey: this.form.appKey,
          name: this.form.name,
          roleCode: this.form.roleCode,
          description: this.form.description
        }).then(() => {
          this.$message({
            message: this.form.name + ' - 添加成功',
            type: 'success'
          })
          this.searchFrom.rules = this.form.appKey
          this.upApp()
          this.form = {
            status: true
          }
          this.dialogTableVisible = false;
          this.pullData()
        })
      },
      // 删除
      confirmDel(row) {
        this.$confirm('此操作将永久删除用户：' + row.name + ' , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deletAuthRole', {
            id: row.id
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.upApp()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 取消修改
      cancelEdit(row) {
        row.title = row.originalTitle
        row.edit = false
      },
      // 修改
      confirmEdit(row) {
        // 编辑App内容
        this.$store.dispatch('updateRole', {
          id: row.id,
          status: (row.switch ? 1 : 2),
          appKey: row.appKey,
          roleCode: row.roleCode,
          name: row.name,
          description: row.description
        }).then(() => {
          // 编辑完成后关闭选项卡并提示
          row.edit = false
          row.originalTitle = row.title
          this.$message({
            message: row.appKey + '修改成功',
            type: 'success'
          })
          this.upApp()
        }).catch(() => {
          alert("error")
        })

      },
      // 循环更新列表
      updataLists() {
        console.log(this.$store.state.userManager, "查看变化")
        this.tableData = this.$store.state.userManager.userTable.map(row => {
          return {
            originalTitle: row.account,
            account: row.account,
            // accountExpired 该账号是否过期 0 不过 1 过
            accountExpired: row.accountExpired,
            // accountLocked 该账号是上锁 0 不锁 1 锁
            accountLocked: row.accountLocked,
            authLevel: row.authLevel,
            // credentialsExpired凭证是否过期 0 不过 1过
            credentialsExpired: row.credentialsExpired,
            defaultOrg: row.defaultOrg,
            switch: (row.status == 1 ? true : false),
            status: row.status,
            edit: false,
            defaultPosition: row.defaultPosition,
            defaultRole: row.defaultRole,
            id: row.id,
            openId: row.openId,
            password: "请输入要修改的密码",
            salt: row.salt,

          }
        })
      },
      // 查询
      pullData() {

      }
    },
    watch: {
      checkboxVal(valArr) {
        this.formThead = this.formTheadOptions.filter(
          i => valArr.indexOf(i) >= 0
        );
        this.key = this.key + 1;
      }
    }
  };

</script>
<style scoped lang="scss">
  .el-tag {
    margin-left: 6px;
    cursor: pointer;
  }

  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }

  .kingMon-right {
    margin-right: 8px;
  }

  .panel-group {
    margin-top: 18px;
    .card-panel-col {
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3;
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3;
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

</style>
