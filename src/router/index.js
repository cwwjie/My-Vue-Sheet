import Vue from 'vue';
import Router from 'vue-router';
import Sheet from '@/router/Sheet/index';

Vue.use(Router);

export default new Router({
  'routes': [
    {
      'path': '/',
      'name': 'Sheet',
      'component': Sheet
    }
  ]
});
