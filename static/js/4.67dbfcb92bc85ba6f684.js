webpackJsonp([4],{"/WHo":function(e,t){},"9bBU":function(e,t,a){a("mClu");var l=a("FeBl").Object;e.exports=function(e,t,a){return l.defineProperty(e,t,a)}},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var l,i=a("C4MV"),n=(l=i)&&l.__esModule?l:{default:l};t.default=function(e,t,a){return t in e?(0,n.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},mClu:function(e,t,a){var l=a("kM2E");l(l.S+l.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},oPDf:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("bOdI"),i=a.n(l),n={data:function(){var e;return{tableData:[],params:{page:1,rows:5},switch1:"",total:null,dialogVisible:!1,activeName2:"first",form:(e={TaskName:"",Time:"",TabName:"",checkAll:"",Weeks:[],switch:""},i()(e,"checkAll",!1),i()(e,"options",[{label:"采集",type:[{label:"单个采集",type:[]},{label:"单一类型测点采集",type:[]},{label:"全部"}]}]),i()(e,"value",["采集"]),i()(e,"props",{value:"label",children:"type"}),e),num:"",Weekoption:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],isIndeterminate:!0}},methods:{newTask:function(){this.dialogVisible=!0,this.form.value=["采集"],this.form.switch=!0,this.form.TabName="first",this.num="",this.form.checkAll=[],this.form.Time="",this.form.Weeks=[]},handleItemChange:function(e){var t=this,a=null;3===e.length&&(a={type:e[2]}),("采集"!==e[0]||e[1]&&"全部"!==e[1])&&this.$api.post("task/EditTask",a,function(a){if("单个采集"===e[1])if(3===e.length)for(var l in a.data=a.data.map(function(e,t,a){return{label:e.text}}),t.form.options[0].type[0].type)t.form.options[0].type[0].type[l].label===e[2]&&(t.form.options[0].type[0].type[l].type=a.data);else a.data=a.data.map(function(e,t,a){return{label:e.text,type:[]}}),t.form.options[0].type[0].type=a.data;else"单一类型测点采集"===e[1]&&(a.data=a.data.map(function(e,t,a){return{label:e.text}}),t.form.options[0].type[1].type=a.data)})},loadData:function(){var e=this,t={page:this.params.page,rows:this.params.rows};this.$api.post("task/task",t,function(t){e.tableData=t.rows,e.total=t.total})},handleCheckAllChange:function(e){this.Weeks=e?this.Weekoption:[],this.isIndeterminate=!1},handleCheckedChange:function(e){var t=e.length;this.checkAll=t===this.Weekoption.length,this.isIndeterminate=t>0&&t<this.cities.length},edit:function(e){var t=e.row.Time,a=t.slice(0,2),l=t.slice(2).split(","),i=e.row.Operation.split(","),n=e.row.Operation.split(",");if(3===i.length?this.handleItemChange(i.pop()):4===i.length&&(this.handleItemChange(i.pop()),this.handleItemChange(n)),this.form.value=n,this.handleItemChange(i),this.form.switch="启用"===e.row.State,this.form.TaskName=e.row.TaskName,this.num="",this.form.checkAll=[],this.form.Time="",this.form.Weeks=[],"定时"===a)this.form.TabName="first",this.num=l[1].slice(5),this.form.Time=l[0];else if("每天"===a)this.form.TabName="second",this.form.checkAll=!0,this.form.Time=l[l.length-1].slice(5).replace(/\//g,"-")+" "+l[l.length-2];else if("每周"===a){this.form.TabName="third",this.form.Time=l[l.length-1].slice(5).replace(/\//g,"-")+" "+l[l.length-2];var s=l.slice(0,l.length-2);this.form.Weeks=s}this.dialogVisible=!0},handleSizeChange:function(e){this.params.rows=e,this.loadData()},handleCurrentChange:function(e){this.params.page=e,this.loadData()}},created:function(){this.loadData()}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("page-title",[e._v("任务列表")]),e._v(" "),a("el-row",{attrs:{gutter:40}},[a("el-col",{attrs:{xs:24,sm:24,lg:24}},[a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,stripe:""}},[a("el-table-column",{attrs:{type:"index",label:"序号","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"TaskName",label:"任务名","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"State",label:"状态","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Time",label:"时间","min-width":"100","max-width":"20"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Operation",label:"操作详情","min-width":"100","max-width":"20"}}),e._v(" "),a("el-table-column",{attrs:{prop:"act",label:"操作","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.edit(t)}}},[e._v("修改")])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container",staticStyle:{"margin-top":"20px",float:"left"}},[a("el-pagination",{attrs:{background:"","current-page":e.params.page,"page-sizes":[10,20,30,50],"page-size":e.params.rows,layout:"total, sizes, prev, pager, next, jumper",total:Number(e.total)},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-button",{staticStyle:{"margin-top":"20px",float:"right"},attrs:{type:"success"},on:{click:e.newTask}},[e._v("新增")])],1)])],1),e._v(" "),a("el-dialog",{attrs:{title:"任务设置",visible:e.dialogVisible,width:"750px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{attrs:{"label-position":"left","label-width":"90px"},model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"任务名称："}},[a("el-input",{staticStyle:{width:"220px"},model:{value:e.form.TaskName,callback:function(t){e.$set(e.form,"TaskName",t)},expression:"form.TaskName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"日期："}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.form.Time,callback:function(t){e.$set(e.form,"Time",t)},expression:"form.Time"}})],1)],1),e._v(" "),a("el-col",{staticStyle:{"padding-right":"5px"},attrs:{span:12}},[a("el-tabs",{attrs:{type:"border-card"},model:{value:e.form.TabName,callback:function(t){e.$set(e.form,"TabName",t)},expression:"form.TabName"}},[a("el-tab-pane",{attrs:{label:"定时",name:"first"}},[a("el-col",{staticStyle:{"margin-top":"10px"},attrs:{span:24}},[e._v("频率："),a("el-input-number",{attrs:{min:0},model:{value:e.num,callback:function(t){e.num=t},expression:"num"}}),e._v(" 分钟/一次\n            ")],1)],1),e._v(" "),a("el-tab-pane",{attrs:{label:"每天",name:"second"}},[e._v("每隔一天发生一次")]),e._v(" "),a("el-tab-pane",{staticStyle:{"margin-left":"20px"},attrs:{label:"每周",name:"third"}},[a("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.form.checkAll,callback:function(t){e.$set(e.form,"checkAll",t)},expression:"form.checkAll"}},[e._v("全选")]),e._v(" "),a("div",{staticStyle:{margin:"15px 0"}}),e._v(" "),a("el-checkbox-group",{on:{change:e.handleCheckedChange},model:{value:e.form.Weeks,callback:function(t){e.$set(e.form,"Weeks",t)},expression:"form.Weeks"}},e._l(e.Weekoption,function(t){return a("el-col",{key:t,attrs:{span:8}},[a("el-checkbox",{attrs:{label:t}},[e._v(e._s(t))])],1)}))],1)],1)],1),e._v(" "),a("el-col",{staticStyle:{"padding-left":"5px"},attrs:{span:12}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("操作")]),e._v(" "),a("div",{staticStyle:{float:"right"}},[e._v("任务状态：\n            "),a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.form.switch,callback:function(t){e.$set(e.form,"switch",t)},expression:"form.switch"}})],1)]),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-cascader",{staticStyle:{width:"300px","margin-bottom":"20px"},attrs:{options:e.form.options,props:e.form.props},on:{"active-item-change":e.handleItemChange},model:{value:e.form.value,callback:function(t){e.$set(e.form,"value",t)},expression:"form.value"}})],1)],1)],1)],1),e._v(" "),a("div",{staticStyle:{clear:"both","text-align":"center"}},[a("el-button",{staticStyle:{"margin-top":"10px"},attrs:{type:"success"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确定")])],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(n,s,!1,function(e){a("/WHo")},"data-v-29158157",null);t.default=o.exports}});
//# sourceMappingURL=4.67dbfcb92bc85ba6f684.js.map