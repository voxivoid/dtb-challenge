<template lang="pug">
.row.gutters.wrap
  div(v-for="tag in getTags()" :key="tag")
    el-tag(
      closable
      :disable-transitions="false"
      @close="removeTag(tag)"
    ) {{ tag }}

  div(v-if="inputVisible")
    el-input(
      v-model="inputValue"
      ref="saveTagInput"
      size="mini"
      @keyup.enter.native="addTag(inputValue)"
      @blur="addTag(inputValue)"
    )

  div(v-else)
    el-button(
      size="small"
      @click="showInput"
    ) +
</template>

<script>
import starshipsPouchdb from "@/mixins/pouchdb/starships";

export default {
  mixins: [
    starshipsPouchdb,
  ],

  props: {
    starships: {
      type: Array,
      default: () => [],
    },

    starship: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      inputVisible: false,
      inputValue: "",
    };
  },

  methods: {
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    closeInput() {
      this.inputVisible = false;
      this.inputValue = "";
    },

    getTags() {
      if (this.starships) {
        const starship = this.starships.find(s => s._id === this.starship.url && s.tags);

        return (starship && starship.tags) || [];
      }

      return [];
    },

    async removeTag(tag) {
      try {
        const starshipDB = await this.getStarship(this.starship.url);

        if (starshipDB) {
          const { tags } = starshipDB;
          await this.putStarship({ _id: starshipDB._id, _rev: starshipDB._rev, tags: tags.filter(t => t !== tag) });
        }
      }
      catch (e) {
        // TODO: show an error
      }
      finally {
        this.closeInput();
      }
    },

    async addTag(tag) {
      try {
        if (!tag) return;

        const starshipDB = await this.getStarship(this.starship.url);

        if (starshipDB) {
          if (starshipDB.tags && starshipDB.tags.includes(tag)) return;

          await this.putStarship({ _id: starshipDB._id, _rev: starshipDB._rev, tags: starshipDB.tags ? [...starshipDB.tags, tag] : [tag] });
        }
        else {
          await this.putStarship({ _id: this.starship.url, tags: [tag] });
        }
      }
      catch (e) {
        console.log(e);
        // TODO: show an error
      }
      finally {
        this.closeInput();
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
$gutter = 8px

.gutters
  margin-left -($gutter)
  margin-right -($gutter)

  > *
    padding-left $gutter
    padding-right $gutter
    box-sizing border-box

  margin-top -($gutter)
  margin-bottom -($gutter)

  > *
    padding-top $gutter
    padding-bottom $gutter
    box-sizing border-box
</style>
