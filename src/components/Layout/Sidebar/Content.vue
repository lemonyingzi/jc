<template>
  <div class="menu-wrapper">
    <template v-for="item in jcd">
      <el-submenu v-if="item.children" :index="item.id" :key="item.id">
        <template slot="title">{{item.title}}</template>
        <template v-for="child in item.children">
          <el-submenu :index="child.id" :key="child.id" v-if="child.children">
            <template slot="title">
              <span>{{ child.title }}</span>
            </template>
            <template v-for="childn in child.children" >
              <router-link :key="childn.mpID" :to="'/MonitorPoint/MonitorPointProject/'+child.title+'/'+childn.title+'/'+childn.mpID">
                <el-menu-item  :index="childn.mpID" v-if="child.children">
                  <template slot="title">
                    <span>{{ childn.title }}</span>
                  </template>
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
          <template v-else>
            <el-menu-item :index="child.id" :key="child.id">
              <template slot="title">
                <span>{{ child.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-submenu>
      <template v-else>
        <el-menu-item :index="item.id" :key="item.id">
          <template slot="title">
            <span>{{ item.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
    <router-link :to="'/Task/Task'">
      <el-menu-item index="'-1'">
        <template slot="title">
          <span>任务</span>
        </template>
      </el-menu-item>
    </router-link>
    <el-submenu index="'-4'">
      <template slot="title">
        <span>报表</span>
      </template>
      <router-link :to="'/Report/NewReport'">
        <el-menu-item index="'-2'">
            <template slot="title">
              <span>新增报表</span>
            </template>
        </el-menu-item>
      </router-link>
      <router-link :to="'/Report/HistoryReport'">
        <el-menu-item index="'-3'">
          <template slot="title">
            <span>历史报表</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-submenu>
  </div>  
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Content',
  data (){
    return {
      MenuRouter:[],
      jcd:[]
    }
  },
  computed :{
    ...mapGetters([
      'prjID'
    ])
  },
  methods: {
    loadData (){
      var v = this;
      this.$api.post('/menu',{prjID:v.prjID},r => {
        v.MenuRouter = r.PrjMenu[0];
        v.jcd = [];
        v.jcd.push(r.PrjMenu[0].children[0]) 
        v.$emit('projectName',r.PrjMenu[0])
      })
    }
  },
  created (){
    this.loadData()
  },
  watch :{
    prjID :function(){
      this.loadData()
    }
  }
}
</script>

<style scoped>
    a {
      text-decoration: none;
    }
</style>