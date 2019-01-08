// http://element.eleme.io/

import Vue from "vue";
import enLang from "element-ui/lib/locale/lang/en";
import deLang from "element-ui/lib/locale/lang/de";
import locale from "element-ui/lib/locale";

import {
  DatePicker,
  Loading,
  Table,
  TableColumn,
} from "element-ui";

const langs = {
  en: enLang,
  de: deLang,
};

export default ({ app }) => {
  // requiring on demand
  Vue.use(DatePicker);
  Vue.use(Loading.directive);
  Vue.use(Table);
  Vue.use(TableColumn);

  // set element lang
  locale.use(langs[app.store.state.i18n.locale]);

  // update element ui lang when locale changes
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => { // eslint-disable-line no-param-reassign
    locale.use(langs[newLocale]);
  };
};
