<template>
  <div id="title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'Title'
}

</script>

<style scoped>
   #title {
      text-align: center;
      color: #217a91;
      font-size: 21px;
      margin: 5px 0 40px;
   }
</style>