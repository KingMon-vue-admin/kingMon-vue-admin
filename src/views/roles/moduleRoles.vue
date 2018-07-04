<template>
  <div class="app-container">
    <div class="filter-container">

      <el-dialog v-el-drag-dialog title="新增模块" :visible.sync="dialogTableVisible">
        <el-form ref="form" :model="form" label-width="100px" style="width: 90%;margin: auto;">
          <el-form-item label="所属appKey">
            <el-select v-model="form.appKey" clearable style="width:200px;" placeholder="选择App类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模块代号">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="模块父级">
            <el-input v-model="form.parentId"></el-input>
          </el-form-item>
          <el-form-item label="模块名称">
            <el-input v-model="form.appName"></el-input>
          </el-form-item>
          <el-form-item label="模块开启状态">
            <el-switch v-model="form.status"></el-switch>
          </el-form-item>
          <el-form-item label="模块索引值">
            <el-input-number v-model="form.disIndex"></el-input-number>
          </el-form-item>
          <el-form-item label="模块域">
            <el-input v-model="form.appDomain"></el-input>
          </el-form-item>
          <el-form-item label="模块备注">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addStatic">立即创建</el-button>
            <el-button @click="dialogTableVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 顶部操作框 -->
      <el-select class="kingMon-right" v-model="searchs.appKey" clearable style="width: 160px;" placeholder="选择App类型">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input size="small" class="kingMon-right" v-model="searchs.name" style="width: 200px;height: 35px;" placeholder="输入AppKey查询"></el-input>
      <el-button class="kingMon-right" type="primary" icon="el-icon-search" @click="searchApp">搜索</el-button>
      <el-button class="kingMon-right" type="primary" icon="el-icon-edit" style="margin-left: 0px;" @click="dialogTableVisible = true">添加</el-button>
      <!-- 左侧选择最高权限 -->
      <el-select @change="test" class="kingMon-right" v-model="searchFrom.rules" clearable style="width: 160px;float: right;" placeholder="选择App类型">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table :data="tableData" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column class-name="status-col" label="模块ID" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="模块名称" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.name"></el-input>
          </template>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="模块代号" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.code"></el-input>
          </template>
          <span v-else>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="模块父级" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.parentId"></el-input>
          </template>
          <span v-else>{{scope.row.parentId}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="模块状态" width="80">
        <template slot-scope="scope">
          <div v-if="!scope.row.edit">
            <el-tag v-if="scope.row.status == 1">开启</el-tag>
            <el-tag v-else type="danger">关闭</el-tag>
          </div>
          <el-switch v-else v-model="scope.row.switch"></el-switch>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="模块所属App">
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
      <el-table-column min-width="100px" label="模块排列顺序">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.disIndex"></el-input>
          </template>
          <span v-else>{{ scope.row.disIndex }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="模块备注">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.remark"></el-input>
          </template>
          <span v-else>{{ scope.row.remark }}</span>
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
    name: "moduleRoles",
    directives: {
      elDragDialog
    },
    data() {
      return {
        pages: 1,
        rows: 12,
        // 分页总和
        total: 0,
        // 默认分页
        currentPage2: 1,
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
        formThead: defaultFormThead // 默认表头 Default header
      };
    },
    created() {
      this.upApp()
    },
    computed: {
      //   tableData (){
      //       return1 
      //   }  
    },
    methods: {
      // 选择循环列表
      test(val, page = 1, rows = 12) {
        this.nowApps = val
        this.listLoading = true;
        this.$store.dispatch('loadAuthModuleList', {
          params: 1,
          appKey: val,
          page: page,
          rows: rows
        }).then(req => {
          console.log(req)
          this.total = req.data.total
          this.updataLists()
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      // 刷新当前显示权限模块
      reloadNows(_this) {
        let appKeys
        if (_this) {
          appKeys = _this
        } else {
          appKeys = this.nowApps
        }
        console.log(this.pages, "当前页数")
        this.listLoading = true;
        this.$store.dispatch('loadAuthModuleList', {
          params: 1,
          appKey: appKeys,
          page: this.pages,
          rows: this.rows
        }).then(() => {
          this.updataLists()
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      // 查询所有权限
      upApp() {
        this.$store.dispatch('loadAuthAppListModules', 1).then(req => {
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
      },
      // 分页改动
      handleCurrentChange(val) {
        this.pages = val
        this.test(this.nowApps, this.pages, this.rows)
      },
      // 改动总页数
      handleSizeChange(val) {
        this.rows = val
        this.test(this.nowApps, this.pages, this.rows)
      },
      // 查询
      searchApp() {
        this.$store.dispatch('loadAuthModuleList', this.searchs).then(() => {
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
        this.$store.dispatch('addAuthModule', {
          status: (this.form.status == true ? 1 : 2),
          appKey: this.form.appKey,
          name: this.form.appName,
          disIndex: this.form.disIndex,
          remark: this.form.remark,
          parentId: this.form.parentId,
          code: this.form.code
        }).then(() => {
          this.$message({
            message: this.form.appName + ' - 添加成功',
            type: 'success'
          })
          this.searchFrom.rules = this.form.appKey
          this.reloadNows(this.form.appKey)
          this.form = {
            status: true
          }
          this.dialogTableVisible = false;
          this.pullData()
        })
      },
      // 删除
      confirmDel(row) {
        this.$confirm('此操作将永久删除' + row.appKey + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deletAuthModule', {
            id: row.id
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.reloadNows()
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
        this.$store.dispatch('updateAuthModuleChange', row).then(() => {
          // 编辑完成后关闭选项卡并提示
          row.edit = false
          row.originalTitle = row.title
          this.$message({
            message: row.appKey + '修改成功',
            type: 'success'
          })
          this.reloadNows()
          this.pullData()
        }).catch(error => {
          console.log(error)
        })

      },
      // 循环更新列表
      updataLists() {
        console.log(this.$store.state.modules.ModulesList, "console.log")
        this.tableData = this.$store.state.modules.ModulesList.map(row => {
          return {
            id: row.id,
            code: row.code,
            name: row.name,
            originalTitle: row.appKey,
            appKey: row.appKey,
            status: row.status,
            parentId: row.parentId,
            edit: false,
            remark: row.remark,
            disIndex: row.disIndex,
            switch: (row.status == 1 ? true : false)
          }
        })
      },
    },
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
