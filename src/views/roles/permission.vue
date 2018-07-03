<template>
  <div class="app-container">
    <div class="filter-container">
      <el-dialog v-el-drag-dialog title="新增模块" :visible.sync="dialogTableVisible">
        <el-form ref="form" :model="form" label-width="100px" style="width: 90%;margin: auto;">
          <!-- <el-form-item label="所属appKey">
            <el-select v-model="form.appKey" clearable style="width:200px;" placeholder="选择App类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="节点名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="节点状态">
            <el-switch v-model="form.status"></el-switch>
          </el-form-item>
          <el-form-item label="节点码">
            <el-input type="textarea" v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="test">立即创建</el-button>
            <el-button @click="dialogTableVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- @node-click="moreTrees" -->
      <label style="margin-right: 12px;font-weight: 100;">输入查找节点</label>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-bottom: 12px; width: 350px;">
        <el-button type="primary" @click="searchsDom">点击搜索</el-button>
      </el-input>
      <!-- 权限显示 -->
      <el-table :data="tableData" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
        <el-table-column class-name="status-col" label="权限ID" width="110">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="权限名称" width="210">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input size="small" v-model="scope.row.name"></el-input>
            </template>
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="permCode" width="110">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input size="small" v-model="scope.row.permCode"></el-input>
            </template>
            <span v-else>{{scope.row.permCode}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="type" width="110">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input size="small" v-model="scope.row.type"></el-input>
            </template>
            <span v-else>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="权限地址" width="110">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input size="small" v-model="scope.row.url"></el-input>
            </template>
            <span v-else>{{scope.row.url}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="权限所属" width="110">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select class="kingMon-right" v-model="searchs.appKey" clearable style="width: 100%;" placeholder="选择App类型">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{scope.row.appName}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="权限状态" width="110">
          <template slot-scope="scope">
            <div v-if="!scope.row.edit">
              <el-tag v-if="scope.row.status == 1">开启</el-tag>
              <el-tag v-else type="danger">关闭</el-tag>
            </div>
            <el-switch v-else v-model="scope.row.switch"></el-switch>
          </template>
        </el-table-column>

        <el-table-column min-width="50px" label="权限描述">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input size="small" v-model="scope.row.description"></el-input>
            </template>
            <span v-else>{{ scope.row.description }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="50px" label="isCommon">
          <template slot-scope="scope">
            <div v-if="!scope.row.edit">
              <el-tag v-if="scope.row.isCommon == true">开启</el-tag>
              <el-tag v-else type="danger">关闭</el-tag>
            </div>
            <el-switch v-else v-model="scope.row.isCommon"></el-switch>
          </template>
        </el-table-column>

        <el-table-column min-width="50px" label="moduleId">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input size="small" v-model="scope.row.moduleId"></el-input>
            </template>
            <span v-else>{{ scope.row.moduleId }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions" width="300">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确认</el-button>
            <el-button v-if="scope.row.edit" type="danger" @click="confirmDel(scope.row)" size="small" icon="el-icon-circle-check-outline">删除</el-button>
            <el-button v-if="scope.row.edit" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
            <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
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
      <!-- 左侧选择最高权限 -->


    </div>
  </div>
</template>

<script>
  const defaultFormThead = ["appKey", "status", "remark"];
  import elDragDialog from '@/directive/el-dragDialog' // base on element-ui

  export default {
    name: "permission",
    directives: {
      elDragDialog
    },
    data() {
      return {
        // 节点查询
        options: "",
        // 代理节点
        testss: {},
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeNow: [-1],
        // 动态子集
        childrens: [],
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

    methods: {
      searchsDom() {

      },
      // 节点内查找
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // 删除节点
      deletDom(data) {

        this.$confirm('此操作将永久删除' + data.label + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteSysOrg', {
            id: data.id
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.upApp()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      append(data) {
        this.dialogTableVisible = true;
        this.testss = data
      },
      test() {
        this.$store.dispatch('createSysOrg', {
          status: (this.form.status ? 1 : 0),
          name: this.form.name,
          code: this.form.code,
          parentId: this.testss.id
        }).then(() => {
          this.$message({
            type: 'success',
            message: '增加成功!'
          });
          this.dialogTableVisible = false;
          this.upApp()
        }).catch(() => {})
      },

      // 下级查询
      moreTrees(val) {
        return
        console.log(val)
        this.listLoading = true;
        this.$store.dispatch('loadMore', {
          id: val.id,
        }).then(() => {
          // this.addDataLists(val)
          val.children = this.$store.state.sysOrg.Nows.map(row => {
            return {
              id: row.id,
              label: row.name,
              parentId: row.parentId
            }
          })
          console.log(val, this.tableData)
          this.listLoading = false
        }).catch(() => {})
      },
      // 点击增加
      addDataLists(data) {
        data.children = this.$store.state.sysOrg.Nows.map(row => {
          return {
            id: row.id,
            label: row.name,
            parentId: row.parentId
          }
        })
        this.tableData = this.tableData.map(rows => {
          if (rows.id == this.childrens[0].parentId) {
            let btc = this.childrens
            return {
              id: rows.id,
              label: rows.label,
              children: [...btc]
            }
          }
        })

        let btc = this.childrens

        // this.tableData = this.tableData.map(rows => {
        //   console.log(rows.id)
        //   if(rows.id == this.childrens[0].parentId){
        //     return {
        //       id: rows.id,
        //       label :rows.label,
        //       children: [...btc]
        //     }
        //   }
        // })
      },
      // 查询所有权限
      upApp() {
        this.listLoading = true;
        this.$store.dispatch('loadAuthPermissionList', {
          params: 1,
        }).then(() => {
          this.updataLists()
          this.$store.dispatch('loadAuthAppList', 1).then(() => {
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
          this.listLoading = false
        }).catch(() => {})
      },
      // 分页改动
      handleCurrentChange() {

      },
      handleSizeChange() {

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
        console.log(row)
        // 编辑App内容
        this.$store.dispatch('updatePermission', {
          ...row,
          status: (row.switch ? 1 : 2)
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
          this.upApp()
        })
      },
      // 循环更新列表
      updataLists() {
        this.tableData = this.$store.state.PermissionRoles.Permission.map(row => {
          return {
            ...row,
            edit: false,
            switch: (row.status == 1 ? true : false)
          }
        })
        console.log(this.tableData)
      },
      // 查询
      pullData() {

      }
    },
    watch: {
      filterText(val) {
        this.$refs.trees.filter(val);
      },
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
