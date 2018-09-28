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
          <el-table border :data="tableData" stripe style="width: 100%;margin-top: 20px;" :row-style="{height:'65px'}">
            <template v-for="column in extra">
              <el-table-column :key="column.field" :prop='column.field' :label='column.title' :min-width='column.width'></el-table-column>
            </template>
          </el-table>
          <el-table border :data="tableData[0].channel" stripe style="width: 100%;margin-top: 20px;" :row-style="{height:'65px'}">
            <template v-for="column in channel">
              <el-table-column :key="column.field" :prop='column.field' :label='column.title' :min-width='column.width'></el-table-column>
            </template>
          </el-table>
          <div style="margin-top: 20px;float: left;">
            <el-date-picker
              @change="search"
              v-model="date1"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-select v-model="value7" placeholder="请选择">
              <el-option
                v-for="(item,key,index) in tableData[0].channel"
                :key="index"
                :label="item.Channel"
                :value="item.Channel">
              </el-option>
            </el-select>
            <el-button type="success" @click="search">搜索</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
    </el-row>
    <el-row>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table border :data="tableData1" stripe style="width: 100%;margin-top: 20px" :row-style="{height:'65px'}">
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
            <el-button type="success" @click="search">保存数据分析并返回</el-button>
            <el-button @click="search">取消</el-button>
            <el-button @click="search">导出ECXEL</el-button>
          </div>
        </div>
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
          rows: 5
        },
        value6:'',
        value7:'',
        changeRowArr:[],
        date1: [],
        total: null,
        title: '',
        columns1: {
            "混凝土支撑轴力": {
                title: "混凝土支撑轴力监测点数据汇总",
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
                ]
            }
        },
        extra:[
          { field: 'StressometerAs', title: '应力计As(mm^2)', width: '160' },
          { field: 'SteelTotalArea', title: '钢筋总面积(mm^2)', width: '180' },
          { field: 'ConcreteArea', title: '砼面积(mm^2)', width: '180' },
          { field: 'SteelElastic', title: '钢筋弹性模量Es(N/mm^2)', width: '170' },
          { field: 'ConcreteElastic', title: '砼弹性模量Ec(N/mm^2)', width: '160' },
          { field: 'CoefficientM', title: '系数m', width: '160' }
        ],
        channel: [
          { field: 'Channel', title: '通道', width: '140' },
          { field: 'Unit', title: '单位', width: '150' },
          { field: 'PullK', title: '拉K', width: '150' },
          { field: 'PullB', title: '拉B', width: '150' },
          { field: 'PressK', title: '压K', width: '140' },
          { field: 'PressB', title: '压B', width: '140' },
          { field: 'Fzero', title: '初始频率', width: '140' }
        ],
        columns2: {
          "混凝土支撑轴力":  [{
            title: "原始数据",
            column: [
              { "field": "MeasureDate", "title": "测量时间", "width": "100" },
              { "field": "OriginalFreq", "title": "测量频率", "width": "100" },
              { "field": "AnalysisData", "title": "轴力值(kN)", "width": "120" }
            ]
          },{
            title: "分析数据",
            column: [
              { "field": "MeasureDate", "title": "测量时间", "width": "80" },
              { "field": "OriginalFreq", "title": "测量频率", "width": "80" ,editor:true},
              { "field": "AnalysisData", "title": "轴力值(kN)", "width": "120" }
            ]
          }]

        },
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
          xAxis: { type: 'category' },
          yAxis: {},
          series: [
              { type: 'line' },
              { type: 'line' }
          ]
        });
      },
      onBlur(scope,column2) {
        if (Number.isInteger(Number(this.value6))) {
          scope.row[column2.field] = this.value6
        }else{
          this.$message({
            type: 'warning',
            message: '请输入数字'
          });
        }
        scope.row.editable = !scope.row.editable
      },
      changeRow(data,row){
        for(var i in data){
          row[i] = data[i]
        }
      },
      toggle(scope,data) {
        scope.row.editable = !scope.row.editable
        this.value6 = data
        this.$nextTick(function(){
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
        this.$api.post('report/pointChart', p, r => {
          this.chartData = r.data
          this.drawLine()
        })
      },
      loadData() {
        var v = this
        var p = {
          page :this.params.page,
          rows :this.params.rows,
          type: this.value,
          id: this.tableData[0].id,
          startTime: this.date1[0],
          endTime: this.date1[1]
        }
        this.$api.post('report/pointData', p, r => {
          for(var i in r.rows){
            r.rows[i].editable = false
          }
          v.tableData1 = r.rows
          v.total = r.total
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
    mounted(){
      this.drawLine()
    },
    created () {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.date1 = [start, end]
      this.value = sessionStorage.getItem("type")
      this.tableData.push(JSON.parse(sessionStorage.getItem("table")))
      this.value7 = this.tableData[0].channel[0].Channel
      this.title = this.tableData[0].MonitorPointPart+this.value+"监测点"
    }
  }
</script>

<style scoped>

</style>