<template>
  <div class="tips-mask" :class="[tipsShow == 0 ? 'tips-mast-0' : 'tips-mast-1']">
    <h1>温馨提示</h1>
    <div class="tips1" v-show="tipsShow == 0">
      <p>您有部分试题未做答，</p>
      <p>请完成后提交。</p>
      <button @click="continueSub" />
    </div>
    <div class="tips2" v-show="tipsShow == 1">
      <p>很抱歉，您不可参与本次答题哟</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'tips',
    data () {
      return {
        tipsShow:this.tipsShows ? 0 : 1,
      };
    },
    methods: {
      // 继续答题方法
      continueSub(){
        this.$emit('close');
      },
    },
    props: {
      tipsShows: Number,
    },
    mounted: function () {}
  };
</script>

<style lang="less" scoped>
  @import '../style/reset.css';
  .tips-mask{
    text-align: center;
    position: fixed;
    width: 614px;
    z-index: 101;
    margin: 0px 64px;
    top: 272px;
    border-radius: 20px;
    background: url("../images/tipsBackground.png") no-repeat;
    background-size: cover;

    &.tips-mast-0 {
      height: 522px;
    }

    &.tips-mast-1 {
      height: 342px;
    }
  }
  h1{
    padding-top: 114px;
    font-size:65px;
    color:rgba(255,255,255,1);
    line-height: 60px;
    height: 60px;
  }
  .tips1{
    margin-top: 58px;
    p{
      font-size:34px;
      color:rgba(255,255,255,1);
      line-height: 50px;
    }
    button{
      width: 306px;
      height: 101px;
      background-image: url('../images/tipsButton.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      overflow: hidden;
      margin: 45px auto 0;
      padding: 0;
      border: none;
      outline: none;
      border-radius: 10px;
    }
  }
  .tips2{
    padding: 47px 0 107px;
    p{
      width:497px;
      height:34px;
      font-size:34px;
      color:rgba(255,255,255,1);
      line-height:71px;
      margin: 0 auto;
    }
  }
</style>
