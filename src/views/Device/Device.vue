<template>
  <div>
    <page-title>设备管理</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" min-width="160"></el-table-column>
            <el-table-column prop="Type" label="类型" min-width="100"></el-table-column>
            <el-table-column prop="ProjectName" label="工程名称" min-width="100"></el-table-column>
            <el-table-column prop="DeviceID" label="设备ID" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="HardwareVersionNumber" label="硬件版本号 
  " min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="SoftwareVersionNumber" label="软件版本号" min-width="100"></el-table-column>
            <el-table-column prop="State" label="设备状态" min-width="100"></el-table-column>
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
        total: Number,
      }
    },
    methods: {
      loadData() {
        var v = this
        var a = {
          page :this.params.page,
          rows :this.params.rows
        }
        this.$api.post('device/device', a).then(r => {
          v.tableData = r.rows
          v.total = r.total
        })
      },
      ccc(a) {
        return
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