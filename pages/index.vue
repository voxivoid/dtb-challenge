<template lang="pug">
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

h1
  color red
</style>
