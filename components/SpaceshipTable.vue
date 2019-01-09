<template lang="pug">
.spaceship-table
  el-table(:data="tableData" v-loading="loading" default-expand-all)
    el-table-column(width="48" fixed)
      .row.justify-center.align-center(slot-scope="scope")
        star(:starred="isStarred(scope.row)" @click.native="updateFavorites(scope.row)")

    el-table-column(:label="$t('name')" prop="name" min-width="128px")
    el-table-column(:label="$t('model')" prop="model" min-width="128px")
    el-table-column(:label="$t('manufacturer')" prop="manufacturer" min-width="128px")

    el-table-column(width="24" fixed="right" type="expand")
      template(slot-scope="scope")
        .tags
          p {{ $t("tags") }}
          tags(:starships="starships" :starship="scope.row")
</template>

<script>
import Star from "@/components/Star.vue";
import Tags from "@/components/Tags.vue";

import starshipsPouchdb from "@/mixins/pouchdb/starships";

export default {
  components: {
    Star,
    Tags,
  },

  mixins: [
    starshipsPouchdb,
  ],

  props: {
    starships: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      required: true,
    },
  },

  methods: {
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
.el-table
  & >>> .cell
    word-break normal

.tags
  p
    margin-bottom 16px
    font-size 12px
    color #909399
</style>
