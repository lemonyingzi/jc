<template>
  <el-container>
    <el-header style="text-align: right;height: 98px;background: #dedede;padding-left:0px;">
      <!-- <div style="float:left;cursor: pointer;width:50%;">
        
      </div> -->
      <div style="position:absolute;left:250px;">
        <a target="_blank" href="https://shop515726526.taobao.com/">
          <img style="height:98px;" src="@/assets/guanggao.gif" />
        </a>
      </div>
      <div class="HeaderRight" style="position:absolute;height:98px;right:0px;">
        <div v-on:click="Homepage()">
          <Icon :url="src[0]"></Icon>
        </div>
        <div v-on:click="User()">
          <Icon :url="src[1]"></Icon>
        </div>
        <div v-on:click="Setting()">
          <Icon :url="src[2]"></Icon>
        </div>
        <div v-on:click="Login()">
          <Icon style="margin-left: 50px" :url="src[3]"></Icon>
        </div>
      </div>
    </el-header>
    <el-dialog title="设置" :visible.sync="dialogVisible" width="700px">
      <el-form v-model="form" label-width="200px" width="700px">
        <el-col :span="12">
          <el-form-item label="默认使用审批功能">
            <el-switch
              v-model="form.prjAuditAccess"
              active-color="#13ce66"
              inactive-color="#ff4949">
            ></el-switch>
          </el-form-item>
          <el-form-item label="默认使用审核功能">
            <el-switch
              v-model="form.userAuditAccess"
              active-color="#13ce66"
              inactive-color="#ff4949">
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="默认使用工程管理功能">
            <el-switch
              v-model="form.userManageAccess"
              active-color="#13ce66"
              inactive-color="#ff4949">
            ></el-switch>
          </el-form-item>
        </el-col>
        <div style="clear: both;"></div>
        <div style="text-align: center;overflow: auto">
          <el-button @click="qr()" type="success">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
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
	          require("@/assets/quit.png")
      ],
      form: {
        prjAuditAccess:true,
        userAuditAccess:true,
        userManageAccess:true
      },
      dialogVisible:false
  	}
  },
  methods:{
    Login() {
      this.$api.get('/logout',{}).then(r => {
        this.$router.push({path: 'Login',name:'登录'})
      })
    },
    Homepage() {
      this.$router.push({path: 'ChildPrj',name:'工程首页'})
    },
    User() {
      this.$router.push({path: 'User',name:'用户'})
    },
    Setting() {
      this.dialogVisible = !this.dialogVisible
      var v = this
      this.$api.post('/user/sysSetting',{flag:'get'}).then(r => {
        this.form.prjAuditAccess = r.data.prjAuditAccess === "0"?false:true,
        this.form.userAuditAccess = r.data.userAuditAccess === "0"?false:true,
        this.form.userManageAccess = r.data.userManageAccess === "0"?false:true
      })
    },
    qr() {
      var p = {
        flag:'update',
        data:{
          prjAuditAccess:this.form.prjAuditAccess === false?"0":"1",
          userAuditAccess:this.form.userAuditAccess === false?"0":"1",
          userManageAccess:this.form.userManageAccess === false?"0":"1"
        }
      }
      p.data = JSON.stringify(p.data)
      this.$api.post('/user/sysSetting',p,r => {
        this.dialogVisible = !this.dialogVisible
      })
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
      background: rgb(222, 222, 222)
   }
</style>