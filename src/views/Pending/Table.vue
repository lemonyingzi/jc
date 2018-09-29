<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="序号" min-width="160"></el-table-column>
      <el-table-column prop="type" label="类型" min-width="100"></el-table-column>
      <el-table-column prop="prjName" label="名称" min-width="100"></el-table-column>
      <el-table-column prop="time" label="时间" min-width="100" max-width="20"></el-table-column>
      <el-table-column prop="act" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button @click="cl(scope)"  size="mini">立即处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="margin-top: 20px;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper" :total="Number(total)">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        params: {
          page: 1,
          size: 20
        },
        total: null,
      }
    },
    methods: {
      loadData() {
        var v = this
        this.$api.post('pending', this.params, r => {
          v.tableData = r.rows
          v.total = r.total
        })
      },
      cl(scope) {
        if(scope.row.type === "生成报表"){
          this.$router.push({path:'Audit/NewReport_datatable',name: '数据报表',params:{id: scope.row.reportID}})
          sessionStorage.setItem("a",JSON.stringify(scope.row.mptypeList));
        }else{
          this.$router.push({path:'Report/UncompletedAudit',name: '未审核',params:{id: scope.row.reportID}})
          sessionStorage.setItem("b",scope.row.reportID);
        }
        
      },
      handleSizeChange(val) {
        this.params.size = val
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