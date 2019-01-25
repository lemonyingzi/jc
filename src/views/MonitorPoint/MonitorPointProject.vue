<template>
  <div>
    <page-title>{{ $route.params.title+'历史数据' }}</page-title>
    <el-row>
      <el-form v-model="form" label-width="120px" width="100%">
        <div v-for="(mpInfo,key,index) in mpInfos" :key="index">
          <el-col :span="8">
            <el-col :span="16">
              <el-form-item :label="mpInfo.title">
                <el-input :disabled="true" v-model="mpInfo.value"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </div>
      </el-form>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-table align="center" :data="tableData" max-height="500" @row-dblclick="rowDblclick" stripe style="width: 100%">
          <el-table-column :min-width="col.field==='MeasureTime'?160:null" v-for="col in cols" :key="col.rowid" :prop="col.field" :label="col.title"></el-table-column>
        </el-table>
        <div class="pagination-container" style="margin-top: 20px;float: left;">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.rows" layout="total, sizes, prev, pager, next, jumper" :total="Number(total)">
          </el-pagination>
        </div>
        <div style="float: right;">
          <el-button v-if="$route.params.title!=='水位'" style="margin-top: 20px;margin-left: 20px; float: right;" type="success" @click="btn('ReturnZero')">归零</el-button>
          <el-button v-if="$route.params.title !== '钢支撑轴力'&&$route.params.title !== '混凝土支撑轴力'" style="margin-top: 20px;margin-left: 20px; float: right;" type="success" @click="dialogVisible3 = !dialogVisible3">参数设定</el-button>
          <el-button style="margin-top: 20px;float: right;" type="success" @click="btn('DataAcquisition')">数据采集</el-button>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="$route.params.title+'详细数据'" :visible.sync="dialogVisible" width="750px">
      <el-form :inline="true" v-model="form1" label-width="120px" width="700px">
        <el-col :span="12">
          <el-form-item label="状态">
            <el-input :disabled="true" v-model="form1.PointState"></el-input>
          </el-form-item>
          <el-form-item label="设备ID">
            <el-input :disabled="true" v-model="form1.DeviceID"></el-input>
          </el-form-item>
          <el-form-item label="实测数据">
            <el-input :disabled="true" v-model="form1.Data"></el-input>
          </el-form-item>
          <el-form-item label="环境温度">
            <el-input :disabled="true" v-model="form1.Temperature"></el-input>
          </el-form-item>
          <el-form-item label="电池电压">
            <el-input :disabled="true" v-model="form1.BatteryVoltage"></el-input>
          </el-form-item>
          <el-form-item label="管口高程">
            <el-input :disabled="true" v-model="form1.WaterNozzleHeight"></el-input>
          </el-form-item>
          <el-form-item label="剩余电量">
            <el-input :disabled="true" v-model="form1.ResidualBattery"></el-input>
          </el-form-item>
          <el-form-item label="标定系数B">
            <el-input :disabled="true" v-model="form1.CalibrationCoefB"></el-input>
          </el-form-item>
          <el-form-item label="次数">
            <el-input :disabled="true" v-model="form1.showCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="测点编号">
            <el-input :disabled="true" v-model="form1.MeasurePointNum"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input :disabled="true" v-model="$route.params.title"></el-input>
          </el-form-item>
          <el-form-item label="测量时间">
            <el-input :disabled="true" v-model="form1.MeasureTime"></el-input>
          </el-form-item>
          <el-form-item label="AD值">
            <el-input :disabled="true" v-model="form1.ADValue"></el-input>
          </el-form-item>
          <el-form-item label="水头高度">
            <el-input :disabled="true" v-model="form1.WaterHeadHeight"></el-input>
          </el-form-item>
          <el-form-item label="供电电压">
            <el-input :disabled="true" v-model="form1.SupplyVoltage"></el-input>
          </el-form-item>
          <el-form-item label="标定系数A">
            <el-input :disabled="true" v-model="form1.CalibrationCoefA"></el-input>
          </el-form-item>
          <el-form-item label="线缆长度">
            <el-input :disabled="true" v-model="form1.CableLength"></el-input>
          </el-form-item>
        </el-col>
        <div class="pagination-container" style="margin-top: 20px;float: left;">
            <el-pagination background  @current-change="handleCurrentChange1" :current-page="Number(params1.page)" layout="total, prev, pager, next, jumper" :page-size="1" :total="Number(total)">
            </el-pagination>
          </div>
        <div style="clear: both;"></div>
      </el-form>
    </el-dialog>
    <el-dialog :title="$route.params.title+'详细数据'" :visible.sync="dialogVisible1" width="1300px">
      <el-form :inline="true" v-model="form2" label-width="100px" width="1040px">
        <el-col :span="6">
          <el-form-item label="状态">
            <el-input :disabled="true" v-model="form2.Status"></el-input>
          </el-form-item>
          <el-form-item label="测量网络编号">
            <el-input :disabled="true" v-model="form2.MeasurePointNum"></el-input>
          </el-form-item>
          <el-form-item label="设备ID">
            <el-input :disabled="true" v-model="form2.DeviceID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型">
            <el-input :disabled="true" v-model="$route.params.title"></el-input>
          </el-form-item>
          <el-form-item label="测量时间">
            <el-input :disabled="true" v-model="form2.MeasureTime"></el-input>
          </el-form-item>
          <el-form-item label="通道代码">
            <el-input :disabled="true" v-model="form2.ChannelCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="环境温度">
            <el-input :disabled="true" v-model="form2.Temperature"></el-input>
          </el-form-item>
          <el-form-item label="电池电压">
            <el-input :disabled="true" v-model="form2.BatteryVoltage"></el-input>
          </el-form-item>
          <el-form-item label="剩余电量">
            <el-input :disabled="true" v-model="form2.ResidualBattery"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供电电压">
            <el-input :disabled="true" v-model="form2.SupplyVoltage"></el-input>
          </el-form-item>
          <el-form-item label="次数">
            <el-input :disabled="true" v-model="form2.showCount"></el-input>
          </el-form-item>
        </el-col>
        <el-table :data="tableData1" max-height="350" stripe style="width: 100%">
          <el-table-column type="index" label="序号" min-width="50"></el-table-column>
            <el-table-column prop="Channel" label="通道" min-width="50"></el-table-column>
            <el-table-column prop="SenorNumber" label="传感器编号" min-width="100"></el-table-column>
            <el-table-column prop="Force" label="fi" max-width="20"></el-table-column>
            <el-table-column prop="Result" label="轴力值" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="Unit" label="计算方法" max-width="20"></el-table-column>
            <el-table-column prop="Fzero" label="f0" max-width="20"></el-table-column>
            <el-table-column prop="PullK" label="拉K" max-width="20"></el-table-column>
            <el-table-column prop="PullB" label="拉B" max-width="20"></el-table-column>
            <el-table-column prop="PressK" label="压K" max-width="20"></el-table-column>
            <el-table-column prop="PressB" label="压B" max-width="20"></el-table-column>
            <el-table-column prop="ProjectPart" label="工程部位" max-width="20"></el-table-column>
        </el-table>
        <div class="pagination-container" style="margin-top: 20px;float: left;">
            <el-pagination background  @current-change="handleCurrentChange1" :current-page="Number(params1.page)" layout="total, prev, pager, next, jumper" :page-size="1" :total="Number(total)">
            </el-pagination>
          </div>
        <div style="clear: both;"></div>
      </el-form>
    </el-dialog>
    <el-dialog :title="$route.params.title+'详细数据'" :visible.sync="dialogVisible2" width="1300px">
      <el-form :inline="true" v-model="form3" label-width="100px" width="1040px">
        <el-col :span="6">
          <el-form-item label="状态">
            <el-input :disabled="true" v-model="form3.PointState"></el-input>
          </el-form-item>
          <el-form-item label="测量网络编号">
            <el-input :disabled="true" v-model="form3.MeasureNetworkNum"></el-input>
          </el-form-item>
          <el-form-item label="设备ID">
            <el-input :disabled="true" v-model="form3.DeviceID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型">
            <el-input :disabled="true" v-model="$route.params.title"></el-input>
          </el-form-item>
          <el-form-item label="测量时间">
            <el-input :disabled="true" v-model="form3.MeasureTime"></el-input>
          </el-form-item>
          <el-form-item label="环境温度">
            <el-input :disabled="true" v-model="form3.Temperature"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电池电压">
            <el-input :disabled="true" v-model="form3.BatteryVoltage"></el-input>
          </el-form-item>
          <el-form-item label="剩余电量">
            <el-input :disabled="true" v-model="form3.ResidualBattery"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供电电压">
            <el-input :disabled="true" v-model="form3.SupplyVoltage"></el-input>
          </el-form-item>
          <el-form-item label="次数">
            <el-input :disabled="true" v-model="form3.showCount"></el-input>
          </el-form-item>
        </el-col>
        <el-table v-if="$route.params.title==='液压水准'" :data="tableData3" max-height="350" stripe style="width: 100%">
          <el-table-column type="index" label="序号" min-width="160"></el-table-column>
            <el-table-column prop="UnitNum" label="测点编号" min-width="50"></el-table-column>
            <el-table-column prop="MeasureType" label="测点类型" min-width="100"></el-table-column>
            <el-table-column prop="Status" label="状态" max-width="20"></el-table-column>
            <el-table-column prop="Result" label="位移值" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="Temperature" label="温度" max-width="20"></el-table-column>
            <el-table-column prop="OriginalData" label="原始数据" max-width="20"></el-table-column>
        </el-table>
        <el-table v-else-if="$route.params.title==='深层水平位移'" :data="tableData3" max-height="350" stripe style="width: 100%">
          <el-table-column type="index" label="序号" min-width="160"></el-table-column>
            <el-table-column prop="Depth" label="深度" min-width="50"></el-table-column>
            <el-table-column prop="Result" label="位移值" min-width="100"></el-table-column>
            <el-table-column prop="Status" label="状态" max-width="20"></el-table-column>
            <el-table-column prop="XaxisADValue" label="X轴角度" max-width="20"></el-table-column>
            <el-table-column prop="YaxisADValue" label="Y轴角度" max-width="20"></el-table-column>
            <el-table-column prop="ZaxisADValue" label="Z轴角度" max-width="20"></el-table-column>
            <el-table-column prop="Temperature" label="温度" max-width="20"></el-table-column>
            <el-table-column prop="DataState" label="数据状态" max-width="20"></el-table-column>
            <el-table-column prop="XaxisData" label="X轴" max-width="20"></el-table-column>
            <el-table-column prop="YaxisData" label="Y轴" max-width="20"></el-table-column>
            <el-table-column prop="ZaxisData" label="Z轴" max-width="20"></el-table-column>
        </el-table>
        <div class="pagination-container" style="margin-top: 20px;float: left;">
            <el-pagination background  @current-change="handleCurrentChange1" :current-page="Number(params1.page)" layout="total, prev, pager, next, jumper" :page-size="1" :total="Number(total)">
            </el-pagination>
          </div>
        <div style="clear: both;"></div>
      </el-form>
    </el-dialog>
    <el-dialog :title="$route.params.title+'参数设定'" :visible.sync="dialogVisible3" width="700px">
      <el-form v-model="form" label-width="120px" width="100%">
        <div v-for="(mpInfo,key,index) in mpInfos" :key="index">
          <el-form-item :label="mpInfo.title">
            <el-input :disabled="mpInfo.title==='设备ID'?true:false" v-model="mpInfo.value"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div style="text-align: center;">
        <el-button @click="btn('ParaSetting')" type="success">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
    data() {
      return {
        tableData: [],
        tableData1: [],
        tableData2: [],
        tableData3: [],
        params: {
          page: 1,
          rows: 10
        },
        params1: {
          page: 1
        },
        total: null,
        cols: [],
        form: [],
        mpInfos: [],
        dialogVisible:false,
        dialogVisible1:false,
        dialogVisible2:false,
        dialogVisible3:false,
        total: null,
        form1:[],
        form2:[],
        form3:[]
      }
    },
    methods: {
      loadTable() {
        let v = this
        let a = {mpID:this.$route.params.mpID}
        this.$api.post('monitorPoint/mp_historyColumns', a).then( r => {
          v.cols = r.columns
          v.loadData()
        })
      },
      loadData() {
        let v = this
        let a = {
          page :this.params.page,
          rows :this.params.rows,
          mpID: this.$route.params.mpID
        }
        this.$api.post('monitorPoint/mp_historyData', a).then( r => {
          v.tableData = r.rows
          v.mpInfos = r.mpInfo
          v.total = r.total
        })
      },
      loadData1(row, event) {
        let v = this
        let a = {
          type:this.$route.params.title,
          rowid:this.params1.page,
          mpID: this.$route.params.mpID,
          total:this.total
        }
        this.$api.post('monitorPoint/mp_detailData', a).then( r => {
          if(this.$route.params.title === "水位"){
            v.form1 = r.data
          }else if(this.$route.params.title === "钢支撑轴力"||this.$route.params.title === "混凝土支撑轴力"){
            v.form2 = r.info
            v.tableData1 = r.unitData
          }else if(this.$route.params.title === "深层水平位移"||this.$route.params.title === "液压水准"){
            v.form3 = r.info
            v.tableData3 = r.unitData
          }
        })
      },
      handleSizeChange(val) {
        this.params.rows = val
        this.loadData()
      },
      handleCurrentChange (val){
        this.params.page = val
        this.loadData()
      },
      handleCurrentChange1 (val){
        this.params1.page = val
        this.loadData1()
      },
      rowDblclick(row, event) {
        if(this.$route.params.title === "水位"){
          this.dialogVisible = true
          this.params1.page = row.rowid
          this.loadData1(row, event)
        }else if(this.$route.params.title === "钢支撑轴力"||this.$route.params.title === "混凝土支撑轴力"){
          this.dialogVisible1 = true
          this.params1.page = row.rowid
          this.loadData1(row, event)
        }else if(this.$route.params.title === "深层水平位移"||this.$route.params.title === "液压水准"){
          this.dialogVisible2 = true
          this.params1.page = row.rowid
          this.loadData1(row, event)
        }
      },
      btn(type) {
        this.$confirm('是否确定执行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var p = {type:type}
          var _this = this
          if(type === 'DataAcquisition' || type === 'ReturnZero'){
            p.data = 'Type' + this.$route.params.title + 'DeviceID' + this.mpInfos.did.value + 'MeasurePointNum' + this.mpInfos.mpn.value
          }else{
            if(this.$route.params.title === '水位'){
              p.data = 'Type' + this.$route.params.title + 'DeviceID' + this.mpInfos.did.value + 'NewMeasurePointNum' + this.mpInfos.mpn.value + 'WaterNozzleHeight' + this.mpInfos.nozzleHeight.value
            }else if(this.$route.params.title === '液压水准' || this.$route.params.title === '深层水平位移'){
              p.data = 'Type' + this.$route.params.title + 'DeviceID' + this.mpInfos.did.value + 'NewMeasurePointNumber' + this.mpInfos.mpn.value + 'SenorNumber' + this.mpInfos.snum.value
            }
          }
          this.$api.post('monitorPoint/remoteCtrl', p).then( r => {
            this.$message({
              type: 'success',
              message: '执行成功!'
            })
            if(type === 'ParaSetting'){
              _this.loadData()
              _this.dialogVisible3 = false
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    },
    created () {
      this.loadTable()
    }
  }
</script>

<style scoped>
</style>