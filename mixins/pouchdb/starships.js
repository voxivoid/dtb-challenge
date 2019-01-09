export default {
  methods: {
    async getStarship(id) {
      try {
        return await this.$pouch.get("starships", id);
      }
      catch (e) {
        return null;
      }
    },

    async putStarship(starship) {
      const starshipDB = await this.getStarship(starship._id);

      await this.$pouch.put("starships", { ...starshipDB, ...starship });
    },
  },
};
