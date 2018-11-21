<template>
  <div>
    <page-title>新增报表</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table :data="tableData" @selection-change="handleSelectionChange" stripe style="width: 100%">
            <el-table-column type="selection" label="序号" width="160"></el-table-column>
            <el-table-column prop="Type"  label="监测类型" min-width="100"></el-table-column>
            <el-table-column prop="MeasurePointNumber" label="测点编号" min-width="100"></el-table-column>
          </el-table>
          <div class="pagination-container" style="margin-top: 20px;width: 50%;display: inline-block;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.rows" layout="total, sizes, prev, pager, next, jumper" :total="Number(total)">
            </el-pagination>
          </div>
          <el-button @click="xzbb()" style="float:right;margin-top: 20px;">新增报表</el-button>
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
        multipleSelection: []
      }
    },
    methods: {
      loadData() {
        let v = this
        let p = {
          page :this.params.page,
          rows :this.params.rows
        }
        this.$api.post('report/report_mp', p).then( r => {
          v.tableData = r.rows
          v.total = r.total
        })
      },
      xzbb() {
        if(this.multipleSelection.length == 0){
          this.$message({
            type: 'warning',
            message: '请选择类型'
          });
          return 
        }
        let hash = {};
        let p = this.multipleSelection.map((item,index,arr) => {
          return  { "MonitorPointType": item.Type, "MeasurePointNumber": item.MeasurePointNumber }
        })
        p = p.reduce((item, next) => {
          hash[next.MonitorPointType] ? '' : hash[next.MonitorPointType] = true && item.push(next);
          return item 
        }, []) 
        p = JSON.stringify(p)
        this.$api.post('report/create', {data:p}).then( r => {
          this.$message({
            type: 'success',
            message: '报表生成成功'
          });
          //直接跳转到数据汇总
          this.$router.push({path:'Audit/NewReport_datatable',name: '数据报表',params:{id: r.reportID}})
          sessionStorage.setItem("a",p)
          sessionStorage.setItem("c",JSON.stringify({flag:true,page:true}))
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
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