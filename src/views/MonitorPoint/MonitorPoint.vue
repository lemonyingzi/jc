<template>
  <div>
    <page-title>监测点列表</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table :sort-orders="['ascending', 'descending']" :default-sort = "{prop: 'state', order: 'ascending'}" :data="tableData" stripe style="width: 100%" @row-dblclick="rowDblClick">
            <el-table-column type="index" label="序号" min-width="160"></el-table-column>
            <el-table-column :sort-by="['正常']" :sortable="true" prop="state" label="状态" min-width="100"></el-table-column>
            <el-table-column prop="mpn" label="测点编号" min-width="50"></el-table-column>
            <el-table-column prop="type" label="类型" max-width="20"></el-table-column>
            <el-table-column prop="did" label="设备ID" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="result" label="最后测量数据" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="unit" label="单位" max-width="20"></el-table-column>
            <el-table-column prop="measureTime" label="最后测量时间" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="residualBattery" label="剩余电量" max-width="20"></el-table-column>
            <el-table-column prop="temperature" label="环境温度" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="signal" label="信号强度" max-width="20">
              <template slot-scope="scope">
                <img :src="'/static/'+tableData[scope.$index].signal" />
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
          rows :this.params.rows,
          type: 0
        }
        this.$api.post('monitorPoint/monitorPoint', a, r => {
          v.tableData = r.rows
          v.total = r.total
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
      rowDblClick (row ,event){
        this.$router.push({path: 'MonitorPointProject',name: '历史数据',params:{id:row.id,title:row.type,mpID:row.mpID}})
      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>
</style>