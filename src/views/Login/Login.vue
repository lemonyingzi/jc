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
            <el-input type="text" @keyup.enter.native="submitForm('ruleForm2')" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名"></el-input>
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
    <el-dialog title="注册" :visible.sync="dialogVisible" width="400px" max-width="400px">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" style="max-width: 300px;
        margin:0 auto;
        left: 0;
        right: 0;
        padding: 35px 35px 15px 35px;">
        <el-form-item prop="company">
          <el-input type="text" @keyup.enter.native="submitForm1('ruleForm')" v-model="ruleForm.company" auto-complete="off" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input type="text" @keyup.enter.native="submitForm1('ruleForm')" v-model="ruleForm.username" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" @keyup.enter.native="submitForm1('ruleForm')" v-model="ruleForm.pass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="repass">
          <el-input type="password" @keyup.enter.native="submitForm1('ruleForm')" v-model="ruleForm.repass" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input @keyup.enter.native="submitForm1('ruleForm')" v-model="ruleForm.phone" auto-complete="off" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="validate">
          <el-input ref="mark" @keyup.enter.native="submitForm1('ruleForm')" v-model="ruleForm.validate" auto-complete="off" placeholder="验证码" style="width: 55%;">
            <template slot="prepend">+86</template>
          </el-input>
          <el-button :type="type" :disabled="disabled" style="width: 43%;" @click="getCode('code')">{{'获取验证码' + count}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="submitForm1('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="foot">苏州市建筑科学研究院集团股份有限公司</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import crypto from 'crypto'
import { smsClient } from '@/plugins/sms-sdk'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入公司名称'));
        } else {
            this.validate('companyName',this.ruleForm.company).then(r => {
              callback();
            }).catch(f => {
              callback(new Error(f.errorInfo));
            })
        }
      };
      var validatePass22 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          this.validate('userName',this.ruleForm.username).then(r => {
            callback();
          }).catch(f => {
            callback(new Error(f.errorInfo));
          })
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          callback();
        }
      };
      var validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请重新输入密码'));
        } else {
          if(this.ruleForm.pass !==''&&this.ruleForm.repass !== this.ruleForm.pass){
            callback(new Error('密码不一致'));
          }
          callback();
        }
      };
      var validatePass5 = (rule, value, callback) => {
        this.type = 'info'
        this.disabled = true
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if(!(/^1[34578]\d{9}$/.test(value))){
            callback(new Error('手机号码有误，请重填'));
          } else {
            this.validate('phoneNumber',this.ruleForm.phone).then(r => {
              this.type = 'primary'
              this.disabled = false
              callback();
            }).catch(f => {
              callback(new Error(f.errorInfo));
            })
          }
        }
      };
      var validatePass6 = (rule, value, callback) => {
        if(this.error !==''){
          callback(new Error(this.error));
        }else if(value === '') {
          callback(new Error('请输入验证码'));
        }else{
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          username: '',
          validate: '',
        },
        ruleForm: {
          company: '',
          pass: '',
          repass: '',
          username: '',
          phone: '',
          validate: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: validatePass22, trigger: 'blur' }
          ],
          validate: [
            { validator: validatePass3, trigger: 'blur' }
          ]
        },
        rules: {
          company: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePass5, trigger: 'blur' }
          ],
          username: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          repass: [
            { validator: validatePass4, trigger: 'blur' }
          ],
          validate: [
            { validator: validatePass6, trigger: 'blur' }
          ]
        },
        imgSrc:null,
        dialogVisible:false,
        count:'',
        type:'info',
        disabled:true,
        error:''
      };
    },
    computed :{
      ...mapGetters([
        'prjID'
      ])
    },
    methods: {
      validate(type,data) {
        return this.$api.post('reg/checkParams', {type: type,data: data})
      },
      getCode(formName){
        if(this.ruleForm.phone === ''||!(/^1[34578]\d{9}$/.test(this.ruleForm.phone))){
          return 
        }else{
          return this.$api.post('reg/reSendVerifyCode', {phoneNumber:this.ruleForm.phone}).then(r => {
            this.error = ''
            let TIME_COUNT = 61
            this.type = 'info'
            this.disabled = true
            var time = setInterval(() => {
              if (TIME_COUNT>0) {
                TIME_COUNT--;
                this.count = '(' + TIME_COUNT + ')'
              } else {
                this.count = ''
                this.type = 'primary'
                this.disabled = false
                clearInterval(time)
              }
            }, 1000)
          }).catch(f => {
            if(f.state === '4'){
              this.error = f.errorInfo
              this.$refs.mark.$el.querySelector("input").focus()
              this.$refs.mark.$el.querySelector("input").blur()
            }
          })
        }
      },
	    submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
                this.load()
	          } else {
	            return false;
	          }
	        });
      },
      submitForm1(formName){
        this.error = ''
        //先判断格式是否正确
        this.$refs[formName].validate((valid) => {
	        if (valid) {
              var md5 = crypto.createHash("md5")
              md5.update(this.ruleForm.pass)
              var mm = md5.digest("hex")
              this.$api.post('reg/register',{
                companyName:this.ruleForm.company,
                userName:this.ruleForm.username,
                password:mm,
                phoneNumber:this.ruleForm.phone,
                regNumber:this.ruleForm.validate
              }).then(r => {
                this.$refs[formName].resetFields();
                this.dialogVisible = false
                this.count = ''
                this.$message({
                  type: 'success',
                  message: '注册成功，工作人员将会进行审核，审核成功后将会通知您，请耐心等待'
                })
              }
              ).catch(f => {
                //如果验证码不正确，再进行验证（报错）
                if(f.state === '4'){
                  this.error = f.errorInfo
                  this.$refs.mark.$el.querySelector("input").focus()
                  this.$refs.mark.$el.querySelector("input").blur()
                }
              })
	        } else {
            return false;
	        }
	      });
      },
	    loadImg() {
        this.$api.post('login', {flag: 'ValidationNum'}).then(r => {
	        this.imgSrc = "data:image/jpeg;base64," + r.imageData
	      })
	    },
	    load() {
	    	var md5 = crypto.createHash("md5");
        md5.update(this.ruleForm2.pass)
        var mm = md5.digest("hex")
	    	this.$api.post('login', {flag: 'Login',zh:this.ruleForm2.username,mm:mm,yz:this.ruleForm2.validate}).then(r => {
          this.$router.push({path: '/Pending',name: '待处理' })
        }).catch(f => {
            this.loadImg()
            this.$message({
              type: 'warning',
              message: f.result
            })
          }
        )
      },
      registe() {
        this.dialogVisible = true
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
.el-form-item {
	margin-left: 0px;
}
.foot {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color:#C2C2C2;
}
</style>