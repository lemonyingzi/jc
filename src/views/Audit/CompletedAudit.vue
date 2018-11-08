<template>
  <div>
    <page-title>已审核</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" min-width="160"></el-table-column>
            <template v-for="column in columns">
              <el-table-column min-width="100" :prop='column.prop' :label='column.label'></el-table-column>
            </template>
            <el-table-column prop="AuditResult" label="审核结果" min-width="100">
            </el-table-column>
            <el-table-column prop="cz" label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button @click="ck(scope)"  size="mini">查看</el-button>
                <el-button @click="ch(scope)" type="danger" size="mini">撤回</el-button>
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
    <el-dialog title="审核结果" :visible.sync="dialogVisible" width="700px">
      <el-form v-model="form" label-width="80px" width="700px">
        <el-col :span="12">
          <el-form-item label="分析人员">
            <el-input :disabled="true" v-model="form.Analyst"></el-input>
          </el-form-item>
          <el-form-item label="分析时间">
            <el-input :disabled="true" v-model="form.ReportTime"></el-input>
          </el-form-item>
          <el-form-item label="工程名称">
            <el-input :disabled="true" v-model="form.ProjectName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工程地址">
            <el-input :disabled="true" v-model="form.ProjectAddress"></el-input>
          </el-form-item>
          <el-form-item label="工程编号">
            <el-input :disabled="true" v-model="form.SampleNum"></el-input>
          </el-form-item>
          <el-form-item label="建设单位">
            <el-input :disabled="true" v-model="form.ConstructUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核结果">
            <el-input :disabled="true" v-model="form.AuditResult"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="理由">
            <el-input :disabled="true" v-model="form.Notes"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div style="text-align: center;">
        <el-button @click="dialogVisible=false" type="success">确定</el-button>
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
        columns: [{"prop":"prjName","label":"工程名称"},
        {"prop":"SubmitTime","label":"提交时间"},
        {"prop":"AuditTime","label":"审核时间"},
        {"prop":"Analyst","label":"分析人员"},
        {"prop":"Audit","label":"审核人员"}],
        form: {
          Analyst: '',
          ReportTime: '',
          ProjectName: '',
          ProjectAddress: '',
          SampleNum: '',
          ConstructUnit: '',
          AuditResult: '',
          Notes: ''
        },
        textarea: '',
        dialogVisible:false,
        AuditResult:'',
        Notes:''
      }
    },
    methods: {
      loadData() {
        var v = this
        var a = {
          page :this.params.page,
          rows :this.params.rows
        }
        this.$api.post('audit/audited', a, r => {
          v.tableData = r.rows
          v.total = r.total
        })
      },
      ck(scope) {
        this.$api.post('audit/auditedInfo',{reportID:scope.row.id},r => {
          this.dialogVisible = true
          this.form.Analyst = r.reportInfo.Analyst
          this.form.ReportTime = r.reportInfo.ReportTime
          this.form.ProjectName = r.projectInfo.ProjectName
          this.form.ProjectAddress = r.projectInfo.ProjectAddress
          this.form.SampleNum = r.projectInfo.SampleNum
          this.form.ConstructUnit = r.projectInfo.ConstructUnit
          this.form.AuditResult = r.reportInfo.AuditResult
          this.form.Notes = r.reportInfo.Notes
        })
      },
      ch(scope){
        this.$confirm('确定需要撤回?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$api.post('audit/auditedInfoRes',{reportID:scope.row.id},r => {
            this.$message({
              type: 'success',
              message: '撤回成功!'
            });
            this.loadData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤回'
          });          
        });
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
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>