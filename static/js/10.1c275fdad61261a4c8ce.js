webpackJsonp([10],{OEva:function(t,a){},lUPK:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("page-title",[t._v("设备管理")]),t._v(" "),e("el-row",{attrs:{gutter:40}},[e("el-col",{attrs:{xs:24,sm:24,lg:24}},[e("div",[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:""}},[e("el-table-column",{attrs:{type:"index",label:"序号","min-width":"160"}}),t._v(" "),e("el-table-column",{attrs:{prop:"prjName",label:"类型","min-width":"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"SubmitTime",label:"测点编号","min-width":"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"AuditTime",label:"设备ID","min-width":"100","max-width":"20"}}),t._v(" "),e("el-table-column",{attrs:{prop:"Analyst",label:" \n分析人员","min-width":"100","max-width":"20"}}),t._v(" "),e("el-table-column",{attrs:{prop:"Audit",label:"硬件版本号 \n","min-width":"100","max-width":"20"}}),t._v(" "),e("el-table-column",{attrs:{prop:"AuditResult",label:"软件版本号","min-width":"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"AuditResult",label:"设备状态","min-width":"100"}})],1),t._v(" "),e("div",{staticClass:"pagination-container",staticStyle:{"margin-top":"20px"}},[e("el-pagination",{attrs:{background:"","current-page":t.params.page,"page-sizes":[10,20,30,50],"page-size":t.params.rows,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])],1)],1)},staticRenderFns:[]};var n=e("VU/8")({data:function(){return{tableData:[],params:{page:1,rows:5},total:null}},methods:{loadData:function(){var t=this,a={page:this.params.page,rows:this.params.rows};this.$api.post("device/device",a,function(a){t.tableData=a.rows,t.total=a.total})},ccc:function(t){},handleSizeChange:function(t){this.params.rows=t,this.loadData()},handleCurrentChange:function(t){this.params.page=t,this.loadData()}},created:function(){this.loadData()}},l,!1,function(t){e("OEva")},"data-v-4f62c000",null);a.default=n.exports}});
//# sourceMappingURL=10.1c275fdad61261a4c8ce.js.map