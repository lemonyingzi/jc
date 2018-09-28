<template>
   <div class="icon">
   	<img :src="url" />
   </div>
</template>

<script>
export default {
  name : 'Icon',
  props: {
      url:String
  }
}
</script>

<style scoped>
    .icon {
    	margin-right: 25px;
    }
</style>

