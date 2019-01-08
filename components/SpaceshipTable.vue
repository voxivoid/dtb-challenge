<template lang="pug">
  .spaceship-table.column
    .input.column
      label {{ $t("search") }}
      el-input(v-model="searchKeyword" :placeholder="$t('search')" @input="onInput")
    el-table(:data="tableData" v-loading="loading")
      el-table-column(:label="$t('name')", prop="name")
      el-table-column(:label="$t('model')", prop="model")
      el-table-column(:label="$t('manufacturer')", prop="manufacturer")
</template>

<script>
import starships from "@/mixins/api/starships";

export default {
  mixins: [starships],

  data() {
    return {
      loading: false,
      searchKeyword: "",
      tableData: [],
      typingTimer: null,
    };
  },

  async created() {
    this.search();
  },

  methods: {
    onInput() {
      this.loading = true;
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.search, 300); // waits 0.3s after the user stops writing before making the request
    },

    async search() {
      try {
        const { results } = await this.api.starships.search(this.searchKeyword);
        this.tableData = results;
      } catch (e) {
        // TODO: show an error
      } finally {
        this.loading = false;
      }
    },
  },

  i18n: {
    messages: {
      en: {
        name: "Name",
        model: "Model",
        manufacturer: "Manufacturer",
        search: "Search",
      },
      de: {
        name: "Name",
        model: "Modell",
        manufacturer: "Hersteller",
        search: "Suche",
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
.spaceship-table
  width 100%

  .input
    max-width 256px
    margin-bottom 16px

    label
      margin-bottom 8px
</style>
