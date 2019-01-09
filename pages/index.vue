<template lang="pug">
.search-page.column

  .search.row.align-end.justify-space-between.wrap
    .input.column
      label {{ $t("search") }}
      el-input(v-model="searchKeyword" :placeholder="$t('search')" @input="onInput" clearable)

    .input.column
      el-collapse(v-model="filterCollapse" accordion)
        el-collapse-item(:title="$t('filter')" name="1")
          .column
            label {{ $t("byTag") }}
            el-input(v-model="tagFilter" :placeholder="$t('search')" @input="onInput" clearable)

  spaceship-table(:starships="starships" :loading="loading" :tableData="tableData")
</template>

<script>
import SpaceshipTable from "@/components/SpaceshipTable.vue";

import starshipsApi from "@/mixins/api/starships";

export default {
  pouch: {
    starships: {},
  },

  components: {
    SpaceshipTable,
  },

  mixins: [
    starshipsApi,
  ],

  data() {
    return {
      searchKeyword: "",
      tagFilter: "",
      typingTimer: null,
      filterCollapse: null,
      loading: true,
      tableData: [],
    };
  },

  async created() {
    await this.search();
  },

  methods: {
    locale() { // FIXME:
      this.$router.push(this.switchLocalePath("de"));
    },

    onInput() {
      this.loading = true;
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.search, 300); // waits 0.3s after the user stops writing before making the request
    },

    async search() {
      if (this.tagFilter && !this.searchKeyword) {
        this.filterByTag();
        return;
      }

      try {
        this.loading = true;

        let { results } = await this.api.starships.search(this.searchKeyword);

        if (this.tagFilter) {
          results = results.filter(starship => this.hasTag(starship, this.tagFilter));
        }

        this.tableData = results;
      }
      catch (e) {
        // TODO: show an error
      }
      finally {
        this.loading = false;
      }
    },

    filterByTag() {
      this.loading = true;
      const promises = [];

      this.starships.forEach((starship) => {
        if (starship.tags && starship.tags.includes(this.tagFilter)) {
          promises.push(this.api.starships.get(starship._id));
        }
      });

      Promise.all(promises).then((results) => {
        this.tableData = results;

        this.loading = false;
      }).catch(() => {
        // TODO: show an error
      });
    },

    hasTag(starship, tag) {
      return this.starships && !!this.starships.find(s => s._id === starship.url && s.tags && s.tags.includes(tag));
    },
  },

  i18n: {
    messages: {
      en: {
        search: "Search",
        filter: "Filter",
        byTag: "By tag",
      },
      de: {
        search: "Suche",
        filter: "Filter",
        byTag: "",
      },
    },
  },
};
</script>

<style lang="stylus">
@import '~assets/breakpoints'

.search-page
  width 100%
</style>
