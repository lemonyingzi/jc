<template>
  <div>
    <page-title>任务列表</page-title>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" min-width="160"></el-table-column>
            <el-table-column prop="TaskName" label="任务名" min-width="100"></el-table-column>
            <el-table-column prop="State" label="状态" min-width="100"></el-table-column>
            <el-table-column prop="Time" label="时间" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="Operation" label="操作详情" min-width="100" max-width="20"></el-table-column>
            <el-table-column prop="act" label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button @click="edit(scope)"  size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container" style="margin-top: 20px;float: left;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10,20,30,50]" :page-size="params.rows" layout="total, sizes, prev, pager, next, jumper" :total="Number(total)">
            </el-pagination>
          </div>
          <el-button style="margin-top: 20px;float: right;" @click="newTask" type="success">新增</el-button>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="750px">
      <el-form label-position="left" v-model="form" label-width="90px">
        <el-col :span="12">
          <el-form-item label="任务名称：">
            <el-input :disabled="flag !== 'Add'" style="width: 220px;" v-model="form.TaskName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="日期：">
            <el-date-picker
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.Time"
            type="datetime"
            placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="padding-right: 5px;">
          <el-tabs v-model="form.TabName" type="border-card">
            <el-tab-pane label="定时" name="定时">
              <el-col :span="24" style="margin-top: 10px;">频率：<el-input-number v-model="num" :min="1"></el-input-number>&nbsp;分钟/一次
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="每天" name="每天">每隔一天发送一次</el-tab-pane>
            <!-- 每天两次（上午：4:00；下午：18:00） -->
            <el-tab-pane label="每周" name="每周" style="margin-left: 20px;">
              <el-checkbox :indeterminate="isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="form.Weeks" @change="handleCheckedChange">
                <el-col :key="day" v-for="day in Weekoption" :span="8"><el-checkbox :label="day" >{{day}}</el-checkbox></el-col>
              </el-checkbox-group>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="12" style="padding-left: 5px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>操作</span>
              <div style="float: right;">任务状态：
              <el-switch
                v-model="form.switch"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </div>
            </div>
            <el-col :span="24">
              <el-cascader
                style="width: 300px;margin-bottom: 20px"
                v-model="form.value"
                :options="form.options"
                @active-item-change="handleItemChange"
                :props="form.props"
              ></el-cascader>
            </el-col>
          </el-card>
        </el-col>
      </el-form>
      <div style="clear: both;text-align: center;">
        <el-button style="margin-top: 10px;" @click="qr" type="success">确定</el-button>
        <el-button v-if="flag!=='Add'" style="margin-top: 10px;" @click="del" type="danger">删除</el-button>
      </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
    data() {
      return {
        tableData: [],
        params: {
          page: 1,
          rows: 10
        },
        switch1:'',
        total: null,
        dialogVisible:false,
        activeName2:'每天',
        form:{
          TaskName:'',
          Time:'',
          TabName:"",
          checkAll:'',
          Weeks:["星期一"],
          switch:'',
          checkAll: false,
          options: [{
            label: '采集',
            type: [{
              label: '单个采集',
              type:[]
            },{
              label: '单一类型测点采集',
              type:[]
            },{
              label: '全部',
            }]
          }],
          value:['采集'],
          props: {
            value: 'label',
            children: 'type'
          }
        },
        flag:"",
        num:"60",
        Weekoption: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        isIndeterminate: true,
        title:'新增任务'
      }
    },
    methods: {
      newTask() {
        this.title = "新增任务"
        this.dialogVisible = true
        this.flag = "Add"
        this.form.value = ["采集","全部"]
        this.form.switch = true
        // this.form.TaskName = "未命名"
        this.form.TabName = "每天"
        this.num = ""
        this.form.checkAll = []
        this.form.Time = ""
        this.form.Weeks = []
      },
      handleItemChange(val) {
        let p = null
        if(val.length === 3){
          p = {
            type:val[2]
          }
        }
        if(val[0]!=="采集"||(val[1]&&val[1]!=="全部")){
          this.$api.post('task/EditTask', p).then( r => {
            if(val[1] === "单个采集"){
              if(val.length === 3){
                r.data = r.data.map((value,index,arr) => {
                  return {"label":value.text}
                })
                for(var i in this.form.options[0].type[0].type){
                  if(this.form.options[0].type[0].type[i].label === val[2]){
                    this.form.options[0].type[0].type[i].type = r.data
                  }
                }
              }else{
                r.data = r.data.map((value,index,arr) => {
                  return {"label":value.text,"type":[]}
                })
                this.form.options[0].type[0].type = r.data
              }
            }else if(val[1] === "单一类型测点采集"){
              r.data = r.data.map((value,index,arr) => {
                return {"label":value.text}
              })
              this.form.options[0].type[1].type = r.data
            }
          })
        }
      },
      loadData() {
        var v = this
        var a = {
          page :this.params.page,
          rows :this.params.rows
        }
        this.$api.post('task/task', a).then( r => {
          v.tableData = r.rows
          v.total = r.total
        })
      },
      handleCheckAllChange(val) {
        this.form.Weeks = val ? this.Weekoption : [];
        this.isIndeterminate = false;
      },
      handleCheckedChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.Weekoption.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.Weekoption.length;
      },
      edit(scope) {
        this.title = "修改任务"
        this.flag = "Update"
        var time = scope.row.Time
        var type = time.slice(0, 2);
        var timedata = time.slice(2);
        var arr = timedata.split(",");
        var optionArr = scope.row.Operation.split(",")
        var optionArr1 = scope.row.Operation.split(",")
        if(optionArr.length === 3){
          this.handleItemChange(optionArr.pop())
        }else if(optionArr.length === 4){
          this.handleItemChange(optionArr.pop())
          this.handleItemChange(optionArr1)
        }
        this.form.value = optionArr1
        this.handleItemChange(optionArr)
        this.form.switch = scope.row.State === "启用"?true:false
        this.form.TaskName = scope.row.TaskName
        this.num = ""
        this.form.checkAll = []
        this.form.Time = ""
        this.form.Weeks = []
        if (type === "定时") {
          this.form.TabName = "定时"
          this.num = arr[1].slice(5)
          this.form.Time = arr[0]
        } else if (type === "每天") {
          this.form.TabName = "每天"
          this.form.checkAll = true
          this.form.Time = arr[arr.length - 1].slice(5).replace(/\//g, "-") + " " + arr[arr.length - 2]
        } else if (type === "每周") {
          this.form.TabName = "每周"
          this.form.Time = arr[arr.length - 1].slice(5).replace(/\//g, "-") + " " + arr[arr.length - 2]
            var weekdata = arr.slice(0, arr.length - 2);
            this.form.Weeks = weekdata
        }
        this.dialogVisible = true
      },
      handleSizeChange(val) {
        this.params.rows = val
        this.loadData()
      },
      handleCurrentChange (val){
        this.params.page = val
        this.loadData()
      },
      del() {
        this.$confirm('是否删除该任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var p = {
            flag:"Delete",
            TaskName:this.form.TaskName
          }
          this.$api.post('/task/taskCtrl',p).then(r => {
            this.dialogVisible = !this.dialogVisible
            this.loadData()
            this.$message({
              type: 'success',
              message: '删除任务指令已发送至远程服务器，等耐心等待!'
            })
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      qr() {
        console.log(this.form.Time)
        if(this.form.TaskName === ""||this.form.TaskName === null){
          this.$message({
            type: 'info',
            message: '任务名称不可为空'
          });
          return
        }
        if(this.form.Time === ""||this.form.Time === null){
          this.$message({
            type: 'info',
            message: '日期不可为空'
          });
          return
        }
        if(this.form.TabName === "每周"&&this.form.Weeks.length === 0){
          this.$message({
            type: 'info',
            message: '每周选项不可为空'
          });
          return
        }
        var p = {
          flag:this.flag
        }
        p.data = {
          TaskName:this.form.TaskName,
        }
        var Time = ""
        if(this.form.TabName === "每天"){
          Time = this.form.TabName + this.form.Time.slice(11,21) + ",开始时间:" + this.form.Time.slice(0,10)
        }else if(this.form.TabName === "每周"){
          Time = this.form.TabName + this.form.Weeks.join(",") + "," + this.form.Time.slice(11,21) + ",开始时间:" + this.form.Time.slice(0,10)
        }else{
          Time = this.form.TabName + this.form.Time + ",间隔时间：" + this.num
        }
        p.data.Time = Time
        p.data.Operation = this.form.value.join(",")
        p.data.State = this.form.switch === true?"启用":"暂停"
        p.data = JSON.stringify(p.data)
        this.$api.post('/task/taskCtrl',p).then(r => {
          this.dialogVisible = !this.dialogVisible
          this.loadData()
          this.$message({
            type: 'success',
            message: '指令已发送至远程服务器，等耐心等待'
          });
        })
      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>