<template>
  <div class="home">
    <HelloWorld msg="Welcome to ts app"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../../../components/HelloWorld.vue';
import { TypeHttpRequest, PostMapping } from '../../../utils/http';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @PostMapping('/api/gxjt/digitaluser/findTypeByMobile')
  private getDetail!: TypeHttpRequest;

  async created() {
    const result = await this.getDetail({
      params: {
        mobile: 18246186492
      }
    });
    console.log(44444, result);
  }
}
</script>
