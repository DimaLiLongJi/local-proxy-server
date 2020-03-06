import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
// import About from '../views/About.vue';
import { config } from '@/utils/env';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: `${config.base}demo`,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '活动首页',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "demo/about" */ '../views/About.vue'),
      // component: About,
      meta: {
        title: '关于',
      },
    }
  ]
});
