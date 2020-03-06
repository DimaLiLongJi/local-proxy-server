<template>
  <div id="app">
    <div id="nav">
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    </div>
    <router-view/>
  </div>
</template>

<script>
import { configWeChat } from '@/utils/wechat';

export default {
  beforeCreate() {
    configWeChat('https://wxxcs.hl139.net/frontend-test/online-exam/', '考试', '考试', 'https://wxxcs.hl139.net/pages/roamInquirewithtouch/images/share.jpg');
  }
};
</script>

<style lang="less">
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  /*padding: 30px;*/
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
