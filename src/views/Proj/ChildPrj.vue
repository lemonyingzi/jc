<template>
  <div>
      <page-title style="margin-bottom: 120px;">{{ $route.params.title }}</page-title>
      <div>
        <el-card style="width: 20%;text-align: center;float: left;margin-right: 20px" class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ "远程状态：" + title_1 }}</span>
          </div>
          <div style="font-size: 14px">{{ content_1 }}</div>
        </el-card>
        <el-card style="width: 20%;margin-top: 20px;text-align: center;" class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ "监测点状态：" + title_2 }}</span>
          </div>
          <div style="font-size: 14px">{{ "监测点总数：" + content_2 }}</div>
          <div style="font-size: 14px">{{ "异常监测点总数：" + content_3 }}</div>
        </el-card>
      </div>
      <div style="background:#eeeff2;text-align:left;margin:5px 20px 5px 0;padding-left:10px;font-size:16px;height:40px;line-height:40px;margin-top:60px;position:relative;">详细数据
        <div style="float: right;position: absolute;right:10px;top: -120px">
          <btn :src="src[0]" :url="url[0]" :title="'监测点'"></btn>
          <btn :src="src[1]" :url="url[1]" :title="'任务'"></btn>
          <btn :src="src[1]" :url="url[2]" :title="'生成报表'"></btn>
          <btn :src="src[0]" :url="url[3]" :title="'设置'"></btn>
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
  </div>
</template>
<script>
import Btn from './childPrjBtn'
export default {
  data (){
    return {
      title_1 :"",
      content_1 :"",
      title_2 :"",
      content_2 :"",
      content_3 :"",
      ProjectName :"无",
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
      src:['../../MonitorPoint/MonitorPoint','../../Task/Task','../../Report/NewReport']
    }
  },
  components :{
    Btn
  },
  methods :{
    loadData() {
      var v = this;
      this.$api.post('prj/childPrj', this.params, r => {   
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
    }
  },
  created() {
      this.loadData()
  }
}
</script>

<style scoped>

</style>