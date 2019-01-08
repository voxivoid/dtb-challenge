<template lang="pug">
  .spaceship-table.column

    .input.column
      label {{ $t("search") }}
      el-input(v-model="searchKeyword" :placeholder="$t('search')" @input="onInput")

    el-table(:data="tableData" v-loading="loading")
      el-table-column(:label="$t('name')", prop="name")
      el-table-column(:label="$t('model')", prop="model")
      el-table-column(:label="$t('manufacturer')", prop="manufacturer")
      el-table-column
        .row.justify-center.align-center(slot-scope="scope")
          star(:starred="isStarred(scope.row)" @click.native="updateFavorites(scope.row)")
</template>

<script>
import Star from "@/components/Star.vue";

import starships from "@/mixins/api/starships";

export default {
  pouch: {
    starships: {},
  },

  components: {
    Star,
  },

  mixins: [starships],

  data() {
    return {
      loading: false,
      searchKeyword: "",
      typingTimer: null,
      tableData: [],
    };
  },

  async created() {
    await this.search();
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
      }
      catch (e) {
        // TODO: show an error
      }
      finally {
        this.loading = false;
      }
    },

    async updateFavorites(starship) {
      try {
        const s = await this.getStarship(starship.url);

        if (s) {
          await this.putStarship({ _id: s._id, _rev: s._rev, starred: !s.starred });
        }
        else {
          // if it does not exist it means that is not starred
          await this.putStarship({ _id: starship.url, starred: true });
        }
      }
      catch (e) {
        // TODO: show an error
      }
    },

    async getStarship(id) {
      try {
        return await this.$pouch.get("starships", id);
      }
      catch (e) {
        return null;
      }
    },

    async putStarship(starship) {
      try {
        await this.$pouch.put("starships", starship);
      }
      catch (e) {
        // TODO: show an error
      }
    },

    isStarred(starship) {
      return !!this.starships.find(s => s._id === starship.url && s.starred);
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
