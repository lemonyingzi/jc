<template>
   <div class="Sidebar">
      <Content :routers="MenuRouter"></Content>
   </div>
</template>

<script>
import Content from './Content'
import { mapGetters } from 'vuex'
export default {
  name : 'Sidebar',
  components: {
      Content
  },
  computed: {
    ...mapGetters([
      'MenuRouter'
    ])
  }
}
</script>

<style scoped>
    .Sidebar{
      background: #efeff3;
    }
</style>

