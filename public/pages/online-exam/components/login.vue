<template>
  <div class="login-mask">
    <div class="login-content" v-if="showLogin">
      <p class="title">登记信息</p>
      <div class="check-content">
        <span class="label">所在地市名称</span>
        <div class="check" @click="showCityList = true;">
          <div class="content1">{{city}}</div>
          <div class="bottom-btn"/>
        </div>
        <div class="city-list" v-if="showCityList">
          <p v-for="(cityName, index) in cityList" :key="index" @click="city = cityName;showCityList = false;">{{cityName}}</p>
        </div>
      </div>
      <div class="check-content">
        <span class="label">答题人姓名</span>
        <div class="check">
          <input class="content2" type="text" v-model="name" v-fixedinput>
        </div>
      </div>
      <div class="input-content">
        <input placeholder="请输入手机号" type="number" v-model="mobile" @input="limitPhone" v-fixedinput>
      </div>
      <div class="input-content">
        <input class="code" placeholder="请输入验证码" type="number" v-model="code" @input="limitCode" v-fixedinput>
        <div class="shu" />
        <div @click="getCode" class="code-tip">{{codeTip}}</div>
      </div>
      <button class="button" @click="submit"/>
    </div>
    <Tips :tips-shows='0' v-if="!showLogin" />
    <div class="cover" />
  </div>
</template>
<script>
  import { postMethod } from '@/utils/http';
  import { getCode, verifyCode } from '@/utils/common';
  import  Tips from './Tips';

  export default {
    name: 'login',
    components: {
        Tips,
    },
    data () {
      const cityList = [
        '哈尔滨', '齐齐哈尔', '牡丹江', '佳木斯', '双鸭山', '七台河', '鸡西', '鹤岗', '伊春', '黑河', '绥化', '大兴安岭', '大庆'
      ];
      return {
        cityList,
        showCityList: false,
        name: '',
        city: cityList[0],
        mobile: null,
        code: null,
        codeTip: '获取验证码',
        countdown: 60,
        timer: null,
        showLogin: true, // 控制显示登陆还是显示无法参加
      };
    },
    methods: {
      limitPhone() {
        if (this.mobile.length > 11) this.mobile = this.mobile.substring(0, 11);
      },
      limitCode() {
        if (this.code.length > 6) this.code = this.code.substring(0, 6);
      },

      // 获取验证码
      getCode() {
        if (this.countdown === 60 && !this.timer) {
          if (!this.mobile || this.mobile.length < 11) {
            this.$showtoast('请确认手机号是否正确');
            return;
          }
          this.$showLoading();

          getCode(this.mobile).then(() => {
            this.$closeLoading();
            this.timer = setInterval(() => {
            if (this.countdown === 0) {
              this.countdown = 60;
              this.codeTip = '重新获取验证码';
              clearInterval(this.timer);
              this.timer = null;
              return;
            }
            this.codeTip = `${this.countdown}秒`;
            this.countdown --;
          }, 1000);
          }).catch(() => {
            this.$closeLoading();
          });
        }
      },

      // 提交验证，先验证验证码然后提交手机号
      async submit() {
        if (!this.mobile || this.mobile.length < 11 || !this.code || this.code.length < 6 || !this.name || !this.city) {
          this.$showtoast('请确认信息是否填写完毕');
          return;
        }
        this.$showLoading();

        try {
          // 先验证验证码
          const checkCodeRes = await verifyCode(this.mobile, this.code);
          if(!checkCodeRes.success || checkCodeRes.code !== '0000') {
            this.$showtoast(checkCodeRes.msg);
            this.$closeLoading();
            return;
          }

          // 验证是否是用户
          const checkUserRes = await postMethod('/api/exam/checkUser', {
            params: { examNumber: this.mobile }
          });
          this.$closeLoading();
          console.log('checkUserRes:',checkUserRes);
          const data = checkUserRes.data;
          // 如果成功并且当前号码和用户都为当前的人则存储
          if(checkUserRes.code === '0000'){
            if (data.examNumber === this.mobile && data.examPersonName === this.name && data.prefectureName === this.city) {
              sessionStorage.setItem('member', JSON.stringify({
                examPersonId: data.id,
                examNumber: data.examNumber,
                examPersonName: data.examPersonName,
                prefectureName: data.prefectureName,
              }));
              this.$emit('close');
            } else this.$showtoast('请确认信息是为当前号码人的信息');
          } else if (checkUserRes.code === '9999' && !checkUserRes.success) this.showLogin = false;
          else this.$showtoast(checkUserRes.msg);
        } catch (error) {
          this.$closeLoading();
        }
      }
    },
  };
</script>

<style lang="less" scoped>
@import '../style/reset.css';
.login-mask {
  .login-content {
    text-align: center;
    z-index: 101;
    position: absolute;
    width: 614px;
    height: 812px;
    margin: 0px 64px;
    top: 223px;
    border-radius: 20px;
    background: url("../images/loginBg.png") no-repeat;
    background-size: contain;

    .title {
      padding-top: 112px;
      line-height:66px;
      font-size: 70px;
      font-weight:normal;
      color: #FFFFFF;
      margin-bottom: 62px;
    }

    .button {
      width: 336px;
      height: 101px;
      padding-top: 45px;
      padding-bottom: 41px;
      background-image: url('../images/loginSubmit.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      overflow: hidden;
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      border-radius: 10px;
    }

    .check-content {
      height: 62px;
      line-height: 62px;
      padding: 0 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      position: relative;

      .label {
        font-size:34px;
        color: #FFFFFF;
      }

      .check {
        width:252px;
        height:62px;
        background-color: #FFFFFF;
        border-radius:10px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .content1 {
        display: inline-block;
        color: #616161;
        line-height: 62px;
        height: 62px;
        text-align: left;
        text-indent: 8px;
        width: 169px;
      }
      .content2 {
        display: inline-block;
        color: #616161;
        line-height: 62px;
        text-align: left;
        text-indent: 8px;
        width: 100%;
        outline:none;
        border:none;
        &::-webkit-input-placeholder {
          color: #949494;
        }
        &.code {
          width: 260px;
        }
      }

      .bottom-btn {
        background-image: url('../images/loginBottomBtn.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 56px;
        height: 62px;
      }

      .city-list {
        position: absolute;
        right: 70px;
        bottom: -234px;
        width: 252px;
        height: 233px;
        z-index: 102;
        overflow: scroll;
        background: #ffffff;

        p {
          width:252px;
          height:42px;
          line-height:42px;
          color: #616161;
          text-align: left;
          font-size:26px;
          text-indent: 40px;
        }
      }
    }

    .input-content {
      width: 466px;
      height: 80px;
      background: #FFFFFF;
      // border:1px solid #959595;
      border-radius:16px;
      overflow: hidden;
      margin: 0 auto 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      .code-tip {
        width: 200px;
        height: 80px;
        line-height: 80px;
        color: #243AB2;
        font-size:25px;
        text-align: center;
      }

      .shu {
        width: 5px;
        background-color: #2640B6;
        height:28px;
      }

      input {
        width: 100%;
        font-size:30px;
        height: 80px;
        line-height: 80px;
        color: #616161;
        text-indent: 20px;
        outline:none;
        border:none;
        &::-webkit-input-placeholder {
          color: #949494;
        }
        &.code {
          width: 260px;
        }
      }
    }
  }

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
