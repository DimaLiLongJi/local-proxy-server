<template>
  <div class="achievement-mask">
    <div class="achievementT">
      <p>恭喜您</p>
      <p class="okTopic">完成答题！</p>
    </div>
    <span class="fraction">{{datas.examScore}}分</span>
    <span class="introduce">{{datas.courseName}}</span>
    <div class="imgDiv">
      <img class="imgGroup1" src="../images/homeImgGroup1.png">
      <img class="imgGroup2" src="../images/homeImgGroup2.png">
    </div>
    <div class="textDiv">
      <span  class="textGroup1">正确{{datas.correctNum}}题</span>
      <span  class="textGroup2">错误{{datas.wrongNum}}题</span>
    </div>
    <button class="button" @click="close" />
    <Tips :tips-shows='1' v-if="false" />
    <div class="cover" v-if="false" ></div>
  </div>
</template>

<script>
  export default {
    name: 'achievement',
    data () {
      return {
        datas:this.prop,
      };
    },
    methods: {
      close(){
        this.$emit('close');
      },
    },
    props: {
      prop:{
        type: Object,
      }
    },
    mounted: function () {}
  };
</script>
<style lang="less" scoped>
  @import '../style/reset.css';
  .achievement-mask{
    text-align: center;
    z-index: 101;
    position: fixed;
    width: 614px;
    height: 812px;
    margin: 0px 64px;
    top: 223px;
    border-radius: 20px;
    background: url("../images/homeBackground.png") no-repeat;
    background-size: contain;
    .achievementT{
      padding-top: 112px;
      margin: 0 auto;
      width: 100%;
      font-size: 62px;
    }
    p{
      color: #FFFFFF;
      font-size:65px;
      line-height:94px;
    }
    p.okTopic{
     margin-left: 50px;
    }
    .fraction{
      display: block;
      color: #FFFFFF;
      font-size: 80px;
      line-height: 84px;
      padding-top: 20px;
    }
    .introduce{
      display: block;
      color: #FFFFFF;
      padding-top: 47px;
      height:34px;
      font-size:34px;
    }
    .imgDiv{
      padding-top: 38px;
      display: flex;
      justify-content: center;
      img{
        width: 69px;
        height: 69px;
      }
      img.imgGroup2{
        margin-left: 110px;
      }
    }
    .textDiv{
      padding-top: 16px;
      display: flex;
      justify-content: center;
      span{
        font-size:30px;
        line-height:30px;
        color: #FFFFFF;
      }
      span.textGroup2{
        margin-left: 72px;
      }
    }
    .button{
      width: 306px;
      height: 101px;
      padding: 0;
      margin: 45px auto 0;
      background-image: url('../images/homeButton.png');
      background-repeat:no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      border: none;
      outline: none;
      border-radius: 10px; 
    }
  /*遮罩层*/
  .cover{
    position:absolute;left:0px;top:0px;
    background-color: #000000;
    width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
    height:100%;
    filter:alpha(opacity=60);  /*设置透明度为60%*/
    opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
    display: block;
    z-Index:100;
  }
  }
</style>
