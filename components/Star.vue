<template lang="pug">
.star
  i.el-icon-star-on(v-if="starred")
  i.el-icon-star-off(v-else)
</template>

<script>
export default {
  props: {
    starred: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
$color-gold = #f7c31d

i
  font-size 24px
  cursor pointer

.el-icon-star-off
  transition all 0.2s ease-in

  &:hover
    color $color-gold

.el-icon-star-on
  color $color-gold
</style>
