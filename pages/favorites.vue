<template lang="pug">
.favorites-page.column
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
      tableData: [],
      loading: true,
      starships: [],
    };
  },

  watch: {
    starships(starships) {
      const promises = [];

      starships.forEach((starship) => {
        if (starship.starred) {
          promises.push(this.api.starships.get(starship._id));
        }
      });

      Promise.all(promises).then((results) => {
        this.tableData = results;
        this.loading = false;
      }).catch(() => {
        // TODO: show an error message
      });
    },
  },
};
</script>

<style lang="stylus">
.favorites-page
  width 100%
</style>
