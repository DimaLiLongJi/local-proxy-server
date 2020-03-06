import Vue from 'vue';
import App from './App.vue';
import router from './config/router';
import store from './store';
import Login from '@/compoents/login';
import Loading from '@/compoents/loading';
import Toast from '@/compoents/toast';
import { loginForRoute } from '@/utils/login';

import * as VConsole from 'vconsole';

if (process.env.NODE_ENV !== 'prod') new VConsole();

Vue.use(Login);
Vue.use(Loading);
Vue.use(Toast);

Vue.config.productionTip = false;

// 通过路由守卫来修改页面title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 在这使用登录能力
  loginForRoute(next);
  // next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
