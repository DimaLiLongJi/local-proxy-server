<template>
  <div class="about">
    <h1>This is an about page about ts</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class about extends Vue {

  async created() {
    console.log(44444, 'This is an about page about ts');
  }
}
</script>
