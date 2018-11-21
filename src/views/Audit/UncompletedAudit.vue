<template>
  <div>
    <page-title>未审核</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" min-width="160"></el-table-column>
            <el-table-column prop="prjName" label="工程名称" min-width="100"></el-table-column>
            <el-table-column prop="SubmitTime" label="提交时间" min-width="100"></el-table-column>
            <el-table-column prop="AuditTime" label="审核时间" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="Analyst" label="分析人员" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="Audit" label="审核人员" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="AuditResult" label="审核结果" min-width="100">
              <template slot-scope="scope">
                <el-button @click="ck(scope)"  size="mini">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container" style="margin-top: 20px;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.rows" layout="total, sizes, prev, pager, next, jumper" :total="Number(total)">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="未审核" :visible.sync="dialogVisible" width="700px">
      <el-form v-model="form" label-width="80px" width="700px">
        <el-col :span="12">
          <el-form-item label="分析人员">
            <el-input v-model="form.Analyst"></el-input>
          </el-form-item>
          <el-form-item label="分析时间">
            <el-input v-model="form.ReportTime"></el-input>
          </el-form-item>
          <el-form-item label="工程名称">
            <el-input v-model="form.ProjectName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工程地址">
            <el-input v-model="form.ProjectAddress"></el-input>
          </el-form-item>
          <el-form-item label="工程编号">
            <el-input v-model="form.SampleNum"></el-input>
          </el-form-item>
          <el-form-item label="建设单位">
            <el-input v-model="form.ConstructUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="理由">
            <el-select style="width:100%" v-model="value" multiple placeholder="请选择">
              <el-option
                v-for="(item,key) in options"
                :key="key"
                :label="item.text"
                :value="item.text">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="其他理由">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div style="text-align: center;">
        <el-button @click="ckbb()" type="success">查看报表</el-button>
        <el-button @click="pz()" type="success">批准</el-button>
        <el-button @click="bh()" type="danger">驳回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
    data() {
      return {
        tableData: [],
        params: {
          page: 1,
          rows: 10
        },
        total: null,
        dialogVisible:false,
        textarea: '',
        options: [
          {
              "id": 1,
              "text": "理由1"
          }, {
              "id": 2,
              "text": "理由2"
          }, {
              "id": 3,
              "text": "理由3"
          }, {
              "id": 4,
              "text": "其他理由"
          }
        ],
        value:[],
        form: {
          Analyst: '',
          ReportTime: '',
          ProjectName: '',
          ProjectAddress: '',
          SampleNum: '',
          ConstructUnit: ''
        },
        result:'',
        rowid:'',
        mptypeList:[]
      }
    },
    computed: {
      ly: function(){
        let s = ''
        for(var i in this.value){
          if(this.value[i] == "其他理由"){
            this.value[i] = this.textarea
          }
          s += (Number(i)+1)+this.value[i]+';'
        }
        return s
      }
    },
    methods: {
      loadData() {
        var v = this
        var a = {
          page :this.params.page,
          rows :this.params.rows
        }
        this.$api.post('audit/unAudit', a, r => {
          v.tableData = r.rows
          v.total = Number(r.total)
        })
        return Promise.resolve()
      },
      audit(f) {
        this.$api.post('audit/unAuditInfoRes',{reportID:this.rowid,result:f,nodes:this.ly}).then(r => {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.dialogVisible = false
          this.loadData()
        })
      },
      ck(scope) {
        this.value = []
        this.textarea = ""
        this.rowid = scope.row.id
        this.$api.post('audit/unAuditInfo',{reportID:scope.row.id}).then(r => {
          this.mptypeList = r.mptypeList
          this.dialogVisible = true
          this.form.Analyst = r.reportInfo.Analyst
          this.form.ReportTime = r.reportInfo.ReportTime
          this.form.ProjectName = r.projectInfo.ProjectName
          this.form.ProjectAddress = r.projectInfo.ProjectAddress
          this.form.SampleNum = r.projectInfo.SampleNum
          this.form.ConstructUnit = r.projectInfo.ConstructUnit
        })
      },
      pz(){
        this.audit(1)
      },
      bh(){
        this.audit(0)
      },
      handleSizeChange(val) {
        this.params.rows = val
        this.loadData()
      },
      handleCurrentChange (val){
        this.params.page = val
        this.loadData()
      },
      ckbb() {
        this.$router.push({path:'Audit/NewReport_datatable',name: '数据报表',params:{id: this.rowid}})
        sessionStorage.setItem("a",JSON.stringify(this.mptypeList))
        sessionStorage.setItem("c",JSON.stringify({flag:false,page:true}))
      }
    },
    created () {
      this.loadData().then(val => {
        if(sessionStorage.getItem("b") != 0&&sessionStorage.getItem("b") != null){
          let s = {
            row:{
              id:null
            }
          }
          s.row.id  = sessionStorage.getItem("b")
          this.ck(s)
          sessionStorage.setItem("b",0);
        }
      })
    }
  }
</script>

<style scoped>

</style>