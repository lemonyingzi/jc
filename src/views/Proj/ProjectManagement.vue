<template>
  <div>
    <page-title>工程管理</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" min-width="160"></el-table-column>
            <el-table-column prop="prjName" label="工程名称" min-width="100"></el-table-column>
            <el-table-column prop="SubmitTime" label="工程编号" min-width="100"></el-table-column>
            <el-table-column prop="AuditTime" label="建设单位" min-width="100"></el-table-column>
            <el-table-column prop="Analyst" label="开始时间" min-width="100"></el-table-column>
            <el-table-column prop="Audit" label="分析权限" min-width="100"></el-table-column>
            <el-table-column prop="Audit" label="审核" min-width="100"></el-table-column>
            <el-table-column prop="Audit" label="审核权限" min-width="100"></el-table-column>
            <el-table-column prop="Audit" label="状态" min-width="100"></el-table-column>
          </el-table>
          <div class="pagination-container" style="margin-top: 20px;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
        <el-button @click="newProj" style="margin-top: 20px;float: right;" size="mini">新建工程</el-button>
      </el-col>
    </el-row>
    <el-dialog title="新建工程" :visible.sync="dialogVisible" width="550px">
        <!-- <el-form> -->
          <el-form :inline="true" :model="formLabelAlign" size="mini" style="overflow: hidden;">
            <el-radio-group label-position="top" style="width: 200px;float: left;">
              <el-form-item label="工程名称">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="工程地址">
                <el-input v-model="formLabelAlign.region"></el-input>
              </el-form-item>
              <el-form-item label="委托编号">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
              <el-form-item label="工程代码">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
              <el-form-item label="工程编号">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
            <el-form :inline="true" label-position="top" size="mini" style="border-top: 1px #ddd solid;">
              <el-radio-group style="width: 300px;float: left;">
                <el-form-item label="选择日期">
                  <el-date-picker type="date" style="width: 150px"></el-date-picker>
                </el-form-item>
                <el-form-item label="需要审核流程">
                  <el-switch v-model="value2" style="width: 100px" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
              </el-radio-group>
            </el-form>
            </el-radio-group>
            <el-radio-group label-position="top" style="width: 200px;float: right;border-left: 1px #ddd solid;padding-left: 20px;">
              <el-form-item label="委托单位">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="建设单位">
                <el-input v-model="formLabelAlign.region"></el-input>
              </el-form-item>
              <el-form-item label="监理单位">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
              <el-form-item label="质监单位">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
              <el-form-item label="施工单位">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
              <el-form-item label="设计单位">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
              <el-form-item label="工程部位">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
            </el-radio-group>
          </el-form>
        <!-- </el-form> -->

    </el-dialog>
  </div>
</template>
<script>
export default {
    data() {
      return {
        dialogVisible:false,
        tableData: [],
        params: {
          page: 1,
          rows: 5
        },
        value2:true,
        total: null,
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
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
          v.total = Number(r.total)
        })
      },
      newProj(a) {
        this.dialogVisible = true
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