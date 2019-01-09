<template lang="pug">
  .spaceship-table.column

    .input.column
      label {{ $t("search") }}
      el-input(v-model="searchKeyword" :placeholder="$t('search')" @input="onInput")

    el-table(:data="tableData" v-loading="loading" default-expand-all)
      el-table-column(width="48" fixed)
        .row.justify-center.align-center(slot-scope="scope")
          star(:starred="isStarred(scope.row)" @click.native="updateFavorites(scope.row)")

      el-table-column(:label="$t('name')" prop="name" min-width="128px")
      el-table-column(:label="$t('model')" prop="model" min-width="128px")
      el-table-column(:label="$t('manufacturer')" prop="manufacturer" min-width="128px")

      el-table-column(width="48" fixed="right" type="expand")
        template(slot-scope="scope")
          tags(:starships="starships" :starship="scope.row")
</template>

<script>
import Star from "@/components/Star.vue";
import Tags from "@/components/Tags.vue";

import breakpointsUtils from "@/mixins/utils/breakpoints";
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
    breakpointsUtils,
    starshipsApi,
    starshipsPouchdb,
  ],

  data() {
    return {
      loading: true,
      searchKeyword: "",
      typingTimer: null,
      tableData: [],
    };
  },

  computed: {
    md() {
      console.log(this.size.md_and_up);
      return this.size.md_and_up;
    },
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
  },

  i18n: {
    messages: {
      en: {
        name: "Name",
        model: "Model",
        search: "Search",
        manufacturer: "Manufacturer",
        tags: "Tags",
      },
      de: {
        name: "Name",
        model: "Modell",
        search: "Suche",
        manufacturer: "Hersteller",
        tags: "Stichworte",
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
