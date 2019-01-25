<template>
  <el-menu :default-active="this.$route.path" mode="horizontal" background-color="#293c5C"
  text-color="#fff"
  active-text-color="#ffd04b" style="background:#293c5C;">
    
  <!-- active-text-color="#ffd04b" -->
    <template v-for="item in routers">
      <el-submenu v-if="item.children.length>1&&item.show != false" :index="item.path" :key="item.path">
        <template :index="item.path" slot="title">
          <Icon :className="item.meta.icon"></Icon>
          <span style="margin-left:1px;">{{item.name}}</span>
        </template>
        <template v-for="child in item.children">
          <router-link :key="child.path" :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path" :key="item.path" v-if="child.show != false">
              <template slot="title">
                <Icon :className="child.meta.icon"></Icon>
                <span>{{ child.name }}</span>
              </template>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
      <template v-else-if="item.children.length<=1&&item.show != false">
        <template v-for="child in item.children">
          <el-menu-item ref='nav' @click="go(item)" :index="item.path+'/'+child.path" :key="item.path">
            <template slot="title">
              <router-link :to="item.path+'/'+child.path">
                <Icon :className="child.meta.icon"></Icon>
                <span>{{ child.name }}</span>
              </router-link>
            </template>
          </el-menu-item>
        </template>
      </template>
    </template>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Content',
  props:{
    routers:Array
  },
  methods :{
    go(child) {
      for(var i in this.$refs.nav){
        if(this.$refs.nav[i].index.search(child.path) != -1){
          this.$refs.nav[i].$el.children[0].click()
        }
      }
    }
  }
}
</script>

<style scoped>
    a {
      text-decoration: none;
    }
    .el-menu--horizontal>.el-menu-item {
      line-height: 56px;
    }
</style>
<style>
    /*.Sidebar > ul> li > div {
      color:#fff !important
    }
    .Sidebar > ul> li > div:hover {
      color:#000 !important
    }
    #app > section > section > div > ul > li{
      color:#fff !important
    }
    #app > section > section > div > ul > li.el-menu-item.is-active > a {
      color:#111 !important
    }
    #app > section > section > div > ul > li:hover {
      color:#000 !important
    }*/
</style>
