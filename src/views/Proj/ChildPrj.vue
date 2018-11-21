<template>
  <div>
      <page-title style="margin-bottom: 120px;">{{ ProjectName }}</page-title>
      <div>
        <el-card style="width: 20%;text-align: center;float: left;margin-right: 20px" class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ "远程状态：" + title_1 }}</span>
          </div>
          <div style="font-size: 14px">{{ content_1}}</div>
          <div v-if="title_1 === '在线'&&remoteInfo.type==='repeater'" style="font-size: 14px"><img style="vertical-align: middle;" 

:src="'/static/'+remoteInfo.BatteryImage" />
          {{remoteInfo.PowerBattery+remoteInfo.PowerState}}
          </div>
        </el-card>
        <el-card style="width: 20%;margin-top: 20px;text-align: center;" class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ "监测点状态：" + title_2 }}</span>
          </div>
          <div style="font-size: 14px">{{ "监测点总数：" + content_2 }}</div>
          <div style="font-size: 14px">{{ "异常监测点总数：" + content_3 }}</div>
        </el-card>
      </div>
      <div style="background:#eeeff2;text-align:left;margin:5px 20px 5px 0;padding-left:10px;font-size:16px;height:40px;line-height:40px;margin-

top:60px;position:relative;margin-top:60px;">详细数据
        <div style="float: right;position: absolute;right:10px;top: -120px">
          <el-row :gutter="10">
          <el-col :lg="6" :md="6" :xs="6"><btn :src="src[0]" :url="url[0]" :title="'监测点'"></btn></el-col>
          <el-col :lg="6" :md="6" :xs="6"><btn :src="src[1]" :url="url[1]" :title="'任务'"></btn></el-col>
          <el-col :lg="6" :md="6" :xs="6"><btn :src="src[2]" :url="url[2]" :title="'生成报表'"></btn></el-col>
          <span @click="sz()"><el-col :lg="6" :md="6" :xs="6">
            <btn :src="''" :url="url[3]" :title="'设置'"></btn>
          </el-col></span>
          </el-row>
        </div>
      </div>
      <div style="text-align: center;">
        <table style="width: 100%;line-height: 30px;margin-top: 30px;text-align: left;">
        <tr>
            <td>{{ "工程名称：" + ProjectName}}</td>
            <td>{{ "工程地址：" + ProjectAddress}}</td>
            <td>{{ "委托编号：" + DelegateOrderNum}}</td>
            <td>{{ "工程代码：" + ProjectCode}}</td>
            <td>{{ "工程编号：" + SampleNum}}</td>
        </tr>
        <tr>
            <td>{{ "建设单位：" + ConstructUnit}}</td>
            <td>{{ "委托单位：" + SupervisionUnit}}</td>
            <td>{{ "监理单位：" + QualityInspectUnit}}</td>
            <td>{{ "质监单位：" + ExecuteUnit}}</td>
            <td>{{ "设计单位：" + DesignUnit}}</td>
        </tr>
        <tr>
            <td>{{ "施工单位：" + ExecuteUnit}}</td>
            <td>{{ "工程部位：" + ProjectPart}}</td>
            <td>{{ "开始时间：" + StartTime}}</td>
            <td>{{ "分析人员：" + Analyst}}</td>
            <td>{{ "审核流程：" + AuditAccess}}</td>
        </tr>
        <tr>
            <td>{{ "审核人员：" + Audit}}</td>
            <td>{{ "自动生成报表时间：" + ReportTime}}</td>
        </tr>
      </table>
      </div>
      <el-dialog title="设置" :visible.sync="dialogVisible" width="500px">
      <el-form v-model="form" width="700px">
          <el-form-item>
            <el-col :span="1">
              <el-checkbox v-model="form.AutoBoot"></el-checkbox>
            </el-col>
            <el-col :span="10">
              <span style="cursor: pointer;" @click="form.AutoBoot = !form.AutoBoot">开机后自动运行</span>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="1">
            <el-checkbox v-model="form.lock"></el-checkbox></el-col>
            <el-col :span="6"><span style="cursor: pointer;" @click="form.lock = !form.lock">解锁状态下</span></el-col>
            <el-col :span="5">
              <el-input v-model="form.locktime">
              </el-input>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="6"><span style="cursor: pointer;" @click="form.lock = !form.lock">分钟后自动锁定</span></el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="1">
              <el-checkbox v-model="form.rerun"></el-checkbox>
            </el-col>
            <el-col :span="6"><span style="cursor: pointer;" @click="form.rerun = !form.rerun">自动重启计算机</span></el-col>
            <el-col :span="6">
              <el-time-picker value-format="HH:mm" format="HH:mm" v-model="form.reruntime">
              </el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="23">
            <div>注意：  1.请勿设置采集端计算机系统的用户登录密码。</div>
            <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.自动重启计算机时间应避开任务时间。</div>
            <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.修改操作需要上线才能生效，且需要等待几分钟</div></el-col>
          </el-form-item>
            <!-- <el-switch
              v-model="form.lock"
              active-color="#13ce66"
              inactive-color="#ff4949">
            ></el-switch> -->
          <!-- </el-form-item> -->
        <!-- </el-col> -->
        <div style="clear: both;"></div>
        <div style="text-align: center;overflow: auto">
          <el-button @click="zr()" type="success">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
  
