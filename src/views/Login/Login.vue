<template>
	<div style="text-align: center;background: linear-gradient(to right,#22496d 0,#212147 100%);min-height: 100%;">
		<img style="height:240px;width:200px;margin-top: 150px;" src="@/assets/登录界面LOGO.png" />
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm" style="max-width: 400px;
            margin:0 auto;
		    position: absolute;
		    left: 0;
		    right: 0;
		    padding: 35px 35px 15px 35px;">
		    <el-form-item prop="username">
			    <el-input type="username" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item prop="pass">
			  <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
			</el-form-item>
				<el-col :span="18">
					<el-form-item prop="validate">
					    <el-input type="validate" v-model="ruleForm2.validate" auto-complete="off" placeholder="验证码"></el-input>
				    </el-form-item>
				</el-col>
				<el-col :span="5" :offset="1">
				    <el-form-item>
						<img>
				    </el-form-item>
				</el-col>
			<el-form-item>
			  <el-button style="width: 100%;" type="primary" @click="submitForm('ruleForm2')">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          // if (this.ruleForm2.checkPass !== '') {
          //   this.$refs.ruleForm2.validateField('checkPass');
          // }
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
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('登录成功!');
          } else {
            console.log('登陆失败!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped>
.el-form-item{
	margin-left: 0px;
}
</style>