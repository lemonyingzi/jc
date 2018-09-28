<template>
  <div id="title">
    {{ this.$route.params }}
  </div>
</template>

<script>
  console.log(this.$route)
export default {
  name:'test'
}

</script>

<style scoped>
   #title {
      text-align: center;
      color: #217a91;
      font-size: 21px;
      margin: 33px 0;
   }
</style>