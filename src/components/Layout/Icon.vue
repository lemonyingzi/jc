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
    .icon:hover {
      cursor: pointer;
      opacity: 1
    }
    .icon {
      margin-right: 25px;
      opacity: .6
    }
</style>

