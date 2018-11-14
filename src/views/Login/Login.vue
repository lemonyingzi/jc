<template>
	<div style="text-align: center;background: linear-gradient(to right,#22496d 0,#212147 100%);min-height: 100%;display:flex;justify-content:center;align-items:center;">
		<div>
        <img style="height:240px;width:200px;" src="@/assets/登录界面LOGO.png" />
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm" style="max-width: 400px;
          margin:0 auto;
          left: 0;
          right: 0;
          padding: 35px 35px 15px 35px;">
          <el-form-item prop="username">
            <el-input type="username" @keyup.enter.native="submitForm('ruleForm2')" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名"></el-input>
          </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" @keyup.enter.native="submitForm('ruleForm2')" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
        <el-col :span="16">
          <el-form-item prop="validate">
            <el-input type="validate" @keyup.enter.native="submitForm('ruleForm2')" v-model="ruleForm2.validate" auto-complete="off" placeholder="验证码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item>
            <img class="validateImg" :src="imgSrc" @click="loadImg()">
          </el-form-item>
        </el-col>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="submitForm('ruleForm2')">登录</el-button>
        </el-form-item>
        <a @click="registe" style="color:white;cursor: pointer;">没有账号？</a>
      </el-form>
    </div>
    <el-dialog></el-dialog>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import crypto from 'crypto'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          username: '',
          validate: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          validate: [
            { validator: validatePass3, trigger: 'blur' }
          ]
        },
        imgSrc:null
      };
    },
    computed :{
      ...mapGetters([
        'prjID'
      ])
    },
    methods: {
	    submitForm(formName) {
        console.log(this.$refs)
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
                this.load()
	          } else {
	            return false;
	          }
	        });
	    },
	    loadImg() {
	    	this.$api.post('login', {flag: 'ValidationNum'}, r => {
	            this.imgSrc = "data:image/jpeg;base64," + r.imageData
	        })
	    },
	    load() {
	    	var md5 = crypto.createHash("md5");
            md5.update(this.ruleForm2.pass)
            var mm = md5.digest("hex")
	    	this.$api.post('login', {flag: 'Login',zh:this.ruleForm2.username,mm:mm,yz:this.ruleForm2.validate}, r => {
                this.$router.push({path: '/Pending',name: '待处理' })
	        },f => {
            this.loadImg()
            this.$message({
              type: 'warning',
              message: f.result
            });
	        })
      },
      registe() {
        
      }
    },
    created() {
      document.title = "登录界面"
      this.$store.commit('changePrjID',null)
    	this.loadImg()
    }
  }
</script>
<style scoped>
.el-form-item{
	margin-left: 0px;
}
</style>