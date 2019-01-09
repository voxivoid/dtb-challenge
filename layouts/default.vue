<template lang="pug">
  .column.align-center
    .page
      .row.justify-end
        locale-selector
      .row.justify-center
        h1 SWAPI Super Search
      el-menu(:default-active='activeIndex' mode='horizontal' @select='pushRoute')
        el-menu-item(index='index')
          .row.align-center
            i.el-icon-search
            span {{ $t('search') }}
        el-menu-item(index='favorites')
          .row.align-center
            i.el-icon-star-off
            span {{ $t('favorites') }}

      nuxt.content
</template>

<script>
import LocaleSelector from "@/components/LocaleSelector.vue";

export default {
  components: {
    LocaleSelector,
  },

  data() {
    return {
      activeIndex: "/",
    };
  },

  created() {
    [this.activeIndex] = this.$route.name.split("_");
  },

  methods: {
    pushRoute(routeName) {
      this.$router.push(this.localePath(routeName));
    },
  },

  i18n: {
    messages: {
      en: {
        search: "Search",
        favorites: "Favorites",
      },
      de: {
        search: "Suche",
        favorites: "Favoriten",
      },
    },
  },
};
</script>


<style lang="stylus">
@import "~assets/breakpoints"

html
  font-family "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size 16px
  word-spacing 1px
  -ms-text-size-adjust 100%
  -webkit-text-size-adjust 100%
  -moz-osx-font-smoothing grayscale
  -webkit-font-smoothing antialiased
  box-sizing border-box

*,
*:before,
*:after
  box-sizing border-box
  margin 0

.page
  padding 64px 0
  width 100%
  max-width "%s" % $breakpoints.xl

  @media $breakpoints-spec.md-and-up
    padding 32px 64px

h1
  margin 64px 0
  text-align center

.content
  margin-top 32px

.input
  width 100%
  margin-bottom 16px
  padding 0 16px

  @media $breakpoints-spec.md-and-up
    max-width 256px
    padding 0

label
  font-size 14px
  margin-bottom 8px
</style>
