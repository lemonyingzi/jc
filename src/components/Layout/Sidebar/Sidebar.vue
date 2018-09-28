<template>
   <div class="Sidebar">
    <div style="text-align:center;background:#fff;padding: 10px 0">
        <img src="@/assets/LOGO.png" />
    </div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#efeff3"
        text-color="#000"
        active-text-color="#293c5c">
        <Content></Content>
      </el-menu>
   </div>
</template>

<script>
import Content from './Content'
export default {
  name : 'Sidebar',
  components: {
    Content
  }
}
</script>

<style scoped>
    .Sidebar{
      width: 250px;
      /*height:100%;*/
      background: #efeff3;
    }
</style>

