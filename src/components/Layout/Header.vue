<template>
  <el-container>
    <el-header style="text-align: right;height: 98px;background: #dedede;">
      <div class="HeaderRight">
        <Icon :url="src[0]"></Icon>
        <Icon :url="src[1]"></Icon>
        <Icon :url="src[2]"></Icon>
        <Icon style="margin-left: 50px" :url="src[3]"></Icon>
      </div>
    </el-header>
    <NavMenu></NavMenu>
    <Main></Main>
  </el-container>  
</template>

<script>
import Icon from "./Icon"
import Main from '../Layout/Main'
import NavMenu from './NavMenu/NavMenu'

export default {
  name : 'Header',
  components : {
      Icon,
      Main,
      NavMenu
  },
  data () {
  	return {
  		src: [require("@/assets/homepage.png"),
	          require("@/assets/user.png"),
	          require("@/assets/setting.png"),
	          require("@/assets/quit.png")]
  	}
  }
}
</script>

<style scoped>/*
   .HeaderLeft {
     justify-content: center;
     display: flex;
     align-items:center;
   	 text-align: center;
   	 background: #fff;
   	 float: left;
     width: 250px;
     height: 100%;
   }*/
   .HeaderRight {
      height: 100%;
      justify-content: flex-end;
      display: flex;
      align-items:center;/*垂直居中*/
   }
</style>