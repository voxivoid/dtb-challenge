<template lang="pug">
.column.input
  label {{ $t('language') }}
  el-select(v-model="locale" @change="updateLocale")
    el-option(v-for="locale in locales" :key="locale.code" :label="locale.name" :value="locale.code")
</template>

<script>
import { locales } from "@/i18n";

export default {
  data() {
    return {
      locale: "en",
      locales,
    };
  },

  methods: {
    updateLocale(locale) {
      this.$router.push(this.switchLocalePath(locale));
    },
  },

  i18n: {
    messages: {
      en: {
        language: "Language",
      },
      de: {
        language: "Sprache",
      },
    },
  },
};
</script>

<style lang="stylus">
</style>
