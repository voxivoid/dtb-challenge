// https://nuxt-community.github.io/nuxt-i18n/

export const locales = [
  { code: "en", iso: "en-US", label: "English" },
  { code: "de", iso: "de", label: "Deutsche" },
];

export default {
  locales,
  vueI18n: {
    fallbackLocale: "en",
  },
  defaultLocale: "en",

};
