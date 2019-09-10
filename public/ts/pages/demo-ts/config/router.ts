import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import * as projectConfig from '$root/project.config.json';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: `${projectConfig.front.router.baseUrl}/demo-ts`,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
  ],
});
