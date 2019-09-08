<template>
  <div class="home">
    <HelloWorld msg="Welcome to ts app"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../../../components/HelloWorld.vue';
import { TypePost, Post } from '../../../utils/http';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @Post
  private postMethod!: TypePost;

  // constructor() {
  //   super();
  // }

  async created() {
    const result = await this.postMethod('/api/gxjt/digitaluser/findTypeByMobile?mobile=18246186492');
    console.log(44444, result);
  }
}
</script>
