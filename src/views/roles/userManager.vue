<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 修改权限 -->
      <el-dialog v-el-drag-dialog title="用户权限设置" :visible.sync="preDialogTableVisible">
        <el-form ref="form" :model="permissionTab" label-width="120px" style="width: 90%;margin: auto;">
          <el-form-item label="当前用户名称：">
            <el-tag>{{permissionTab.account}}</el-tag>
          </el-form-item>
          <el-form-item label="当前用户ID：">
            <el-tag>{{permissionTab.id}}</el-tag>
          </el-form-item>
          <!-- {{form}} -->
          <el-form-item label="选择App：">
            <el-select v-if="!Apps" class="kingMon-right" v-model="permissionTab.rules" @change="searchPrems" clearable style="width: 160px;"
              placeholder="选择App类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-tag v-else>{{this.Apps.appKey}}</el-tag>
          </el-form-item>
          <el-form-item label="角色操作：">
            <el-transfer style="text-align: left; display:block;margin: auto; " v-model="value1" filterable :left-default-checked="[2, 3]"
              :right-default-checked="[1]" :render-content="renderFunc" :titles="['未拥有的权限', '已拥有的权限']" :button-texts="['删除权限', '增加权限']"
              @change="handlePremsChange" :data="userPremsConfig.all">
              <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button> -->
            </el-transfer>
          </el-form-item>

          <!-- 所有角色 -->
          <!-- <el-form-item label="已拥有角色">
            <el-tag v-if="userRolesConfig.yes != undefined" v-for="tag in userRolesConfig.yes" :key="tag.name" closable :type="tag.type"
              @close="handleClose(tag)">
              {{tag.name}}
            </el-tag>
            <span v-if="userRolesConfig.yes == undefined">请先选择App</span>
            <span v-if="userRolesConfig.yes != undefined && userRolesConfig.yes.length == 0">该用户暂无角色</span>
          </el-form-item>
          <el-form-item label="未拥有角色">
            <el-tag v-for="tag in userRolesConfig.no" :key="tag.name" :type="tag.type">
              <span @click="addSelf(tag)">{{tag.name}}</span>
            </el-tag>
            <span v-if="userRolesConfig.yes == undefined">请先选择App</span>
            <span v-if="userRolesConfig.no != undefined && userRolesConfig.no.length == 0">该App下暂无角色</span>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" style="margin-top: 24px;" @click="preDialogTableVisible = false">关闭</el-button>
            <!-- <el-button @click="dialogTableVisible = false">关闭</el-button> -->
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 修改角色 -->
      <el-dialog v-el-drag-dialog title="用户角色设置" :visible.sync="dialogTableVisible">
        <el-form ref="form" :model="form" label-width="120px" style="width: 90%;margin: auto;">
          <el-form-item label="当前用户名称：">
            <el-tag>{{form.account}}</el-tag>
          </el-form-item>
          <el-form-item label="当前用户ID：">
            <el-tag>{{form.id}}</el-tag>
          </el-form-item>
          <!-- {{form}} -->
          <el-form-item label="选择App：">
            <el-select v-if="!Apps" class="kingMon-right" v-model="form.rules" @change="searchAppRoles" clearable style="width: 160px;"
              placeholder="选择App类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-tag v-else>{{this.Apps.appKey}}</el-tag>
          </el-form-item>
          <el-form-item label="角色操作：">
            <el-transfer style="text-align: left; display:block;margin: auto; " v-model="value3" filterable :left-default-checked="[2, 3]"
              :right-default-checked="[1]" :render-content="renderFunc" :titles="['未拥有角色', '已拥有角色']" :button-texts="['删除角色', '增加角色']"
              @change="handleChange" :data="userRolesConfig.all">
              <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button> -->
            </el-transfer>
          </el-form-item>

          <!-- 所有角色 -->
          <!-- <el-form-item label="已拥有角色">
            <el-tag v-if="userRolesConfig.yes != undefined" v-for="tag in userRolesConfig.yes" :key="tag.name" closable :type="tag.type"
              @close="handleClose(tag)">
              {{tag.name}}
            </el-tag>
            <span v-if="userRolesConfig.yes == undefined">请先选择App</span>
            <span v-if="userRolesConfig.yes != undefined && userRolesConfig.yes.length == 0">该用户暂无角色</span>
          </el-form-item>
          <el-form-item label="未拥有角色">
            <el-tag v-for="tag in userRolesConfig.no" :key="tag.name" :type="tag.type">
              <span @click="addSelf(tag)">{{tag.name}}</span>
            </el-tag>
            <span v-if="userRolesConfig.yes == undefined">请先选择App</span>
            <span v-if="userRolesConfig.no != undefined && userRolesConfig.no.length == 0">该App下暂无角色</span>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" style="margin-top: 24px;" @click="dialogTableVisible = false">关闭</el-button>
            <!-- <el-button @click="dialogTableVisible = false">关闭</el-button> -->
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

      <el-table-column class-name="status-col" label="用户账号" width="150">
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
            <el-tag v-if="scope.row.accountExpired == 0">未过期</el-tag>
            <el-tag v-else type="danger">已过期</el-tag>
          </div>
          <el-switch v-else v-model="scope.row.accountExpired"></el-switch>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否上锁" width="100">
        <template slot-scope="scope">
          <div v-if="!scope.row.edit">
            <el-tag v-if="scope.row.accountLocked == 0">未上锁</el-tag>
            <el-tag v-else type="danger">已上锁</el-tag>
          </div>
          <el-switch v-else v-model="scope.row.accountLocked"></el-switch>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="账户等级" width="170">
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
            <el-tag v-if="scope.row.credentialsExpired == 0">未过期</el-tag>
            <el-tag v-else type="danger">已过期</el-tag>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="用户组织" width="150">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="form.appKey" clearable style="width:100%;" placeholder="分配组织">
              <el-option v-for="item in orgListSelect" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{orgList["'" + scope.row.defaultOrg + "'"]}}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column class-name="status-col" label="用户职位" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.defaultPosition"></el-input>
          </template>
          <span v-else>{{scope.row.defaultPosition}}</span>
        </template>
      </el-table-column> -->
      <el-table-column class-name="status-col" label="用户角色" width="150">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-button type="primary" @click="opens(scope.row)">修改角色</el-button>
          </template>
          <!-- <span v-else>{{userRoles[scope.row.defaultRole]}}</span> -->
          <span v-else>{{`可编辑角色`}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="用户权限" width="150">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <!-- loadPermDataSetForUserAssign -->
            <el-button type="primary" @click="opensPrems(scope.row)">修改权限</el-button>
          </template>
          <span v-else>{{`可编辑权限`}}</span>
        </template>
      </el-table-column>
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
          <!-- <el-button v-if="scope.row.edit" type="danger" @click="confirmDel(scope.row)" size="small" icon="el-icon-circle-check-outline">删除</el-button> -->
          <el-button v-if="scope.row.edit" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2"
      :page-sizes="[12, 15, 20, 25]" layout="sizes, prev, pager, next" :total="total" style="margin-top: 24px;">
    </el-pagination>
    <!-- <el-upload
  class="upload-demo"
  action="http://127.0.0.1:9527/base/baseFiles/uploadFiles"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload> -->
    <!-- /base/baseFiles/uploadFiles -->
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
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
        fileList: [],
        // 权限修改
        value1: [],
        userPremsConfig: {},
        // 权限修改内容
        permissionTab: {},
        // 权限修改
        preDialogTableVisible: false,
        value3: [],
        renderFunc(h, option) {
          return <span > {
            option.label
          } </span>;},
          // 分页总和
          total: 0,
            // 默认分页
            currentPage2: 1,
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
          // 查看用户是否admin
          ...mapGetters([
            'Apps'
          ])
        },
        methods: {
          handlePremsChange(value, direction, movedKeys) {
            if (direction == 'left') {
              this.$store.dispatch('removePremsFromUser', {
                permIds: movedKeys.toString(),
                userId: this.permissionTab.id
              }).then(() => {
                this.searchPrems()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch(err => {})
            } else {
              // 增加角色
              this.$store.dispatch('addPremsToUser', {
                permIds: movedKeys.toString(),
                userId: this.permissionTab.id
              }).then(() => {
                this.searchPrems()
                this.$message({
                  type: 'success',
                  message: '增加角色成功!'
                });
              })
            }
          },
          handleChange(value, direction, movedKeys) {
            if (direction == 'left') {
              this.$store.dispatch('removeRoleFromUser', {
                roleIds: movedKeys.toString(),
                userId: this.form.id
              }).then(() => {
                this.searchAppRoles()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch(err => {})
            } else {
              // 增加角色
              this.$store.dispatch('addRolesToUser', {
                roleIds: movedKeys.toString(),
                userId: this.form.id
              }).then(() => {
                this.searchAppRoles()
                this.$message({
                  type: 'success',
                  message: '增加角色成功!'
                });
              })
            }
          },
          // 设置用户权限极状态
          ViewUpdateSysPosition(val) {
            val.userIds = val.id
            val.status = (val.status ? 0 : 1)
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
          upApp(page = 1, rows = 12) {
            // 查询用户
            // this.$store.dispatch('loadOrgListX').then(() => {
            //   this.orgListSelect = this.$store.state.userManager.sysOrgs.data.map(row => {
            //     return {
            //       id: row.orgTreeCode,
            //       name: row.name
            //     }
            //   })
            //   for (var value of this.$store.state.userManager.sysOrgs.data) {
            //     this.orgList["'" + (value.orgTreeCode || 0) + "'"] = value.name
            //   }
              this.$store.dispatch('loadAuthUserList', {
                page: page,
                rows: rows
              }).then(req => {
                this.total = req.data.total
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
            // }).catch(err => {})
          },
          // 分页改动
          handleCurrentChange(val) {
            this.pages = val
            this.upApp(this.pages, this.rows)
          },
          // 改动总页数
          handleSizeChange(val) {
            this.rows = val
            this.upApp(this.pages, this.rows)
          },
          // 展开查看
          opens(s) {
            this.form = s
            if (!this.Apps) {
              this.$store.dispatch('loadAuthAppListManger', 1).then(req => {
                this.options = req.data.data.dataSet.rows.map(view => {
                  return {
                    value: view.appKey,
                    label: view.name
                  }
                })
                this.dialogTableVisible = true
                this.listLoading = false
              }).catch(() => {
                this.listLoading = false
              })
            } else {
              this.form.rules = this.Apps.appKey
              this.searchAppRoles()
            }
          },
          // 查询
          searchAppRoles() {
            this.$store.dispatch('loadRoleDataSetForUserAssign', {
              userId: this.form.id,
              appKey: this.form.rules,
            }).then(req => {
              this.userRolesConfig = req
              let alls = [...req.yes, ...req.no]
              this.userRolesConfig.all = alls.map(row => {
                return {
                  id: row.id,
                  key: row.id,
                  label: row.name,
                  roleCode: row.roleCode
                }
              })
              this.value3 = req.yes.map(row => {
                return row.id
              })
            }).catch(err => {
              console.log(err)
            })
          },
          // 查询
          searchPrems() {
            this.$store.dispatch('loadPermDataSetForUserAssign', {
              userId: this.permissionTab.id,
              appKey: this.permissionTab.rules,
            }).then(req => {
              console.log(req, "thisCallback")
              this.userRolesConfig = req
              let alls = [...req.yes, ...req.no]
              this.userPremsConfig.all = alls.map(row => {
                return {
                  id: row.id,
                  key: row.id,
                  label: row.name,
                  roleCode: row.roleCode
                }
              })
              this.value1 = req.yes.map(row => {
                return row.id
              })
            }).catch(err => {
              console.log(err)
            })
          },
          opensPrems(s) {
            this.permissionTab = s
            this.preDialogTableVisible = true
            if (!this.Apps) {
              this.$store.dispatch('loadAuthAppListManger', 1).then(req => {
                this.options = req.data.data.dataSet.rows.map(view => {
                  return {
                    value: view.appKey,
                    label: view.name
                  }
                })
                this.listLoading = false
              }).catch(() => {
                this.listLoading = false
              })
            } else {
              this.permissionTab.rules = this.Apps.appKey
              this.searchPrems()
            }

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
              this.listLoading = false
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
        },
        watch: {}
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
