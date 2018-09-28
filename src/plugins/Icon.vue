<template>
  <i :class="svgClass" aria-hidden="true"></i>
</template>
<script>
export default {
  name: 'svg-icon',
  props: {
    className: {
      type: String
    }
  },
  computed: {
    svgClass() {
      if (this.className) {
        return 'iconfont icon-' + this.className
      } else {
        return 'iconfont'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>