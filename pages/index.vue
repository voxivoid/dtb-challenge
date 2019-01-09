<template lang="pug">
  .column.align-center
    .container
      .row.justify-center
        h1 SWAPI Super Search
      spaceship-table
</template>

<script>
import SpaceshipTable from "@/components/SpaceshipTable.vue";

export default {
  components: {
    SpaceshipTable,
  },

  data() {
    return {
      teste: null,
    };
  },

  created() {
  },

  methods: {
    locale() {
      this.$router.push(this.switchLocalePath("de"));
    },
  },
  i18n: {
    messages: {
      en: {
        teste: "en",
      },
      de: {
        teste: "de",
      },
    },
  },
};
</script>

<style lang="stylus">
@import '~assets/breakpoints'

.container
  padding 64px 8px
  width 100%
  max-width "%s" % $breakpoints.xl

  @media $breakpoints-spec.sm-and-up
    padding 64px

h1
  margin-bottom 64px
</style>
