<template>
  <div>
    <el-dialog v-el-drag-dialog title="学生所属分配" :visible.sync="preDialogTableVisible">
      <el-form ref="form" :model="permissionTab" label-width="120px" style="width: 90%;margin: auto;">
        <el-transfer style="text-align: left; display: inline-block" v-model="value1" filterable :titles="['未拥有', '已拥有']" :button-texts="['移除', '加入']"
          :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" @change="handleChange" :data="dataStudent">
        </el-transfer>
      </el-form>
    </el-dialog>

    <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
      <el-table-column v-if="columns.length===0" width="140">
        <template slot-scope="scope">
          <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
            <i v-else class="el-icon-minus"></i>
          </span>
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
        <template slot-scope="scope">
          <div v-if='index < 4'>
            <!-- <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span> -->
            <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
              <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
              <i v-else class="el-icon-minus"></i>
            </span>
            <el-tag v-if="scope.row.edit  == false">{{scope.row[column.value]}}</el-tag>
            <el-input v-else size="small" v-model="scope.row[column.value]"></el-input>
          </div>
          <div v-if='index == 4'>
            <el-button type="primary" size="small" @click='task(scope.row)' icon="el-icon-edit">分配学生</el-button>
          </div>
          <div v-if='index == 5'>
            <el-button v-if="scope.row.edit" data-auth='sysOrganization:updateSysOrganization' v-dirAuth type="success" size="small"
              @click="commit(scope.row)" icon="el-icon-circle-check-outline">确认</el-button>
            <el-button v-if="scope.row.edit" type="danger" data-auth='sysOrganization:deletSysOrganization' v-dirAuth size="small" @click="deletes(scope.row)"
              icon="el-icon-circle-check-outline">删除</el-button>
            <el-button v-if="scope.row.edit" size="small" icon="el-icon-refresh" type="warning">取消</el-button>
            <el-button v-else type="primary" size="small" @click='scope.row.edit=!scope.row.edit' icon="el-icon-edit">编辑</el-button>
          </div>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
  /**
                                    Auth: Lei.j1ang
                                    Created: 2018/1/19-13:59
                                  */
  import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
  import * as api from '@/api/announcement' // base on element-ui
  import treeToArray from './eval'
  import {
    AuthRequest
  } from "@/utils/requestMethod";
  export default {
    name: 'treeTable',
    data() {
      return {
        preDialogTableVisible: false,
        permissionTab: {},
        value1: [],
        dataStudent: [],
        havs: [],
        nowOrg: {}
      }
    },
    directives: {
      elDragDialog
    },
    props: {
      data: {
        type: [Array, Object],
        required: true
      },
      columns: {
        type: Array,
        default: () => []
      },
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: Boolean,
        default: false
      }
    },
    created() {},
    computed: {
      // 格式化数据源
      formatData: function () {
        let tmp
        if (!Array.isArray(this.data)) {
          tmp = [this.data]
        } else {
          tmp = this.data
        }
        const func = this.evalFunc || treeToArray
        const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
        return func.apply(null, args)
      }
    },
    methods: {
      deletes(s) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        AuthRequest({
          event,
          ...s
        }).then(req => {
          console.log(req)
          if (req.data.statusCode == 200) {
            loading.close();
            this.$parent.SysOrganizationList()
          }
        }).catch(err => {
          loading.close();
        })
      },
      commit(s) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        AuthRequest({
          event,
          ...s
        }).then(req => {
          console.log(req)
          if (req.data.statusCode == 200) {
            loading.close();
            this.$parent.SysOrganizationList()
          }
        }).catch(err => {
          loading.close();
        })
      },
      // 移除
      handleChange(s, direction, movedKeys) {
        console.log(s, direction, movedKeys)
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (direction == 'left') {
          if (movedKeys.length > 1) {
            var remove = []
          } else {
            var remove = ''
          }
          this.dataStudent.map(s => {
            if (movedKeys.length > 1) {
              movedKeys.map(vs => {
                if (vs == s.id) {
                  console.log(s.id)
                  remove.push(s.id)
                }
              })
            }
            if (s.id == movedKeys) {
              remove = s.id
            }
          })
          api.removeStudentFromOrganization({
            userIds: remove.toString(),
            orgId: this.nowOrg.id
          }).then(s => {
            loading.close();
          }).catch(err => {
            loading.close();
          })
        } else {
          console.log(movedKeys.length)
          if (movedKeys.length > 1) {
            var add = []
          } else {
            var add = ''
          }
          this.dataStudent.map(s => {
            if (movedKeys.length > 1) {
              movedKeys.map(vs => {
                if (vs == s.id) {
                  console.log(s.id)
                  add.push(s.id)
                }
              })
            }
            if (s.id == movedKeys) {
              add = s.id
            }
          })
          api.addStudentToOrganization({
            userIds: add.toString(),
            orgId: this.nowOrg.id
          }).then(s => {
            loading.close();
          }).catch(err => {
            loading.close();
          })
        }
      },
      search(vs) {
        this.nowOrg = vs
        api.loadStudentInOrNoOrganization({
          orgId: vs.id,
          // 0 在 1不在
          mode: 0
        }).then(s => {
          this.havs = s.data.data.list.map(s => {
            this.value1.push(s.id)
            return {
              ...s,
              key: s.id,
              label: s.name,
            }
          })
          console.log(this.value1)
          api.loadStudentInOrNoOrganization({
            orgId: vs.id,
            // 0 在 1不在
            mode: 1
          }).then(s => {
            this.dataStudent = [...this.havs.map(s => {
              return {
                ...s,
                key: s.id,
                label: s.name,
              }
            }), ...s.data.data.list.map(s => {
              return {
                ...s,
                key: s.id,
                label: s.name,
              }
            })]
          })
        })
      },
      task(s) {
        console.log(s)
        this.preDialogTableVisible = true
        this.search(s)
      },
      test(s) {
        console.log(s);
      },
      showRow: function (row) {
        const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
        row.row._show = show
        return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
      },
      // 切换下级是否展开
      toggleExpanded: function (trIndex) {
        const record = this.formatData[trIndex]
        record._expanded = !record._expanded
      },
      // 图标显示
      iconShow(index, record) {
        return (index === 0 && record.children && record.children.length > 0)
      }
    }
  }

</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }

  .processContainer {
    width: 100%;
    height: 100%;
  }

  table td {
    line-height: 26px;
  }

  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }

</style>
