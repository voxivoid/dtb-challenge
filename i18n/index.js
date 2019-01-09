// https://nuxt-community.github.io/nuxt-i18n/

export const locales = [
  { code: "en", iso: "en-US", name: "English" },
  { code: "de", iso: "de", name: "Deutsche" },
];

export default {
  locales,
  vueI18n: {
    fallbackLocale: "en",
  },
  defaultLocale: "en",

};
