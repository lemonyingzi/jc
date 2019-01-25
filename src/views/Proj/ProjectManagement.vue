<template>
  <div>
    <page-title>工程管理</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table @row-dblclick="rowDblclick" :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" min-width="160"></el-table-column>
            <el-table-column prop="ProjectName" label="工程名称" min-width="100"></el-table-column>
            <el-table-column prop="SampleNum" label="工程编号" min-width="100"></el-table-column>
            <el-table-column prop="ConstructUnit" label="建设单位" min-width="100"></el-table-column>
            <el-table-column prop="StartTime" label="开始时间" min-width="100"></el-table-column>
            <el-table-column prop="Analyst" label="分析权限" min-width="100"></el-table-column>
            <el-table-column prop="AuditAccess" label="审核" min-width="100"></el-table-column>
            <el-table-column prop="Audit" label="审核权限" min-width="100"></el-table-column>
            <el-table-column prop="ProjectState" label="状态" min-width="100"></el-table-column>
          </el-table>
          <div class="pagination-container" style="margin-top: 20px;float: left;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
        <el-button @click="newProj" style="margin-top: 20px;float: right;" size="mini">新建工程</el-button>
      </el-col>
    </el-row>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="580px">
      <el-form :disabled="formDis" ref="formLabelAlign" :rules="rule" :model="formLabelAlign" size="mini" style="overflow: hidden;">
        <el-radio-group style="width: 190px;float: left;">
          <el-form-item prop="ProjectName" label="工程名称">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" v-model="formLabelAlign.ProjectName"></el-input>
          </el-form-item>
          <el-form-item prop="ProjectAddress" label="工程地址">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" v-model="formLabelAlign.ProjectAddress"></el-input>
          </el-form-item>
          <el-form-item prop="DelegateOrderNum" label="委托编号">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" v-model="formLabelAlign.DelegateOrderNum"></el-input>
          </el-form-item>
          <el-form-item prop="ProjectCode" label="工程代码">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" :disabled="title==='工程信息'" v-model="formLabelAlign.ProjectCode"></el-input>
          </el-form-item>
          <el-form-item prop="SampleNum" label="工程编号">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" v-model="formLabelAlign.SampleNum"></el-input>
          </el-form-item>
          <!-- ref="formLabelAlign" -->
        <el-form :disabled="formDis" ref="formLabelAlign" :rules="rule" :inline="true" label-position="top" size="mini" style="margin-top: 20px;">
          <el-radio-group style="width: 300px;float: left;border-top: 1px #ddd solid;">
            <el-form-item prop="StartTime" label="选择日期">
              <el-date-picker @keyup.enter.native="submitForm('formLabelAlign')" :disabled="title==='工程信息'" format="yyyy-MM-dd hh:mm:ss" value-format="yyyy-MM-dd hh-mm-ss" v-model="formLabelAlign.StartTime" type="datetime" style="width: 190px"></el-date-picker>
            </el-form-item>
            <el-form-item label="需要审核流程">
              <el-switch v-model="formLabelAlign.AuditAccess" style="width: 60px" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-radio-group>
          <el-radio-group style="width: 300px;float: left;">
            <el-form-item label="分析人员">
              <el-select style="width: 140px" v-model="Analyst" collapse-tags multiple placeholder="请选择">
                <el-option
                  v-for="(item,index) in analystOptions"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核人员">
              <el-select style="width: 140px" v-model="Audit" collapse-tags multiple placeholder="请选择">
                <el-option
                  v-for="(item,index) in auditorOptions"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-radio-group>
        </el-form>
        </el-radio-group>
        <el-radio-group class="el_right" label-position="right" style="width: 200px;float: right;border-left: 1px #ddd solid;padding-left: 20px;">
          <el-form-item prop="DelegateUnit" label="委托单位">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" v-model="formLabelAlign.DelegateUnit"></el-input>
          </el-form-item>
          <el-form-item prop="ConstructUnit" label="建设单位">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" v-model="formLabelAlign.ConstructUnit"></el-input>
          </el-form-item>
          <el-form-item prop="SupervisionUnit" label="监理单位">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" v-model="formLabelAlign.SupervisionUnit"></el-input>
          </el-form-item>
          <el-form-item prop="QualityInspectUnit" label="质监单位">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" v-model="formLabelAlign.QualityInspectUnit"></el-input>
          </el-form-item>
          <el-form-item prop="ExecuteUnit" label="施工单位">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" v-model="formLabelAlign.ExecuteUnit"></el-input>
          </el-form-item>
          <el-form-item prop="DesignUnit" label="设计单位">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" v-model="formLabelAlign.DesignUnit"></el-input>
          </el-form-item>
          <el-form-item prop="ProjectPart" label="工程部位">
            <el-input @keyup.enter.native="submitForm('formLabelAlign')" v-model="formLabelAlign.ProjectPart"></el-input>
          </el-form-item>
        </el-radio-group>
      </el-form>
      <div style="text-align: center;margin-top: 15px;border-top: 1px #ddd solid;padding-top: 15px;">
        <div style="margin-bottom: 15px;">
        自动生成报表时间：
          <el-radio :disabled="formDis" v-model="radio" label="1">日报</el-radio>
          <el-radio :disabled="formDis" v-model="radio" label="2">周报，每周
            <template>
              <el-select :disabled="formDis" style="width: 60px" v-model="week">
                  <el-option
                    v-for="item in weeks"
                    :key="item.id"
                    :label="item.text"
                    :value="item.text">
                  </el-option>
                </el-select>
            </template>生成
          </el-radio>
          <el-radio :disabled="formDis" v-model="radio" label="3">无</el-radio>
        </div>
        <el-button  @click="submitForm('formLabelAlign')" type="success">确定</el-button>
        <el-button v-if="title==='工程信息'&&!formDis" @click="end()" type="danger">结束工程</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不可为空'));
      } else {
        callback();
      }
    };
    return {
      rule:{
        ProjectName: [
          { validator: validatePass, trigger: 'blur' }
        ],
        ProjectAddress: [
          { validator: validatePass, trigger: 'blur' }
        ],
        DelegateOrderNum: [
          { validator: validatePass, trigger: 'blur' }
        ],
        ProjectCode: [
          { validator: validatePass, trigger: 'blur' }
        ],
        SampleNum: [
          { validator: validatePass, trigger: 'blur' }
        ],
        DelegateUnit: [
          { validator: validatePass, trigger: 'blur' }
        ],
        ConstructUnit: [
          { validator: validatePass, trigger: 'blur' }
        ],
        SupervisionUnit: [
          { validator: validatePass, trigger: 'blur' }
        ],
        QualityInspectUnit: [
          { validator: validatePass, trigger: 'blur' }
        ],
        ExecuteUnit: [
          { validator: validatePass, trigger: 'blur' }
        ],
        DesignUnit: [
          { validator: validatePass, trigger: 'blur' }
        ],
        StartTime: [
          { validator: validatePass, trigger: 'blur' }
        ],
        ProjectPart: [
          { validator: validatePass, trigger: 'blur' }
        ],
      },
      radio:'3',
      week:'一',
      weeks:[{
                "id": 1,
                "text": "一"
            }, {
                "id": 2,
                "text": "二"
            }, {
                "id": 3,
                "text": "三"
            }, {
                "id": 4,
                "text": "四"
            }, {
                "id": 5,
                "text": "五"
            }, {
                "id": 6,
                "text": "六"
            }, {
                "id": 7,
                "text": "日"
            }],
      dialogVisible:false,
      tableData: [],
      params: {
        page: 1,
        rows: 10
      },
      title:'',
      value2:true,
      total: null,
      formLabelAlign: {
        ProjectName: '',
        ProjectAddress: '',
        DelegateOrderNum: '',
        ProjectCode: '',
        SampleNum: '',
        DelegateUnit: '',
        ConstructUnit: '',
        SupervisionUnit: '',
        QualityInspectUnit: '',
        ExecuteUnit: '',
        DesignUnit: '',
        StartTime: '',
        ProjectPart: '',
        // name: '',
        // type: '',
        AuditAccess:''
      },
      Analyst:'',
      Audit:'',
      auditor:'',
      analystOptions:[],
      auditorOptions:[],
      id:'',
      formDis:false
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.qd()
        } else {
          return false;
        }
      });
    },
    loadData() {
      var v = this
      var a = {
        page :this.params.page,
        rows :this.params.rows
      }
      this.$api.post('prj/prjManagement', a).then( r => {
        v.tableData = r.rows
        v.total = Number(r.total)
      })
    },
    rowDblclick(row,evevt) {
      this.dialogVisible = true
      this.formDis = row.ProjectState === '完工'?true:false
      this.title = '工程信息'
      this.id = row.id
      var a = {
        flag :'get',
        id :row.id
      }
      this.$api.post('prj/childPrjManagement', a).then( r => {
        for(var i in r.data){
          this.formLabelAlign[i] = r.data[i]
        }
        this.analystOptions = r.users
        this.auditorOptions = r.users
        this.formLabelAlign.AuditAccess = r.data['AuditAccess'] === '是'?true:false
        this.Analyst = r.data.Analyst === ''?[]:r.data.Analyst.split(',')
        this.Audit = r.data.Audit === ''?[]:r.data.Audit.split(',')
        if(r.data.ReportTime === '无' || r.data.ReportTime === ''){
          this.radio = '3'
        }else if(r.data.ReportTime === '每天'){
          this.radio = '1'
        }else{
          this.radio = '2'
          this.week = r.data.ReportTime.split(',')[1]
        }
      })
    },
    newProj(a) {
      this.dialogVisible = true
      this.title = '新建工程'
      this.$nextTick(function(){
        this.$refs['formLabelAlign'].resetFields();
      })
      this.formLabelAlign.StartTime = ""
      this.Analyst = [],
      this.Audit = [],
      this.$api.post('prj/childPrjManagement', {flag:'auditAccess'}).then( r =>{
        this.formLabelAlign.AuditAccess = r.access !== '0'?true:false
        this.analystOptions = r.users
        this.auditorOptions = r.users
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
    qd() {
      this.dialogVisible = false
      if(this.formDis === true)
      return
      let a = {
        data:this.formLabelAlign
      }
      a.flag = this.title === '新建工程'?'insert':'update'
      a.id = this.title === '新建工程'?'':this.id
      if(this.radio === '3' ){
        a.data.ReportTime = '无'
      }else if(this.radio === '1'){
        a.data.ReportTime = '每天'
      }else{
        a.data.ReportTime = '每周,'+this.week
      }
      a.data.AuditAccess = a.data.AuditAccess === true?'是':'否'
      a.data.Analyst = this.Analyst.join(',')
      a.data.Audit = this.Audit.join(',')
      a.data = JSON.stringify(a.data)
      this.$api.post('prj/childPrjManagement', a).then( r =>{
        this.$message({
          message: this.title === '新建工程'?'新建成功':'修改成功',
          type: 'success'
        });
        this.loadData()
      })
    },
    end() {
      this.$confirm('确定结束该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          let a = {
            flag :'finish',
            id: this.id
          }
          this.$api.post('prj/childPrjManagement', a).then( r =>{
            this.$message({
              message: '结束成功',
              type: 'success'
            });
            this.dialogVisible = false
            this.loadData()
          })
        }
      ).catch(() => {
        return
      })
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style scoped>
  .el-form-item{
    margin-bottom: 8px;
  }
  .el_right>.el-form-item{
    margin-bottom: 11px;
  }
</style>