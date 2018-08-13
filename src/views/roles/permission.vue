<template>
  <div class="app-container">
    <div class="filter-container">
      <el-dialog v-el-drag-dialog title="新增权限" :visible.sync="dialogTableVisible">
        <el-form ref="form" :model="form" label-width="100px" style="width: 90%;margin: auto;">
          <el-form-item label="权限名称">
            <el-input type="input" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="权限状态">
            <el-switch v-model="form.status"></el-switch>
          </el-form-item>
          <el-form-item label="permCode">
            <el-input v-model="form.permCode"></el-input>
          </el-form-item>
          <el-form-item label="所属应用">
            <el-select v-if="!Apps" clearable v-model="form.appKey" style="margin-bottom: 12px; width: 150px;" placeholder="所属应用">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-tag>{{form.appKey = Apps.appKey}}</el-tag>
          </el-form-item>
          <el-form-item label="所属模块">
            <el-cascader v-model="form.moduleId" :props="props" filterable :options="propsModule" @active-item-change="handleItemChange"
              style="width: 80%;"></el-cascader>
          </el-form-item>
          <el-form-item label="是否通用">
            <el-switch v-model="form.isCommon"></el-switch>
          </el-form-item>
          <el-form-item label="权限属性">
            <el-input type="input" v-model="form.type"></el-input>
          </el-form-item>
          <el-form-item label="权限地址">
            <el-input type="input" v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addPermission">立即创建</el-button>
            <el-button @click="dialogTableVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- @node-click="moreTrees" -->
      <span>条件查询权限：</span>
      <el-input placeholder="权限名称" v-model="searchs.name" style="margin-bottom: 12px; width: 150px;">
      </el-input>
      <el-input placeholder="permCode" v-model="searchs.permCode" style="margin-bottom: 12px; width: 150px;">
      </el-input>
      <el-input placeholder="模块ID" v-model="searchs.moduleId" style="margin-bottom: 12px; width: 150px;">
      </el-input>
      <el-select clearable v-model="searchs.status" style="margin-bottom: 12px; width: 150px;" placeholder="权限状态">
        <el-option v-for="item in [{value: 1, label: '开启'},{value: 2, label: '关闭'}]" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-if="!Apps" class="kingMon-right" v-model="searchs.appKey" clearable style="margin-bottom: 12px; width: 150px;"
        placeholder="所属App">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="searchsDom">点击搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="dialogTableVisible = true">添加权限</el-button>
      <!-- 权限显示 -->
      <el-table :data="tableData" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
        <el-table-column class-name="status-col" label="权限ID" width="70">
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
        <el-table-column min-width="50px" label="模块ID">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-cascader v-model="scope.row.where" :props="props" filterable :options="propsModule" @active-item-change="handleItemChange"></el-cascader>
            </template>
            <span v-else>{{ scope.row.moduleId }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="permCode" width="270">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input size="small" v-model="scope.row.permCode"></el-input>
            </template>
            <span v-else>{{scope.row.permCode}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="type" width="70">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input size="small" v-model="scope.row.type"></el-input>
            </template>
            <span v-else>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="权限地址" width="260">
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
              <el-select v-if="!Apps" class="kingMon-right" v-model="scope.row.appKey" clearable style="width: 100%;" placeholder="选择App类型">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-tag v-else>{{Apps.appKey}}</el-tag>
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
        <el-table-column min-width="50px" label="是否通用">
          <template slot-scope="scope">
            <div v-if="!scope.row.edit">
              <el-tag v-if="scope.row.isCommon == true">是</el-tag>
              <el-tag v-else type="danger">否</el-tag>
            </div>
            <el-switch v-else v-model="scope.row.isCommon"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编辑" width="300">
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
      <!-- <el-input size="small" class="kingMon-right" v-model="searchs.name" style="width: 200px;height: 35px;" placeholder="输入AppKey查询"></el-input> -->
      <!-- <el-select class="kingMon-right" v-model="searchFrom.rules" clearable style="width: 90px" placeholder="选择顺序">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select class="kingMon-right" v-model="searchFrom.rules" clearable style="width: 120px" placeholder="选择类型">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select> -->
      <!-- 左侧选择最高权限 -->


    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  const defaultFormThead = ["appKey", "status", "remark"];
  import elDragDialog from '@/directive/el-dragDialog' // base on element-ui

  export default {
    name: "permission",
    directives: {
      elDragDialog
    },
    data() {
      return {
        filterText: "",
        currentPage2: 1,
        // 总页数
        total: 1,
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
        formThead: defaultFormThead, // 默认表头 Default header
        pages: 1,
        rows: 12,
        searchs: {
          appKey: ""
        },
        // 定义格式
        props: {
          value: 'label',
          id: 'value',
          children: 'modules'
        },
        // 输出模块
        propsModule: ""
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
      searchsDom(e, page = 1, rows = 12) {
        this.$store.dispatch('loadAuthPermissionList', {
          ...this.searchs,
          params: 1,
          page: page,
          rows: rows
        }).then(req => {
          this.total = req.total
          this.updataLists()
        })
      },
      // 动态选择所属模块
      handleItemChange(val) {
        console.log(val)
        this.$store.dispatch('loadAuthModuleList', {
          appKey: (val[0].split("|"))[0].substr(3)
        }).then(req => {
          this.propsModule = this.propsModule.map(row => {
            row.modules = req.data.rows.map(li => {
              return {
                label: `ID: ${li.id} | 名称: ${li.name}`
              }
            })
            return row
          })
          console.log(req.data.rows, "jieguo")
        })
      },
      // 查询所有权限
      upApp(page = 1, rows = 12) {
        this.listLoading = true;
        this.$store.dispatch('loadAuthPermissionList', {
          params: 1,
          page: page,
          rows: rows
        }).then(req => {
          this.total = req.total
          this.updataLists()
          this.$store.dispatch('loadAuthAppListPermission', 1).then(req => {
            // 输出应用带模块
            this.propsModule = req.data.data.dataSet.rows.map(view => {
              return {
                label: `ID: ${view.appKey} | 名称: ${view.name}`,
                modules: []
              }
            })
            // 输出应用
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
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
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
      // 添加
      addStatic() {},
      // 删除
      confirmDel(row) {
        this.$confirm('此操作将永久删除用户：' + row.name + ' , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deletAuthPermission', {
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
        let locks = false;
          for (let key in row){
        console.log(row[key])
        if(row[key].length == 0){
          this.$message({
            type: "info",
            message: "所填项不能为空！"
          });
          locks = true
          break;
        }
      }
      if(locks) return
        if (row.where != undefined) {
          row.moduleId = ((row.where[row.where.length - 1].split('|'))[0]).substr(3)
        }
        // 编辑App内容
        console.log(row)
        this.$store.dispatch('updatePermission', {
          ...row,
          status: (row.switch ? 1 : 2),
        }).then(() => {
          // 编辑完成后关闭选项卡并提示
          row.edit = false
          row.originalTitle = row.title
          this.$message({
            message: row.name + ' - 修改成功',
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
      addPermission() {
        if (attributeCount(this.form) != 9) return this.$message({
            type: "info",
            message: "所填项不能为空！"
          });
        let Form = this.form
        Form.moduleId = ((this.form.moduleId[this.form.moduleId.length - 1].split('|'))[0]).substr(3)
        Form.status = (this.form ? 1 : 2)
        this.$store.dispatch('addPermission', Form).then(() => {
          this.$message({
            message: '权限' + this.form.name + ' - 增加成功',
            type: 'success'
          })
          this.dialogTableVisible = false
          this.form = {
            status: true
          }
        })

      }
    },
    watch: {

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
