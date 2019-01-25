<template>
  <div>
    <page-title>{{ title }}</page-title>
    <el-row>类型：
      <el-select @change="changeType" v-model="value" placeholder="请选择" :filterable="true">
        <el-option
          v-for="(item,key,index) in MonitorPointType"
          :key="index"
          :label="item.MonitorPointType"
          :value="item.MonitorPointType">
        </el-option>
      </el-select>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table border :data="tableData" stripe style="width: 100%;margin-top: 20px;" :row-style="{height:'65px'}" @row-dblclick="rowDblclick">
            <template v-for="column in columns[value].columns">
              <el-table-column :key="column.field" v-if="!column.editor" :prop='column.field' :label='column.title' :min-width='column.width'></el-table-column>
              <el-table-column :key="column.field" v-else :prop='column.field' :label='column.title' :min-width='column.width'>
                <template slot-scope="scope">
                  <template v-if="!scope.row.editable">
                    <div style="width: 100%" @click="toggle(scope,scope.row[column.field])">{{ scope.row[column.field] }}</div>
                  </template>
                  <template v-else>
                    <el-select @change="changeRow($event, scope.row)" ref="mark" value-key="ThisMeasurementDate" v-model="value6">
                      <el-option v-for="(item,key,index) in date" :key="index" :label="item.ThisMeasurementDate" :value="item">
                      </el-option>
                    </el-select>
                  </template>
                </template>
              </el-table-column>
            </template>
          </el-table>
          <div class="pagination-container" style="margin-top: 20px;float: left;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.rows" layout="total, sizes, prev, pager, next, jumper" :total="Number(total)">
            </el-pagination>
          </div>
          <el-button v-if="btnFlag" style="margin-top: 20px;margin-left: 20px; float: right;" type="success" @click="upload()">提交审核</el-button>
          <el-button v-if="saveFlag" style="margin-top: 20px;float: right;" type="success" @click="save()">保存报表</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dbClickFalse:false,
      date: [],
      value6: '',
      tableData: [],
      params: {
        page: 1,
        rows: 10
      },
      changeRowArr:[],
      total: null,
      title: '',
      columns: {
          "水位": {
              title: "水位监测点数据汇总",
              columns: [
                  { field: 'MonitorPointPart', title: '测点部位', width:'60'},
                  { field: 'MeasurePointNum', title: '测点编号', width:'80'},
                  { field: 'InitialMeasureDate', title: '初测日期', width:'120'},
                  { field: 'InitialData', title: '初测水位高程(m)', width:'100' },
                  { field: 'TheLastMeasurementDate', title: '上次测试时间', width:'120' },
                  { field: 'TheLastData', title: '上次水位高程(m)', width:'120' },
                  { field: 'ThisMeasurementDate', title: '本次测试时间', width:'150',editor:true},
                  { field: 'ThisData', title: '本次水位高程(m)', width:'120' },
                  { field: 'WaterLevelChangeRate', title: '本次水位变化速率(mm/d)', width:'120' },
                  { field: 'TotalWaterLevelChange', title: '本次总水位变化(mm)', width:'120'},
                  { field: 'Notes', title: '备注', width:'60' }
              ],
              src: "NewReport_detail",
              name: "水位水准数据报表详情"
          },
          "液压水准": {
              title: "液压水准监测点数据汇总",
              columns: [
                  { field: 'MonitorPointPart', title: '测点部位', width: '60' },
                  { field: 'MeasurePointNum', title: '测点编号', width: '80' },
                  { field: 'TheLastMeasurementDate', title: '上次测试时间', width: '100' },
                  { field: 'TheLastTotalSedimentation', title: '上次累计沉降量(mm)', width: '100' },
                  { field: 'ThisMeasurementDate', title: '本次测试时间', width: '150',editor:true},
                  { field: 'ThisTotalSedimentation', title: '本次累计沉降量(mm)', width: '100' },
                  { field: 'ThisSedimentation', title: '本次沉降量(mm)', width: '100' },
                  { field: 'ThisSedimentationRate', title: '本次沉降速率(mm/d)', width: '100' },
                  { field: 'Notes', title: '备注', width: '100' }
              ],
              src: "NewReport_detail",
              name: "水位水准数据报表详情"
          },
          "深层水平位移": {
              title: "深层水平位移监测点数据汇总",
              columns: [
                  { field: 'MonitorPointPart', title: '测点部位', width: '100' },
                  { field: 'MeasurePointNum', title: '测点编号', width: '100' },
                  { field: 'TheLastMeasureDate', title: '上次测试时间', width: '100' },
                  { field: 'TheLastMaxTotalChanges', title: '上次累计最大水平位移(mm)', width: '100' },
                  { field: 'ThisMeasureDate', title: '本次测试时间', width: '100' },
                  { field: 'ThisMaxTotalChanges', title: '本次累计最大水平位移(mm)', width: '100' },
                  { field: 'ThisMaxTotalChangesDepth', title: '相应位移深度(m)', width: '100' },
                  { field: 'ThisMaxChanges', title: '本次最大水平位移增量(mm)', width: '100' },
                  { field: 'ThisMaxChangesDepth', title: '相应位移深度(m)', width: '100' },
                  { field: 'Notes', title: '备注', width: '100' }
              ],
              src: "NewReport_detail_DHD",
              name: "深层水平位移数据报表详情"
          },
          "钢支撑轴力": {
              title: "钢支撑轴力监测点数据汇总",
              columns: [
                  { field: 'MonitorPointPart', title: '测点部位', width: '110' },
                  { field: 'MeasurePointNum', title: '测点编号', width: '110' },
                  { field: 'Channel', title: '通道', width: '110' },
                  { field: 'TheLastMeasurementDate', title: '上次测试时间', width: '110' },
                  { field: 'TheLastAxialForce', title: '上次轴力值(kN)', width: '110' },
                  { field: 'ThisMeasurementDate', title: '本次测试时间', width: '150',editor:true},
                  { field: 'ThisAxialForce', title: '本次轴力值(kN)', width: '110' },
                  { field: 'ThisChanges', title: '变化量(kN)', width: '110' },
                  { field: 'Notes', title: '备注', width: '110' }
              ],
              src: "NewReport_detail_SSAF",
              name: "钢支撑轴力数据报表详情"
          },
          "混凝土支撑轴力": {
              title: "混凝土支撑轴力监测点数据汇总",
              columns: [
                  { field: 'MonitorPointPart', title: '测点部位', width: '130' },
                  { field: 'MeasurePointNum', title: '测点编号', width: '130' },
                  { field: 'TheLastMeasurementDate', title: '上次测试时间', width: '130' },
                  { field: 'TheLastTotalForce', title: '上次轴力值(kN)', width: '130' },
                  { field: 'ThisMeasurementDate', title: '本次测试时间', width: '150',editor:true },
                  { field: 'ThisTotalForce', title: '本次轴力值(kN)', width: '120' },
                  { field: 'ThisChanges', title: '变化量(kN)', width: '120' },
                  { field: 'Notes', title: '备注', width: '120' }
              ],
              src: "NewReport_detail_CSAF",
              name: "混凝土支撑轴力数据报表详情"
          }
      },
      MonitorPointType: null,
      value: '水位',
      changingIndex:null
    }
  },
  methods: {
    rowDblclick(row, event) {
      this.$router.push({
        path:'Report/'+this.columns[this.value].src,
        name: this.columns[this.value].name
      })
      sessionStorage.setItem("table",JSON.stringify(row));
      sessionStorage.setItem("type",this.value);
    },
    changeType(a) {
      this.loadData()
      this.title = this.value
    },
    changeRow(data,row){
      for(var i in data){
        row[i] = data[i]
      }
    },
    toggle(scope,data) {
      if(this.changingIndex != null){
        this.tableData[this.changingIndex].editable = false
      }
      this.changingIndex = scope.$index
      if(!this.saveFlag)
        return
      if(!this.changeRowArr.includes(scope.$index)){
        this.changeRowArr.push(scope.$index)
      }
      this.value6 = data
      let a = {
        type:this.value,
        id:scope.row.id
      }
      this.$api.post('report/selectDate', a).then( r => {
        this.date = r.data
        scope.row.editable = !scope.row.editable
        this.$nextTick(function(){
          this.$refs.mark[this.$refs.mark.length-1].$el.querySelector("input").click()
        })
      })
    },
    save() {
      if(this.changeRowArr.length == 0){
        this.$message({
          type: 'warning',
          message: '没有数据修改，所以不用保存'
        });
        return
      }
      var p = {
        type: this.value,
        data:[]
      }
      for(var i in this.changeRowArr){
        p.data.push(this.tableData[this.changeRowArr[i]])
      }
      p.data = JSON.stringify(p.data)
      this.$api.post('report/modifySummary', p).then( r => {
        this.loadData()
        this.$message({
          type: 'success',
          message: '保存成功'
        });
      })
    },
    upload() {
      this.$api.post('report/submitAudit', {reportID:this.$route.params.id}).then( r => {
        this.$message({
          type: 'success',
          message: '上传成功'
        });
        //跳转到历史报表
        this.$router.push({path:'Audit/HistoryReport',name: '历史报表'})
      })
    },
    loadData() {
      this.changeRowArr = []
      var v = this
      var p = {
        page :this.params.page,
        rows :this.params.rows,
        type: this.value,
        reportID: this.$route.params.id
      }
      this.$api.post('report/summary', p).then( r => {
        for(var i in r.rows){
          r.rows[i].editable = false
        }
        v.tableData = r.rows
        v.total = r.total
      })
    },
    handleSizeChange(val) {
      this.params.rows = val
      this.loadData()
    },
    handleCurrentChange (val){
      this.params.page = val
      this.loadData()
    }
  },
  computed: {
    btnFlag() {
      return JSON.parse(sessionStorage.getItem("c")).flag
    },
    saveFlag() {
      return this.value !== '深层水平位移'&&JSON.parse(sessionStorage.getItem("c")).page
    }
  },
  activated () {
    this.MonitorPointType = JSON.parse(sessionStorage.getItem("a"))
    this.loadData()
  },
  created () {
    this.MonitorPointType = JSON.parse(sessionStorage.getItem("a"))
    this.title = this.columns[this.MonitorPointType[0].MonitorPointType].title
    this.value = this.MonitorPointType[0].MonitorPointType
  }
}
</script>

<style scoped>

</style>