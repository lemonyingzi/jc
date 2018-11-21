<template>
  <div>
    <page-title>人员管理</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" min-width="160"></el-table-column>
            <el-table-column prop="Name" label="用户名" min-width="100"></el-table-column>
            <el-table-column prop="AuditAccess" label="审批权限" min-width="100"></el-table-column>
            <el-table-column prop="ManageAccess" label="工程管理权限" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="PhoneNumber" label="联系方式" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="AuditResult" label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button @click="bj(scope)" size="mini">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container" style="margin-top: 20px;float: left;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.rows" layout="total, sizes, prev, pager, next, jumper" :total="Number(total)">
            </el-pagination>
          </div>
          <div v-if="access" style="margin-top: 20px;float: right;">
            <el-button @click="addUser()" type="success">新增用户</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" width="500px">
      <el-form :rules="rule" :model="form" label-width="120px" width="700px">
        <el-col :span="12">
          <el-form-item prop="Name" label="用户名">
            <el-input :disabled="true" v-model="form.Name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.PhoneNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核权限">
            <el-switch
              v-model="form.AuditAccess"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="工程管理权限">
            <el-switch
              v-model="form.ManageAccess"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-form>
      <div style="text-align: center;">
        <el-button @click="xg()" type="success">修改密码</el-button>
        <el-button @click="bc()" type="success">保存</el-button>
        <el-button @click="sc()" type="danger">删除</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="dialog1Visible" width="700px">
      <el-form ref="form1" :rules="rule" :model="form1" label-width="120px" width="700px">
        <el-col :span="12">
          <el-form-item prop="password" label="输入原始密码">
            <el-input type="password" v-model="form1.password"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="输入新密码">
            <el-input type="password" v-model="form1.newPassword"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="reNewPassword" label="新密码确认">
            <el-input type="password" v-model="form1.reNewPassword"></el-input>
          </el-form-item>
        </el-col>
        <div style="clear: both;"></div>
        <div style="text-align: center;overflow: auto">
          <el-button @click="qr()" type="success">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="新增用户" :visible.sync="dialog2Visible" width="700px">
      <el-form ref="form2" :rules="rule2" :model="form2" label-width="120px" width="700px">
        <el-col :span="12">
          <el-form-item prop="Name" label="用户名">
            <el-input @keyup.enter.native="submitForm2('form2')" v-model="form2.Name"></el-input>
          </el-form-item>
          <el-form-item prop="reNewPassword" label="密码确认">
            <el-input type="password" @keyup.enter.native="submitForm2('form2')" v-model="form2.reNewPassword"></el-input>
          </el-form-item>
          <el-form-item label="审核权限">
            <el-switch
              v-model="form2.AuditAccess"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="password" label="密码">
            <el-input type="password" @keyup.enter.native="submitForm2('form2')" v-model="form2.password"></el-input>
          </el-form-item>
          <el-form-item prop="PhoneNumber" label="联系方式">
            <el-input @keyup.enter.native="submitForm2('form2')" v-model="form2.PhoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="工程管理权限">
            <el-switch
              v-model="form2.ManageAccess"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
        <div style="clear: both;"></div>
        <div style="text-align: center;overflow: auto">
          <el-button @click="submitForm2('form2')" type="success">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
    data() {
      var validate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不可为空'));
        } else{
          if (this.form1.newPassword !== ''){
            this.$refs.form1.validateField('newPassword');
          }
          callback();
        }
      }
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不可为空'));
        } else{
          if (this.form1.password !== ''&&this.form1.password === this.form1.newPassword){
            callback(new Error('新旧密码不可相同'));
          }
          if (this.form1.reNewPassword !== ''){
            this.$refs.form1.validateField('reNewPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不可为空'));
        } else if (this.form1.newPassword !== value
){
          callback(new Error('密码不一致'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不可为空'));
        } else{
          if (this.form2.reNewPassword !== ''){
            this.$refs.form2.validateField('reNewPassword');
          }
          callback();
        }
      };
      var validatePass4= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不可为空'));
        } else if (this.form2.password !== value
){
          callback(new Error('密码不一致'));
        } else {
          callback();
        }
      };
      return {
        rule:{
          Name: [
            { validator: validate, trigger: 'blur' }
          ],
          userName: [
            { validator: validate, trigger: 'blur' }
          ],
          password: [
            { validator: validate, trigger: 'blur' }
          ],
          newPassword: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          reNewPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          PhoneNumber: [
            { validator: validate, trigger: 'blur' }
          ],
          AuditAccess: [
            { validator: validate, trigger: 'blur' }
          ],
          ManageAccess: [
            { validator: validate, trigger: 'blur' }
          ]
        },
        rule2:{
          Name: [
            { validator: validate, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass3, trigger: 'blur' }
          ],
          reNewPassword: [
            { validator: validatePass4, trigger: 'blur' }
          ],
          PhoneNumber: [
            { validator: validate, trigger: 'blur' }
          ],
          AuditAccess: [
            { validator: validate, trigger: 'blur' }
          ],
          ManageAccess: [
            { validator: validate, trigger: 'blur' }
          ]
        },
        tableData: [],
        params: {
          page: 1,
          rows: 10
        },
        total: "",
        dialogVisible:false,
        dialog1Visible:false,
        dialog2Visible:false,
        form: {
          Name:"",
          PhoneNumber:"",
          AuditAccess:"",
          ManageAccess:""
        },
        form1: {
          password:"",
          newPassword:"",
          reNewPassword:""
        },
        form2: {
          Name:'',
          password:'',
          reNewPassword:'',
          PhoneNumber:'',
          ManageAccess:true,
          AuditAccess:true
        },
        access:true,
        tableName:'',
        id:''
      }
    },
    methods: {
      submitForm2(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.insertUser()
            } else {
              return false;
            }
          });
      },
      loadData() {
        var v = this
        var a = {
          page :this.params.page,
          rows :this.params.rows
        }
        this.$api.post('user/user', a).then( r => {
          if(r.access == 0){
            this.access = false
            this.$message({
              type: 'info',
              message: '用户没有权限'
            });
          }else{
            v.tableData = r.rows
            v.total = r.total
          }
        })
      },
      bj(scope) {
        this.tableName = scope.row.tableName
        this.id = scope.row.id
        this.dialogVisible = true
        this.form.Name = scope.row.Name
        this.form.PhoneNumber = scope.row.PhoneNumber
      },
      handleSizeChange(val) {
        this.params.rows = val
        this.loadData()
      },
      handleCurrentChange (val){
        this.params.page = val
        this.loadData()
      },
      xg (){
        this.dialog1Visible = true
      },
      addUser (){
        this.dialog2Visible = true
        this.$nextTick(function(){
          this.$refs['form2'].resetFields();
        })
        this.$api.post('user/addUser', {flag:'getAccess'}).then( r => {
            this.form2.AuditAccess = r.AuditAccess === "0"?false:true
            this.form2.ManageAccess = r.ManageAccess === "0"?false:true
        })
      },
      insertUser() {
        var p = {
          flag:'insert'
        }
        p.data = this.form2
        p.data.AuditAccess = p.data.AuditAccess === true?1:0
        p.data.ManageAccess = p.data.ManageAccess === true?1:0
        delete p.data.reNewPassword
        p.data = JSON.stringify(p.data)
        this.$api.post('user/addUser', p).then( r => {
          if(r.state == 0){
            this.$message({
              type: 'success',
              message: '创建成功'
            });
          }else{
            this.$message({
              type: 'info',
              message: '创建失败'
            });
          }
        })
        this.loadData()
      },
      bc() {
        var p = {
          flag:'updateTel'
        }
        p.data = this.form
        delete p.data.Name
        p.data.AuditAccess = p.data.AuditAccess === true?1:0
        p.data.ManageAccess = p.data.ManageAccess === true?1:0
        p.data.tableName = this.tableName,
        p.data.id = this.id
        p.data = JSON.stringify(p.data)
        this.$api.post('user/editUser', p).then( r => {
          if(r.state == 0){
            this.$message({
              type: 'success',
              message: '修改成功'
            });
          }else{
            this.$message({
              type: 'info',
              message: '修改失败'
            });
          }
        })
        this.dialogVisible = false
        this.loadData()
      },
      //确认按钮
      qr() {
        var p = {
          flag:'updatePsw',
          data:{}
        }
        p.data.tableName = this.tableName
        p.data.oldPsw = this.form1.password
        p.data.newPsw = this.form1.newPassword
        p.data.id = this.id
        p.data = JSON.stringify(p.data)
        this.$api.post('user/editUser', p).then( r => {
          if(r.state == 0){
            this.$message({
              type: 'success',
              message: '修改成功'
            });
          }
        }).catch(f => {
          this.$message({
            type: 'info',
            message: f.errorInfo
          })
        })
        this.dialog1Visible = false
      },
      //删除
      sc() {
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var p = {
            flag:'delete',
            data:{}
          }
          p.data.tableName = this.tableName
          p.data.id = this.id
          p.data = JSON.stringify(p.data)
          this.$api.post('user/editUser', p).then( r => {
            if(r.state == 0){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }).catch( f => {
            this.$message({
              type: 'info',
              message: f.errorInfo
            })
          })
          this.dialogVisible = false
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>