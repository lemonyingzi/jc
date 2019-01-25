import Vue from 'vue'
import Vuex from 'vuex'
import{ MenuRouter } from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   	MenuRouter,
   	prjID:null,
    ID:null,
    Type:[],
    page:'/Proj',
    MonitorPointType:[]
  },
  getters :{
   	MenuRouter :state => state.MenuRouter,
    prjID :state => state.prjID,
    ID :state => state.ID,
    Type :state => state.Type,
    page :state => state.page,
    MonitorPointType :state => state.MonitorPointType
  },
  mutations :{
    changePrjID(state, prjID) {
      state.prjID = prjID
    },
    changeType(state, Type) {
      state.Type = Type
    },
    changeID(state, ID) {
      state.ID = ID
    },
    changepage(state,page) {
      state.page = page
    },
    changeMonitorPointType(state,Type) {
      state.MonitorPointType = Type
    }
  }
})