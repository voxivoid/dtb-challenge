<template lang="pug">
  .spaceship-table.column

    .search.row.align-center.justify-space-between.wrap
      .input.column.flex-sm-12
        label {{ $t("search") }}
        el-input(v-model="searchKeyword" :placeholder="$t('search')" @input="onInput" clearable)

      .input.column.flex-sm-12
        el-collapse(v-model="filterCollapse" accordion)
          el-collapse-item(:title="$t('filter')" name="1")
            .row.justify-space-between.align-end
              star(:starred="favoritesFilter" @click.native="toggleFavoritesFilter")

              .column
                label {{ $t("byTag") }}
                el-input(v-model="tagFilter" :placeholder="$t('search')" @input="onInput" clearable)

    el-table(:data="tableData" v-loading="loading" default-expand-all)
      el-table-column(width="48" fixed)
        .row.justify-center.align-center(slot-scope="scope")
          star(:starred="isStarred(scope.row)" @click.native="updateFavorites(scope.row)")

      el-table-column(:label="$t('name')" prop="name" min-width="128px")
      el-table-column(:label="$t('model')" prop="model" min-width="128px")
      el-table-column(:label="$t('manufacturer')" prop="manufacturer" min-width="128px")

      el-table-column(width="24" fixed="right" type="expand")
        template(slot-scope="scope")
          tags(:starships="starships" :starship="scope.row")
</template>

<script>
import Star from "@/components/Star.vue";
import Tags from "@/components/Tags.vue";

import starshipsApi from "@/mixins/api/starships";
import starshipsPouchdb from "@/mixins/pouchdb/starships";

export default {
  pouch: {
    starships: {},
  },

  components: {
    Star,
    Tags,
  },

  mixins: [
    starshipsApi,
    starshipsPouchdb,
  ],

  data() {
    return {
      loading: true,
      searchKeyword: "",
      typingTimer: null,
      tableData: [],
      filterCollapse: null,
      favoritesFilter: false,
      tagFilter: "",
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
        this.loading = true;

        let { results } = await this.api.starships.search(this.searchKeyword);

        if (this.favoritesFilter) {
          results = results.filter(starship => this.isStarred(starship));
        }

        if (this.tagFilter) {
          results = results.filter(starship => this.hasTag(starship, this.tagFilter));
          console.log(results);
        }

        this.tableData = results;
      }
      catch (e) {
        console.log(e);
        // TODO: show an error
      }
      finally {
        this.loading = false;
      }
    },

    toggleFavoritesFilter() {
      this.favoritesFilter = !this.favoritesFilter;
      this.search();
    },

    async updateFavorites(starship) {
      try {
        const starshipDB = await this.getStarship(starship.url);

        if (starshipDB) {
          await this.putStarship({ _id: starshipDB._id, _rev: starshipDB._rev, starred: !starshipDB.starred });
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

    isStarred(starship) {
      return this.starships && !!this.starships.find(s => s._id === starship.url && s.starred);
    },

    hasTag(starship, tag) {
      return this.starships && !!this.starships.find((s) => {
        // console.log(s.tags);
        // console.log(tag);
        const a = "lol";
        return s._id === starship.url && s.tags && s.tags.includes(tag);
      });
    },
  },

  i18n: {
    messages: {
      en: {
        name: "Name",
        model: "Model",
        search: "Search",
        manufacturer: "Manufacturer",
        tags: "Tags",
        filter: "Filter",
        byTag: "By tag",
      },
      de: {
        name: "Name",
        model: "Modell",
        search: "Suche",
        manufacturer: "Hersteller",
        tags: "Stichworte",
        filter: "Filter",
        byTag: "",
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/breakpoints'

.spaceship-table
  width 100%

  .input
    width 100%
    margin-bottom 16px

    @media $breakpoints-spec.md-and-up
      max-width 256px

    label
      margin-bottom 8px

.el-table
  & >>> .cell
    word-break normal
</style>
