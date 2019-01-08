<template lang="pug">
div
  i.fas.fa-star(v-if="starred")
  i.far.fa-star(v-else)
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

</style>
