<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '../../../compoents/HelloWorld.vue';
import { postMethod } from '../../../utils/http';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  async created() {
    const result = await postMethod('/api/gxjt/digitaluser/findTypeByMobile?mobile=18246186492');
    console.log(44444, result);
  }
};
</script>
