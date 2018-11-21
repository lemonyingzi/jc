<template>
  <div>
    <page-title>历史报表</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" min-width="160"></el-table-column>
            <el-table-column prop="prjState" label="提交时间" min-width="100"></el-table-column>
            <el-table-column prop="ProjectName" label=" 
  分析人员" min-width="100"></el-table-column>
            <el-table-column prop="SampleNum" label="审核人员" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="ConstructUnit" label=" 
  审核时间" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="StartTime" label="开始时间 
  " min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="act" label="审核结果" min-width="100">
              <template slot-scope="scope">
                <el-button @click="cz(scope)"  size="mini">查看</el-button>
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
      }
    },
    methods: {
      loadData() {
        var v = this
        var a = {
          page :this.params.page,
          rows :this.params.rows
        }
        this.$api.post('prj/buildingPrj', a).then( r => {
          v.tableData = r.rows
          v.total = r.total
        })
      },
      cz(a) {
        this.$router.push({path: 'ChildPrj',name:'工程首页'})
        this.$store.commit('changePrjID',a.row.ProjectID)
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