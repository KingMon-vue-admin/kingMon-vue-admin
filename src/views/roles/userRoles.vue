<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 修改权限 -->
      <el-dialog v-el-drag-dialog title="用户权限设置" :visible.sync="preDialogTableVisible">
        <el-form ref="form" :model="permissionTab" label-width="120px" style="width: 90%;margin: auto;">
          <el-form-item label="当前用户名称：">
            <b>{{permissionTab.account}}</b>
          </el-form-item>
          <el-form-item label="当前用户ID：">
            <b>{{permissionTab.id}}</b>
          </el-form-item>
          <!-- {{form}} -->
          <el-form-item label="选择App：">
            <el-select class="kingMon-right" v-model="permissionTab.rules" @change="searchPrems" clearable style="width: 160px;" placeholder="选择App类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色操作：">
            <el-transfer style="text-align: left; display:block;margin: auto; " v-model="value1" filterable :left-default-checked="[2, 3]"
              :right-default-checked="[1]" :render-content="renderFunc" :titles="['未拥有角色', '已拥有角色']" :button-texts="['删除角色', '增加角色']"
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
      <!-- 新增角色 -->
      <el-dialog v-el-drag-dialog title="新增角色" :visible.sync="dialogTableVisible">
        <el-form ref="form" :model="form" label-width="100px" style="width: 90%;margin: auto;">
          <el-form-item label="所属appKey">
            <el-select v-model="form.appKey" clearable style="width:200px;" placeholder="选择App类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色code">
            <el-input v-model="form.roleCode"></el-input>
          </el-form-item>
          <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色开启状态">
            <el-switch v-model="form.status"></el-switch>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addStatic">立即创建</el-button>
            <el-button @click="dialogTableVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 顶部操作框 -->
      <el-select @change="test" class="kingMon-right" v-model="searchFrom.rules" clearable style="width: 160px;" placeholder="选择App类型">
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
      <el-table-column class-name="status-col" label="角色ID" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="角色名称" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.appName"></el-input>
          </template>
          <span v-else>{{scope.row.appName}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="所属角色名称" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.name"></el-input>
          </template>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="角色代号" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.roleCode"></el-input>
          </template>
          <span v-else>{{scope.row.roleCode}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="角色状态" width="100">
        <template slot-scope="scope">
          <div v-if="!scope.row.edit">
            <el-tag v-if="scope.row.status == 1">开启</el-tag>
            <el-tag v-else type="danger">关闭</el-tag>
          </div>
          <el-switch v-else v-model="scope.row.switch"></el-switch>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="角色权限描述" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.description"></el-input>
          </template>
          <span v-else>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="角色所属App">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.appKey" clearable style="width: 100%;" placeholder="选择App类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{ scope.row.appKey }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="50px" label="角色权限">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-button type="primary" @click="opensPrems(scope.row)">修改权限</el-button>
          </template>
          <span v-else>{{ `角色可编辑` }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设置" width="300">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确认</el-button>
          <el-button v-if="scope.row.edit" type="danger" @click="confirmDel(scope.row)" size="small" icon="el-icon-circle-check-outline">删除</el-button>
          <el-button v-if="scope.row.edit" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2"
      :page-sizes="[12, 15, 20, 25]" layout="sizes, prev, pager, next" :total="total" style="margin-top: 24px;">
    </el-pagination>
  </div>
</template>

<script>
  const defaultFormThead = ["appKey", "status", "remark"];
  import elDragDialog from '@/directive/el-dragDialog' // base on element-ui

  export default {
    name: "userRoles",
    directives: {
      elDragDialog
    },
    data() {
      return {
        // 权限修改
        value1: [],
        userPremsConfig: {},
        // 权限修改内容
        permissionTab: {},
        // 权限修改
        preDialogTableVisible: false,
        // 分页总数
        total: "",
        nowApps: "",
        // 默认页数
        currentPage2: 1,
        // 查询
        searchs: {},
        // 新增用戶
        form: {
          status: true
        },
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
      // 查询
      searchPrems() {
        console.log(this.permissionTab)
        this.$store.dispatch('loadPermDataSetForRoleAssign', {
          roleId: this.permissionTab.id,
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
      // 权限编辑
      handlePremsChange(value, direction, movedKeys) {
        if (direction == 'left') {
          this.$store.dispatch('removePermsFromRole', {
            permIds: movedKeys.toString(),
            roleId: this.permissionTab.id
          }).then(() => {
            this.searchPrems()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(err => {})
        } else {
          // 增加角色
          this.$store.dispatch('addPermsToRole', {
            permIds: movedKeys.toString(),
            roleId: this.permissionTab.id
          }).then(() => {
            this.searchPrems()
            this.$message({
              type: 'success',
              message: '增加角色成功!'
            });
          })
        }
      },
      // 角色权限编辑
      opensPrems(s) {
        this.$store.dispatch('loadAuthAppListManger', 1).then(req => {
          console.log(req.data.data.dataSet.rows)
          this.options = req.data.data.dataSet.rows.map(view => {
            return {
              value: view.appKey,
              label: view.name
            }
          })
          this.permissionTab.rules = ""
          this.userPremsConfig = {}
          this.preDialogTableVisible = true
          this.permissionTab = s
          this.listLoading = false
        }).catch(() => {
          alert("error")
        })
      },
      // 选择循环列表
      test(val) {
        this.listLoading = true;
        this.$store.dispatch('loadAuthRoleList', {
          params: 1,
          appKey: val
        }).then(() => {
          this.updataLists()
          this.listLoading = false
        }).catch(() => {
          alert("error")
        })
      },

      // 查询所有权限
      upApp(page = 1, rows = 12) {
        this.listLoading = true;
        this.$store.dispatch('loadAuthRoleList', {
          params: 1,
          page: page,
          rows: rows
        }).then(req => {
          this.total = req.total
          this.updataLists()
          this.$store.dispatch('loadAuthAppListApp', 1).then(req => {
            console.log(req)
            this.options = this.$store.state.roles.AppList.map(view => {
              return {
                value: view.appKey,
                label: view.name
              }
            })
            this.listLoading = false
          }).catch(() => {
            alert("error")
          })
        }).catch(() => {
          alert("errorX")
        })
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
        this.$confirm('此操作将永久删除角色：' + row.name + ' , 是否继续?', '提示', {
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
        this.tableData = this.$store.state.userRoles.UserList.map(row => {
          return {
            originalTitle: row.appKey,
            appKey: row.appKey,
            appName: row.appName,
            id: row.id,
            name: row.name,
            roleCode: row.roleCode,
            description: row.description,
            switch: (row.status == 1 ? true : false),
            status: row.status,
            edit: false,
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