</template>
<script>
import Btn from './childPrjBtn'
export default {
  data (){
    return {
      remoteInfo :{},
      title_1 :"",
      content_1 :"",
      title_2 :"",
      content_2 :"",
      content_3 :"",
      ProjectName :"",
      ProjectAddress :"无",
      DelegateOrderNum :"无",
      ProjectCode :"无",
      SampleNum :"无",
      DelegateUnit :"无",
      ConstructUnit :"无",
      SupervisionUnit :"无",
      QualityInspectUnit :"无",
      ExecuteUnit :"无",
      DesignUnit :"无",
      ProjectPart :"无",
      StartTime :"无",
      Analyst :"无",
      AuditAccess :"无",
      Audit :"无",
      ReportTime :"无",
      url: [require("@/assets/childPrj监测点.png"),
            require("@/assets/childPrj任务.png"),
            require("@/assets/childPrj生成报表.png"),
            require("@/assets/childPrj设置.png")],
      src:['../../MonitorPoint/MonitorPoint','../../Task/Task','../../Report/NewReport'],
      dialogVisible:false,
      form:{
        AutoBoot:false,
        rerun:false,
        reruntime:"",
        lock:false,
        locktime:""
      }
    }
  },
  components :{
    Btn
  },
  methods :{
    loadData() {
      var v = this;
      this.$api.post('prj/childPrj', this.params).then( r => {
        v.remoteInfo =  r.remoteInfo[0] 
        v.title_1 = r.remoteInfo[0].state
        v.content_1 = r.remoteInfo[0].info
        v.title_2 = r.monitorInfo[0].state
        v.content_2 = r.monitorInfo[0].mpNum
        v.content_3 = r.monitorInfo[0].exNum
        v.ProjectName = r.projectInfo[0].ProjectName
        v.ProjectAddress = r.projectInfo[0].ProjectAddress
        v.DelegateOrderNum = r.projectInfo[0].DelegateOrderNum
        v.ProjectCode = r.projectInfo[0].ProjectCode
        v.SampleNum = r.projectInfo[0].SampleNum
        v.DelegateUnit = r.projectInfo[0].DelegateUnit
        v.ConstructUnit = r.projectInfo[0].ConstructUnit
        v.SupervisionUnit = r.projectInfo[0].SupervisionUnit
        v.QualityInspectUnit = r.projectInfo[0].QualityInspectUnit
        v.ExecuteUnit = r.projectInfo[0].ExecuteUnit
        v.DesignUnit = r.projectInfo[0].DesignUnit
        v.ProjectPart = r.projectInfo[0].ProjectPart
        v.StartTime = r.projectInfo[0].StartTime
        v.Analyst = r.projectInfo[0].Analyst
        v.AuditAccess = r.projectInfo[0].AuditAccess
        v.Audit = r.projectInfo[0].Audit
        v.ReportTim = r.projectInfo[0].ReportTime
      })
    },
    sz() {
      var v = this
      this.dialogVisible = true
      this.$api.post('prj/clientSettings', {flag:'get'}).then( r => {
        v.form.AutoBoot = r.data.AutoBoot === "1" ? true:false
        v.form.lock = r.data.AutoLockTime !== "" ? true:false
        v.form.locktime = r.data.AutoLockTime
        v.form.rerun = r.data.RestartComputerTime !== "" ? true:false
        v.form.reruntime = r.data.RestartComputerTime
      })
    },
    zr() {
      var v = this
      if(v.form.lock === true&&v.form.locktime == ""){
        this.$message({
          type: 'warning',
          message: '请填写时间'
        });
        return
      }else if(v.form.rerun === true&&v.form.reruntime == ""){
        this.$message({
          type: 'warning',
          message: '请填写时间'
        });
        return
      }
      var p = {}
      p.flag = "set"
      p.AutoBoot = v.form.AutoBoot === true ? "1":"0"
      p.AutoLockTime = v.form.lock === true ? "1,"+v.form.locktime:"0"
      p.RestartComputerTime = v.form.rerun === true ? "1,"+v.form.reruntime:"0"
      
      this.$api.post('prj/clientSettings', p).then( r => {
        this.$message({
          type: 'warning',
          message: '修改操作正在执行，生效需等待几分钟'
        });
        this.dialogVisible = false
      })
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>