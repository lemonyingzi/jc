import Vue from 'vue'
import Vuex from 'vuex'
import{ MenuRouter } from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
   	MenuRouter,
   	prjID:null,
      Type:[]
   },
   getters :{
   	MenuRouter :state => state.MenuRouter,
   	prjID :state => state.prjID,
      Type :state => state.Type
   },
   mutations :{
      changePrjID(state, prjID) {
        state.prjID = prjID
   	},
      changeType(state, Type) {
        state.Type = Type
      }
   }
})