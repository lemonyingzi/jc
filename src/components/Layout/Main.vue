<template>
	<el-main style="overflow: auto;margin-top: 20px">
        <!-- <router-view></router-view> -->
	    <keep-alive>
		    <router-view v-if="$route.meta.keepAlive" :key="$route.params.id"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive" :key="$route.params.id"></router-view>
	</el-main>
</template>
   
<script>
export default {
  name : 'Layout',
}

</script>

<style scoped>

</style>