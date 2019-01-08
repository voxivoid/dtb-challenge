module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "plugin:vue/recommended",
    "airbnb-base",
  ],
  // required to lint *.vue files
  plugins: [
    "vue",
  ],
  settings: {
    "import/core-modules": ["vue", "vuex"],
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            alias: {
              "~": __dirname,
              "@": __dirname,
            },
          },
        },
      },
    },
  },
  // add your custom rules here
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    "max-len": "off",
    quotes: ["error", "double"],
    "object-curly-newline": ["error", { multiline: true, consistent: true }],
    "no-unused-vars": "warn",
    "brace-style": ["error", "stroustrup"],
    "no-underscore-dangle": "off",
  },
};
