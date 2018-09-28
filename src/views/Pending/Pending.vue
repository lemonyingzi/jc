<template>
   <div>
    <page-title>待处理</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <pending-table></pending-table>
      </el-col>
    </el-row>
   </div>
</template>

<script>
import pendingTable from './Table'
export default {
  components: {
    pendingTable
  }
}
</script>

<style scoped>

</style>