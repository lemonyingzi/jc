import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
// import Layout1 from '@/test/Layout'
Vue.use(Router)

export const MenuRouter = [
    {
      path: '/Login',
      // redirect: 'Login',
      component: () => import('@/views/Login/Login'),
      name: '登录',
      show: false,
      children: []
    },
    {
      path: '/Pending',
      component: Layout,
      redirect: 'Pending',
      meta:{icon:'daichuli'},
      children: [{
      	path: '',
      	name: '待处理',
      	component: () => import('@/views/Pending/Pending'),
        meta:{icon:'daichuli'}
      }]
    },
    {
      path: '/Proj',
      component: Layout,
      name: '工程',
      meta:{icon:'gongcheng'},
      children: [{
      	path: 'BuildingProj',
      	name: '在建',
      	component: () => import('@/views/Proj/BuildingProj'),
        meta:{icon:'zaijiangongchengshigongxianchang'}
      },{
      	path: 'CompletedProj',
      	name: '已完工',
      	component: () => import('@/views/Proj/CompletedProj'),
        meta:{icon:'yiwancheng'}
      },{
        path: 'ProjectManagement',
        name: '工程管理',
        component: () => import('@/views/Proj/ProjectManagement'),
        meta:{icon:'gongchengguanli'}
      },{
        path: 'ChildPrj',
        name: '工程首页',
        show: false,
        component: () => import('@/views/Proj/ChildPrj')
      }]
    },
    {
      path: '/Audit',
      component: Layout,
      name: '审核批准',
      meta:{icon:'shenhe'},
      children: [{
        path: 'UncompletedAudit',
        name: '未审核',
        component: () => import('@/views/Audit/UncompletedAudit'),
        meta:{icon:'daishenhe'}
      },{
        path: 'CompletedAudit',
        name: '已审核',
        component: () => import('@/views/Audit/CompletedAudit'),
        meta:{icon:'yishenhe'}
      }]
    },
    {
      path: '/Device',
      component: Layout,
      redirect: '/Device/Device',
      meta:{icon:'shebei'},
      children: [{
        path: 'Device',
        name: '设备',
        component: () => import('@/views/Device/Device'),
        meta:{icon:'shebei'}
      }]
    },
    {
      path: '/User',
      component: Layout,
      redirect: '/User/User',
      show: false,
      children: [{
        path: 'User',
        name: '用户',
        component: () => import('@/views/User/User')
      }]
    },
    {
      path: '/Report',
      component: Layout,
      show: false,
      redirect: '/Report/NewReport',
      children: [{
        path: 'NewReport',
        name: '报表',
        component: () => import('@/views/Report/NewReport')
      },{
        path: 'NewReport_datatable/:id',
        name: '数据报表',
        meta: {
          keepAlive:true
        },
        component: () => import('@/views/Report/NewReport_datatable')
      },{
        path: 'HistoryReport',
        name: '历史报表',
        component: () => import('@/views/Report/HistoryReport')
      },{
        path: 'NewReport_detail',
        name: '水位水准数据报表详情',
        component: () => import('@/views/Report/NewReport_detail')
      },{
        path: 'NewReport_detail_DHD',
        name: '深层水平位移数据报表详情',
        component: () => import('@/views/Report/NewReport_detail_DHD')
      },{
        path: 'NewReport_detail_SSAF',
        name: '钢支撑轴力数据报表详情',
        component: () => import('@/views/Report/NewReport_detail_SSAF')
      },{
        path: 'NewReport_detail_CSAF',
        name: '混凝土支撑轴力数据报表详情',
        component: () => import('@/views/Report/NewReport_detail_CSAF')
      }]
    },
    {
      path: '/MonitorPoint',
      component: Layout,
      show: false,
      redirect: '/MonitorPoint/MonitorPoint',
      children: [{
        path: 'MonitorPoint',
        name: '监测点',
        component: () => import('@/views/MonitorPoint/MonitorPoint')
      },{
        path: 'MonitorPointProject/:title/:id/:mpID',
        name: '历史数据',
        component: () => import('@/views/MonitorPoint/MonitorPointProject')
      }]
    },
    {
      path: '/Task',
      component: Layout,
      redirect: '/Task/Task',
      show: false,
      children: [{
        path: 'Task',
        name: '任务',
        component: () => import('@/views/Task/Task')
      }]
    }
  ]

export default new Router({
  routes: MenuRouter
  // mode: 'history'
})
