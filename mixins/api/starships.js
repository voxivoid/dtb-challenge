// https://swapi.co/documentation

export default {
  beforeCreate() {
    this.api = {
      ...this.api,
      starships: {
        search: keyword => this.$axios.get(`/starships/?search=${keyword}`).then(response => response.data),
        get: url => this.$axios.get(url).then(response => response.data),
      },
    };
  },
};
