<template lang="pug">
  div
    div {{ $t('teste')}}
    button(@click="locale")
</template>

<script>

export default {
  data() {
    return {
      teste: null,
    };
  },

  created() {
  },

  methods: {
    locale() {
      this.$router.push(this.switchLocalePath('de'));
    },
  },
  i18n: {
    messages: {
      en: {
        teste: 'en',
      },
      de: {
        teste: 'de',
      },
    },
  },
};
</script>

<style lang="stylus">

h1
  color red
</style>
