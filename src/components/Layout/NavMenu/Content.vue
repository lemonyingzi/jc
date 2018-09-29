<template>
  <el-menu mode="horizontal">
    <template v-for="item in routers">
      <el-submenu v-if="item.children.length>1&&item.show != false" :index="item.path">
        <template :index="item.path" slot="title"><Icon :className="item.meta.icon"></Icon>{{item.name}}</template>
        <template v-for="child in item.children">
          <router-link :to="item.path+'/'+child.path">
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
          <el-menu-item :index="item.path+'/'+child.path" :key="item.path">
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
export default {
   name: 'Content',
   props:{
    routers:Array
   }
}
</script>

<style scoped>
    a {
      text-decoration: none;
    }
    .el-menu--horizontal>.el-menu-item{
      line-height: 56px;
    }
</style>

