<template>
    <el-container style="height: 100%;">
      <Sidebar></Sidebar>
        <Header></Header>
    </el-container>
</template>

<script>
import IconFont from '@/assets/icon/iconfont.css'
import Header from './Layout/Header'
import Sidebar from './Layout/Sidebar/Sidebar'
export default {
  name : 'Layout',
  components: {
    Header,
    Sidebar
  }
}
</script>

<style scoped>
</style>

