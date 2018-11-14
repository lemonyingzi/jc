<template>
   <div class="Sidebar">
    <div style="text-align:center;background:#fff;padding: 10px">
        <img src="@/assets/LOGO.png" />
    </div>
      <div style="height: 60px;text-align: left;line-height: 60px;padding-left:20px;cursor: pointer;background: #284a5c"><span style="vertical-align: middle;color: #fff">{{ title }}</span></div>
      <div class="zy-main">
              <el-scrollbar>
          <!--以下是要滚动的内容-->
          <div class="zy-main__box">
            <transition name="move" mode="out-in">
              <el-menu
            :unique-opened=true
            default-active="2"
            background-color="#efeff3"
            text-color="#000"
            active-text-color="#293c5c">
            <Content v-on:projectName="addName"></Content>
          </el-menu>
            </transition>
          </div>
        </el-scrollbar>
          </div>
   </div>
</template>

<script>
import Content from './Content'
export default {
  name : 'Sidebar',
  components: {
    Content
  },
  data (){
    return {
      title:null
    }
  },
  methods: {
    addName:function(data){
      this.title = data.title
    }
  }
}
</script>

<style scoped>
    .Sidebar{
      min-width: 250px;
      background: #efeff3;
    }

.zy-main {
  height: 100%;
  /*overflow: hidden;*/
}
.el-scrollbar{
  height: 100%;
}
.el-scrollbar__wrap{
  overflow: scroll;
  /*overflow-x:auto*/
}
</style>

