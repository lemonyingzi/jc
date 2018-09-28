<template>
  <div>
    <page-title>{{ $route.params.title+'历史数据' }}</page-title>
    <el-row>
      <el-form v-model="form" label-width="120px" width="100%">
        <div v-for="(mpInfo,key,index) in mpInfos" :key="index">
          <el-col :span="8">
            <el-col :span="16">
              <el-form-item :label="mpInfo.title">
                <el-input :disabled="true" v-model="mpInfo.value"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </div>
      </el-form>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-table :data="tableData" max-height="350" stripe style="width: 100%">
          <el-table-column v-for="col in cols" :key="col.rowid" :prop="col.field" :label="col.title"></el-table-column>
        </el-table>
        <div class="pagination-container" style="margin-top: 20px;">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.rows" layout="total, sizes, prev, pager, next, jumper" :total="Number(total)">
          </el-pagination>
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
          rows: 5
        },
        total: null,
        cols: [],
        form: [],
        mpInfos: []
      }
    },
    methods: {
      loadTable() {
        let v = this
        let a = {mpID:this.$route.params.mpID}
        this.$api.post('monitorPoint/mp_historyColumns', a, r => {
          v.cols = r.columns
          v.loadData()
        })
      },
      loadData() {
        let v = this
        let a = {
          page :this.params.page,
          rows :this.params.rows,
          mpID: this.$route.params.mpID
        }
        this.$api.post('monitorPoint/mp_historyData', a, r => {
          v.tableData = r.rows
          v.mpInfos = r.mpInfo
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
      }
    },
    created () {
      this.loadTable()
    }
  }
</script>

<style scoped>
</style>