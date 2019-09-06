<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '../../../compoents/HelloWorld.vue';
import { getMethod } from '../../../utils/http';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created() {
    // console.log(getMethod);
  }
};
</script>
