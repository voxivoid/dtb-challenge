# dtb-challenge

## Description

**SWAPI Super Search** is a web app that allows the user to search for starships that appeared in *Star Wars*. Within the app the user can store is favorite starships and tag them. All the data is fetched from the great [SWAPI](https://swapi.co/)!

## Setup

### Install dependencies
```
$ npm i
```

## Development

### Run for development
```
$ npm run dev
```

### Run tests
```
$ npm test
```

## Build

### Build and serve
```
$ npm run build
$ npm start
```

This will build your application with webpack and minify the JS & CSS (for production) and start the server in production mode.

### Generate static SPA
```
$ npm run generate
```

This will build the application and generate every route as a HTML file (used for static hosting). The output is stored in the `dist` directory.

## Stack

### Nuxt.js
[https://nuxtjs.org/](https://nuxtjs.org/)

I chose Nuxt.js as a framework to build this app due their "ready to develop" approach. A clean Nuxt.js project already has enough [features](https://nuxtjs.org/guide#features) to build a complete app with minimal setup.

### Pre-processors
In this project I used `pug` and `stylus` for pre-processing the template and style, respectively. The decision of using both pre-processors instead of the regular `HTML` and `CSS` was made, mainly, because of the verbosity of the latter which makes the process of coding much harder. Besides that, there are also other advantages in usign `stylus`, like nesting, variables, etc.

### ESLint
I use `ESLint` in every JavaScript project that I do. This is very important for code style consistency, even more if there is more than one person collaborating in one project, and to prevent runtime errors.

Usually I extend its configuration with [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) which is probably the most used one.

### Element UI
Since I already had experience with `Element UI` and it provided all the UI components that I needed for the app, I decided to use it so I could save some time. It is also one of the most used UI frameworks in the `Vue.js` ecosystem, which is a good thing if you are looking for support.

### PouchDB
Due to `localStorage` being a key-value storage designed to store small amounts of data and being synchronous, thus blocking, I decided to use an IndexedDB to store additional information about the starships.

For this, I decided to try `PouchDB`, which seemed to have good documentation and easy to use. The existence of `vue-pouch`, a plugin that integrated `PouchDB` in `Vue.js`, was also a plus.

## Notes
* The app was developed around a [mobile first](https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00) approach.
* I do not like element layout because they assume that only rows use flex and it does not allow you to set, for instance, the flex justify property in a column. This is why I used [@makay/flexbox](https://www.npmjs.com/package/@makay/flexbox), which is a direct mapping of flexbox properties into CSS classes.
* The app has i18n. The German text was sponsored by Google Translator, so it is Google's fault if there is any error, do not kill the messenger!