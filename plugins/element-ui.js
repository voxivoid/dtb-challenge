// http://element.eleme.io/

import Vue from "vue";
import enLang from "element-ui/lib/locale/lang/en";
import deLang from "element-ui/lib/locale/lang/de";
import locale from "element-ui/lib/locale";

import {
  Button,
  Collapse,
  CollapseItem,
  DatePicker,
  Input,
  Loading,
  Table,
  TableColumn,
  Tag,
} from "element-ui";

const langs = {
  en: enLang,
  de: deLang,
};

export default ({ app }) => {
  // requiring on demand
  Vue.use(Button);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(DatePicker);
  Vue.use(Input);
  Vue.use(Loading.directive);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Tag);

  // set element lang
  locale.use(langs[app.store.state.i18n.locale]);

  // update element ui lang when locale changes
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => { // eslint-disable-line no-param-reassign
    locale.use(langs[newLocale]);
  };
};
