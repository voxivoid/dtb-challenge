// http://element.eleme.io/

import Vue from 'vue';

import {
  Table,
  TableColumn,
  DatePicker,
} from 'element-ui';

export default () => {
  // requiring on demand
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(DatePicker);
};
