<template>
  <div class="dashboard-editor-container">

    <panel-group :base="base"></panel-group>

    <div>
 
    </div>

    <h2 style="font-weight: none;font-size: 16px;margin: 12px 0px;"> 今日到校学生</h2>
<template>
  <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
    <el-table-column prop="date" label="学生ID" >
      <template slot-scope="scope">
        <span>{{scope.row.id}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="学生学号" >
      <template slot-scope="scope">
        <span>{{scope.row.schoolNumber}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="学生姓名" >
      <template slot-scope="scope">
        <span>{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="来校方式" >
      <template slot-scope="scope">
        <span>{{KeysSchool.sys_coming.children[scope.row.MODE]}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="所属院系" >
      <template slot-scope="scope">
        <span>{{scope.row.collegeName}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="所属专业" >
      <template slot-scope="scope">
        <span>{{scope.row.majorName}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="学生年级" >
      <template slot-scope="scope">
        <span>{{KeysSchool.sys_grade.children[scope.row.grade]}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="学生班级" >
      <template slot-scope="scope">
        <span>{{scope.row.classes}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
    <h2 style="font-weight: none;font-size: 16px;margin: 12px 0px;"> 军训服装列表</h2>

   <el-table :data="tableDatas"  border fit highlight-current-row style="width: 100%">
      <el-table-column class-name="status-col" label="ID" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="学生学号" width="120">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.schoolNumber"></el-input>
          </template>
          <span v-else>{{scope.row.schoolNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="学生姓名">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.name"></el-input>
          </template>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
    <el-table-column class-name="status-col" label="年级">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.grade"></el-input>
          </template>
          <span v-else>{{KeysSchool.sys_grade.children[scope.row.grade]}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="类别">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.type"></el-input>
          </template>
          <span v-else>{{KeysSchool.sys_clothing.children[scope.row.type]}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="尺码">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.size"></el-input>
          </template>
          <span v-else>{{KeysSchool.sys_type_clothes.children[scope.row.size]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import TodoList from "./components/TodoList";
import BoxCard from "./components/BoxCard";
import { mapGetters } from 'vuex'
export default {
  name: "dashboard-admin",
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      tableData: [],
      tableDatas: [],
      base: {
        loan: 0,
        reports: 0
      }
    };
  },
  computed: {
    ...mapGetters([
      'KeysSchool'
    ])
  },
  created() {
    this.cominglist();
    this.search();
  },
  methods: {
    search() {
      this.$store.dispatch("loadBizComeSchoolModeDataSetToDays").then(req => {
        this.tableData = req.data.dataSet.rows;
        this.base = {
          loan: req.data.loan,
          reports: req.data.reports
        };
      });
      this.$store.dispatch("clothing", this.tes).then(req => {
        console.log(req)
        this.tableDatas = req.data.data.dataSet.dataSet.rows.map(
          row => {
            return {
              ...row,
              edit: false
            };
          }
        );
      });
    },
    async cominglist() {
      await this.$store.dispatch("coming", this.tes).then(req => {
        console.log(req, "xxxxxxx");
        this.tableData = this.$store.state.student.studentList.data.dataSet.rows.map(
          row => {
            return {
              ...row,
              edit: false
            };
          }
        );
        console.log(this.tableData);
      });
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
