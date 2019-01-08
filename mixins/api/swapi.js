// https://swapi.co/documentation

export default {
  beforeCreate() {
    this.api = {
      ...this.api,
      swapi: {
        starships: {
          search: keyword => this.$axios.get(`/starships/?search=${keyword}`).then(response => response.data),
        },
      },
    };
  },
};
