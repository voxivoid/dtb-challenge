<template lang="pug">
  el-table(:data="tableData")
    el-table-column(:label="$t('name')", prop="name")
    el-table-column(:label="$t('model')", prop="model")
    el-table-column(:label="$t('manufacturer')", prop="manufacturer")
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  i18n: {
    messages: {
      en: {
        name: "Name",
        model: "Model",
        manufacturer: "Manufacturer",
      },
      de: {
        name: "Name",
        model: "Modell",
        manufacturer: "Hersteller",
      },
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
