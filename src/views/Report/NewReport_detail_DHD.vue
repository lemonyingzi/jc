<template>
  <div>
    <page-title>{{ title }}</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table border :data="tableData" stripe style="width: 100%" :row-style="{height:'65px'}">
            <template v-for="column in columns1[value].columns">
              <el-table-column :key="column.field" :prop='column.field' :label='column.title' :min-width='column.width'></el-table-column>
            </template>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="16">
        <div>
          <el-table v-loading="loading" border :data="tableData1" stripe style="width: 100%;margin-top: 20px" :row-style="{height:'65px'}">
            <template v-for="column1 in columns2[value]">
              <template v-if="!column1.fix">
                <el-table-column :label='column1.title'>
                  <template v-for="column2 in column1.column">
                    <el-table-column :key="column2.field" v-if="!column2.editor" :prop='column2.field' :label='column2.title' :min-width='column2.width'></el-table-column>
                    <el-table-column v-else :prop='column2.field' :label='column2.title' :min-width='column2.width'>
                      <template slot-scope="scope">
                        <template v-if="!scope.row.editable">
                          <div style="width: 100%" @click="toggle(scope,scope.row[column2.field])">{{ scope.row[column2.field] }}</div>
                        </template>
                        <template v-else>
                          <el-input ref="mark" @blur="onBlur(scope,column2)" v-model="value6">
                          </el-input >
                        </template>
                      </template>
                    </el-table-column>
                  </template>
                </el-table-column>
              </template>
              <template v-else>
                <el-table-column :label='column1.title' fixed="right">
                  <template v-for="column2 in column1.column">
                    <el-table-column :key="column2.field" :prop='column2.field' :label='column2.title' :min-width='column2.width'>
                    </el-table-column>
                  </template>
                </el-table-column>
              </template>
            </template>
          </el-table>
          <div class="pagination-container" style="margin-top: 20px;float: left;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.rows" layout="total, sizes, prev, pager, next, jumper" :total="Number(total)">
            </el-pagination>
          </div>
          <div style="margin-top: 20px;float: right;">
            <el-button v-if="saveFlag" type="success" @click="save()">保存报表</el-button>
            <el-button @click="page('last')">上一次采集数据</el-button>
            <el-button @click="page('next')">下一次采集数据</el-button>
            <!-- <el-button type="success" @click="search">保存数据分析并返回</el-button> -->
            <!-- <el-button @click="search">取消</el-button> -->
            <el-button @click="search">导出ECXEL</el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div id="myChart" :style="{ height: '600px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    data() {
      return {
        date: [],
        tableData: [],
        tableData1: [],
        chartData: [],
        params: {
          page: 1,
          rows: 10
        },
        value6:'',
        changeRowArr:[],
        date1: [],
        total: null,
        title: '',
        loading:false,
        columns1: {
          "深层水平位移": {
              title: "深层水平位移监测点数据汇总",
              columns: [
                  { field: 'MonitorPointPart', title: '测点部位', width: '60' },
                  { field: 'MeasurePointNum', title: '测点编号', width: '60' },
                  { field: 'TheLastMeasureDate', title: '上次测试时间', width: '100' },
                  { field: 'TheLastMaxTotalChanges', title: '上次累计最大水平位移(mm)', width: '100' },
                  { field: 'ThisMeasureDate', title: '本次测试时间', width: '100' },
                  { field: 'ThisMaxTotalChanges', title: '本次累计最大水平位移(mm)', width: '100' },
                  { field: 'ThisMaxTotalChangesDepth', title: '相应位移深度(m)', width: '100' },
                  { field: 'ThisMaxChanges', title: '本次最大水平位移增量(mm)', width: '100' },
                  { field: 'ThisMaxChangesDepth', title: '相应位移深度(m)', width: '100' },
                  { field: 'Notes', title: '备注', width: '100' }
              ]
          }
        },
        columns2: {
          "深层水平位移":  [{
            title: "原始数据",
            column: [
              { field: "Depth", title: "深度(m)", width: "150" },
              { field: "OriginalData", title: "累计变化量(mm)", width: "130" }
            ]
          },{
            title: "分析数据",
            column: [
              { field: "Depth", title: "深度(m)", width: "150" },
              { field: "LastTotalChanges", title: "上次累计变化量(mm)", width: "140" },
              { field: "ThisTotalChanges", title: "本次累计变化量(mm)", width: "140",editor: true },
              { field: "ThisChanges", title: "本次变化量(mm)", width: "140" },
              { field: "ChangeRate", title: "本次变化率(mm/d)", width: "140" }
            ]
          }]
        },
        // columns2: [
        //   { field: "Depth", title: "深度(m)", width: "150" },
        //   { field: "LastTotalChanges", title: "上次累计变化量(mm)", width: "140" },
        //   { field: "ThisTotalChanges", title: "本次累计变化量(mm)", width: "140",editor: true },
        //   { field: "ThisChanges", title: "本次变化量(mm)", width: "140" },
        //   { field: "ChangeRate", title: "本次变化率(mm/d)", width: "140" },
        //   { field: "OriginalData", title: "累计变化量(mm)", width: "130" }
        // ],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三十天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近九十天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 182);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        row:'',
        value: ''
      }
    },
    methods: {
      toggle(scope,data) {
        scope.row.editable = !scope.row.editable
        this.value6 = data
        this.$nextTick(function(){
          console.log(this.$refs.mark[this.$refs.mark.length-1].$el.querySelector("input"))
          this.$refs.mark[this.$refs.mark.length-1].$el.querySelector("input").focus()
        })
      },
      save() {
        // if(this.changeRowArr.length == 0){
        //   this.$message({
        //     type: 'warning',
        //     message: '没有数据修改'
        //   });
        //   return
        // }
        var p = {
          type: "深层水平位移",
          data:JSON.stringify(this.tableData)
        }
        this.$api.post('report/modifySummary', p).then( r => {
          this.$message({
            type: 'success',
            message: '保存成功'
          });
        })
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          legend: {
              y: 'bottom',    //延Y轴居中
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              },
              formatter: function (params) {
                  var res = ""
                  for (var i in params[0].data) {
                      res += '<p>' + i + ':' + params[0].data[i] + '</p>'
                  }
                  return res
              }
          },
          dataset: {
              source: this.chartData
          },
          xAxis: {
              type: 'value',
              position: 'top'
          },
          yAxis: { type: 'category' },
          series: [
              { type: 'line' },
              { type: 'line' }
          ]
        });
      },
      // onBlur(scope,column1) {
      //   scope.row[column1.field] = this.value6
      //   scope.row.editable = !scope.row.editable
      // },
      onBlur(scope,column2) {
        if (!isNaN(this.value6)) {
          if(scope.row[column2.field] !== this.value6){
            this.upDate(scope,this.value6)
            scope.row[column2.field] = this.value6
          }
        }else{
          this.$message({
            type: 'warning',
            message: '请输入数字'
          });
        }
        scope.row.editable = !scope.row.editable
      },
      page(cmd) {
        var p = {
          type: this.value,
          id: this.tableData[0].id,
          cmd:cmd,
          thisMeasureDate: this.tableData[0].ThisMeasureDate,
          page:this.params.page,
          rows:this.params.rows
        }
        this.$api.post('report/selectDate', p).then( r => {
          if(r.summary){
            this.tableData[0].ThisMeasureDate = r.summary.ThisMeasureDate
            this.tableData[0].ThisAxialForce = r.summary.ThisAxialForce
            this.tableData[0].ThisChanges = r.summary.ThisChanges
            this.tableData1 = r.rows
            this.chartData = r.data
            this.drawLine()
          }
          if(r.content === "0"){
              this.$message({
                type: 'warning',
                message: '没有数据了'
              });
          }
        })
      },
      upDate(scope,data) {
        var p = {
          type: this.value,
          id: this.tableData[0].id,
          measureDate: this.tableData[0].ThisMeasureDate,
          analysisData: data,
          depth:scope.row.Depth
        }
        this.$api.post('report/modifyDetail', p).then( r => {
          if(r.summary){
            this.tableData[0].ThisAxialForce = r.summary.ThisAxialForce
            this.tableData[0].ThisChanges = r.summary.ThisChanges
            scope.row.ChangeRate = r.ChangeRate
            scope.row.ThisChanges = r.ThisChanges
          }
        })
      },
      changeRow(data,row){
        for(var i in data){
          row[i] = data[i]
        }
      },
      toggle(scope,data) {
        if(scope.row.MeasureDate < this.tableData[0].TheLastMeasurementDate&&saveFlag){
          return false
        }
        scope.row.editable = !scope.row.editable
        this.value6 = data
        this.$nextTick(function(){
          console.log(this.$refs.mark[this.$refs.mark.length-1].$el.querySelector("input"))
          this.$refs.mark[this.$refs.mark.length-1].$el.querySelector("input").focus()
        })
      },
      loadChart() {
        var p = {
          type: this.value,
          id: this.tableData[0].id,
          startTime: this.date1[0],
          endTime: this.date1[1]
        }
        this.$api.post('report/pointChart', p).then( r => {
          this.chartData = r.data
          this.drawLine()
        })
      },
      loadData() {
        this.loading = true
        var v = this
        var p = {
          page :this.params.page,
          rows :this.params.rows,
          type: this.value,
          id: this.tableData[0].id,
          startTime: this.date1[0],
          endTime: this.date1[1]
        }
        this.$api.post('report/pointData', p).then( r => {
          for(var i in r.rows){
            r.rows[i].editable = false
          }
          v.tableData1 = r.rows
          v.total = r.total
          this.loading = false
        })
      },
      search() {
        this.loadData()
        this.loadChart()
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
    computed:{
      saveFlag() {
        return JSON.parse(sessionStorage.getItem("c")).page
      }
    },
    mounted(){
      this.drawLine();
      this.search()
    },
    created () {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.date1 = [start, end]
      this.value = sessionStorage.getItem("type")
      this.tableData.push(JSON.parse(sessionStorage.getItem("table")))
      this.title = this.tableData[0].MeasurePointNum+this.value+"监测点"
    }
  }
</script>

<style scoped>

</style>