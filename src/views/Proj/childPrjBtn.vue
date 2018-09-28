<template>
  <router-link :to="src">
    <div class="ChildPrjBtn">
      <div style="height:45px;"><img :src="url" /></div>
      <div style="text-align:center;">{{ title }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name:'Title',
  props: {
    url:String,
    title:String,
    src:String
  }
}

</script>

<style scoped>
  .ChildPrjBtn {
    border-radius:5px;
    margin-left:7px;
    display:inline-block;
    height:85px;
    width:89px;
    font-size:14px;
    background:#f7f7f7;
    text-align:center;
    padding-top:15px;
    border:1px solid #eeeff2;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: black
  }
</style>