// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import store from './store/store'
import permission from './permission'
import components from '@/plugins/components.js';
import api from '@/api/index.js'
import echarts from 'echarts'
import 'babel-polyfill'

Vue.prototype.$api = api
Vue.prototype.$echarts = echarts 

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI);
Vue.use(components);

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
