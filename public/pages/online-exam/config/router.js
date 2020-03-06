import Vue from 'vue';
import Router from 'vue-router';
import { config } from '@/utils/env';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: `${config.base}online-exam`,
  routes: [
    {
      path: '/',
      name: 'question-bank',
      component: () => import(/* webpackChunkName: "online-exam/question-bank" */ '../views/question-bank.vue'),
      meta: {
        title: '题库页',
      },
    },
    {
      path: '/question-bank-info/:id',
      name: 'question-bank-info',
      component: () => import(/* webpackChunkName: "online-exam/question-bank-info" */ '../views/question-bank-info.vue'),
      meta: {
        title: '卷面',
      },
    },
  ]
});
