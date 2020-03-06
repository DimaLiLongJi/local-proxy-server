<template>
  <div>
    <div class="subscribe-modal" v-if="isSubscribeShow">
      <div class="container">
        <p class="title-1">温馨提示</p>
        <p class="title-2">请先去关注公众号</p>
        <p class="title-2">
          才能参加相关活动
          <div style="min-height: 8vw;display: flex;">
            <button class="close-subscribe" @click="cancelSubscribe()">取消</button>
          </div>
        </p>
      </div>
    </div>
    <div class="login-modal" v-if="isLoginShow">
      <p class="title-1">温馨提示</p>
      <p class="title-2">需要先登记号码才能查询到个人信息哦</p>
      <div style="min-height: 8vw;display: flex;">
        <button class="close-login" @click="jumpToSign()">立即登记</button>
      </div>
    </div>
  </div>
</template>
<script>
import { postMethod } from '@/utils/http';
import { urlParam } from '@/utils/url-parser';
import { getLoginInfo } from '@/utils/login';
import { checkLogin, showLogin, getUserInfo } from '@/utils/sdk';
import * as Cookies from 'js-cookie';

const Login = {
  name: 'login',
  data() {
    return {
      isLoginShow: false,
      isSubscribeShow: false,
      redirectUri: window.location.href,
      loginInfo: {...getLoginInfo()} // 登录信息
    };
  },
  methods: {
    // 微信公众号登录
    async weLogin() {
      if (this.loginInfo.fromAppType !== 'wx') return;

      // 如果没有登记则需要清掉登录状态
      const phone = Cookies.get('Hl139.Open.Mobile');
      if (!phone) {
        window.localStorage.removeItem('wx_openid');
        window.localStorage.removeItem('wx_mobile');
        window.localStorage.removeItem('wx_nickname');
        window.localStorage.removeItem('wx_unionid');
        window.localStorage.removeItem('wx_imgheader');
        window.sessionStorage.removeItem('hl139_has_check_mobile');
        this.loginInfo = {...getLoginInfo()};
      }

      // 如果有号码并且验证完直接返回
      if (this.loginInfo.unionid && this.loginInfo.phone && window.sessionStorage.getItem('hl139_has_check_mobile') === 'true') return this.loginInfo;
      if (this.loginInfo.unionid && this.loginInfo.phone) {
        return await this.checkWxUserInfo(
          this.loginInfo.unionid,
          this.loginInfo.openid,
          this.loginInfo.phone
        );
      } else if (urlParam('code')) {
        return await this.getByWxCode();
      } else {
        return await this.getWxCode();
      }
    },

    // 检查微信用户信息
    async checkWxUserInfo(uId, openId, wxMobile) {
      const splitStr = this.redirectUri.split('/');
      let businessType = 'other';
      if (splitStr[splitStr.length - 2] && splitStr[splitStr.length - 2] != '') businessType = splitStr[splitStr.length - 2];
        
      const res = await postMethod('/api/core/login/check', {
        params: {
          unionId: uId,
          gzhOpenId: openId,
          mobile: wxMobile,
          channel: this.loginInfo.channel,
          fromAppType: this.loginInfo.fromAppType,
          businessType: businessType,
          code: '',
          callback: encodeURIComponent(this.redirectUri)
        }
      });
      const data = res.data;
      // 如果不存在手机号 提示去绑定手机号
      if (res.status === '0') {
        const phone = Cookies.get('Hl139.Open.Mobile');
        // 微信登记了
        if (phone) {
          this.loginInfo.phone = data.tel || phone; //用户手机号
          window.localStorage.setItem('wx_unionid', data.unionid);
          window.localStorage.setItem('wx_openid', data.gzhopenid);
          window.localStorage.setItem('wx_mobile', data.tel || phone);
          window.localStorage.setItem('wx_nickname', data.name);
          window.localStorage.setItem('wx_imgheader', data.touxiang);
          if (data.tel || phone) window.sessionStorage.setItem('hl139_has_check_mobile', 'true');
          window.reload();
        } else {
          this.isLoginShow = true;
          window.localStorage.removeItem('wx_openid');
          window.localStorage.removeItem('wx_mobile');
          window.localStorage.removeItem('wx_nickname');
          window.localStorage.removeItem('wx_unionid');
          window.localStorage.removeItem('wx_imgheader');
          window.sessionStorage.removeItem('hl139_has_check_mobile');
        }
        this.loginInfo = {...getLoginInfo()};
        return this.loginInfo;
      }
      // 已关注已绑定 判断手机号是否一致 不一致更新手机号
      if (res.status === '1') {
        if (data.tel && data.tel !== wxMobile) {
          window.localStorage.setItem('wx_unionid', data.unionid);
          window.localStorage.setItem('wx_openid', data.gzhopenid);
          window.localStorage.setItem('wx_mobile', data.tel);
          window.localStorage.setItem('wx_nickname', data.name);
          window.localStorage.setItem('wx_imgheader', data.touxiang);
          this.loginInfo = {...getLoginInfo()};
        }
        // 提示已经检测过了
        if (data.tel) window.sessionStorage.setItem('hl139_has_check_mobile', 'true');
        window.reload();
      }
      // 已取消关注
      if (res.status === '2') {
        this.isSubscribeShow = true;
        window.localStorage.setItem('wx_unionid', data.unionid);
        window.localStorage.setItem('wx_openid', data.gzhopenid);
        window.localStorage.setItem('wx_mobile', data.tel);
        window.localStorage.setItem('wx_nickname', data.name);
        window.localStorage.setItem('wx_imgheader', data.touxiang);
        if (data.tel) window.sessionStorage.setItem('hl139_has_check_mobile', 'true');
        this.loginInfo = {...getLoginInfo()};
        return this.loginInfo;
      }
    },

    // 通过Code换取用户信息
    async getByWxCode() {
      const res = await postMethod('/api/core/login', {
        params: {
          mobile: '',
          channel: this.loginInfo.channel,
          fromAppType: this.loginInfo.fromAppType,
          businessType: '',
          code: urlParam('code'),
          callback: encodeURIComponent(this.redirectUri)
        }
      });
      const data = res.data;
      // 已关注未绑定
      if (res.status === '0') {
        const phone = Cookies.get('Hl139.Open.Mobile');
        // 微信登记了
        if (phone) {
          window.localStorage.setItem('wx_unionid', data.unionid);
          window.localStorage.setItem('wx_openid', data.gzhopenid);
          window.localStorage.setItem('wx_mobile', data.tel || phone);
          window.localStorage.setItem('wx_nickname', data.name);
          window.localStorage.setItem('wx_imgheader', data.touxiang);
          this.loginInfo.phone = data.tel || phone; //用户手机号
          if (data.tel || phone) window.sessionStorage.setItem('hl139_has_check_mobile', 'true');
          window.reload();
        } else {
          // 未登记
          this.isLoginShow = true;
          window.localStorage.removeItem('wx_openid');
          window.localStorage.removeItem('wx_mobile');
          window.localStorage.removeItem('wx_nickname');
          window.localStorage.removeItem('wx_unionid');
          window.localStorage.removeItem('wx_imgheader');
          window.sessionStorage.removeItem('hl139_has_check_mobile');
        }
        this.loginInfo = {...getLoginInfo()};
        return this.loginInfo;
      }
      // 已关注已绑定
      if (res.status === '1') {
        window.localStorage.setItem('wx_unionid', data.unionid);
        window.localStorage.setItem('wx_openid', data.gzhopenid);
        window.localStorage.setItem('wx_mobile', data.tel);
        window.localStorage.setItem('wx_nickname', data.name);
        window.localStorage.setItem('wx_imgheader', data.touxiang);
        this.loginInfo = {...getLoginInfo()};
        // 提示已经检测过了
        if (data.tel) window.sessionStorage.setItem('hl139_has_check_mobile', 'true');
        window.reload();
      }
       // 已取消关注
      if (res.status === '2') {
        this.isSubscribeShow = true;
        window.localStorage.setItem('wx_unionid', data.unionid);
        window.localStorage.setItem('wx_openid', data.gzhopenid);
        window.localStorage.setItem('wx_mobile', data.tel);
        window.localStorage.setItem('wx_nickname', data.name);
        window.localStorage.setItem('wx_imgheader', data.touxiang);
        if (data.tel) window.sessionStorage.setItem('hl139_has_check_mobile', 'true');
        return this.loginInfo;
      }
      console.error('code换取微信信息返回值：', res);
    },

    //获取微信code;
    async getWxCode() {
      const res = await postMethod('/api/core/login', {
        params: {
          mobile: '',
          channel: this.loginInfo.channel,
          fromAppType: this.loginInfo.fromAppType,
          businessType: '',
          code: '',
          callback: encodeURIComponent(this.redirectUri)
        }
      });
      window.location.replace(res.data); //重定向页面
    },

    // 手厅登录
    async leadeonLogin() {
      if (this.loginInfo.fromAppType === 'leadeon') {
        try {
          const res = await checkLogin();
          if (res.status === 0 && res.otherStatus === 0) {
            await showLogin(this.redirectUri, '3');
          } else {
            const userInfoRes = await getUserInfo();
            // 如果存在就啥都不干
            if (window.localStorage.getItem('wx_mobile') && window.localStorage.getItem('wx_mobile') === res.phoneNumber) {
              this.loginInfo = {...getLoginInfo()};
              return this.loginInfo;
            }
            // 如果不存在就赋值刷新
            window.localStorage.setItem('wx_mobile', userInfoRes.phoneNumber);
            this.loginInfo = {...getLoginInfo()};
            window.replace();
          }
        } catch (error) {
          // 未登录
          await showLogin(window.location.href, '3');
        }
      }
    },

    async login() {
      await this.weLogin();
      await this.leadeonLogin();
      //浏览器直接登陆
      return getLoginInfo();
    },

    // 日志全局调用方法
    log(type, functionName, businessType, actId, actName) {
      let jumpUrl = Cookies.get('jumpUrl', this.redirectUri);
      Cookies.set('jumpUrl', this.redirectUri);
      switch (type) {
        case 0: //页面跳转日志接口
          postMethod('/api/core/visit/pagelog/add', {
            params: {
              mobile: this.loginInfo.phone,
              channel: this.getUrlParam('channelId'),
              fromAppType: this.loginInfo.fromAppType,
              businessType: businessType,
              jumpUrl: jumpUrl || this.redirectUri,
              currentUrl: this.redirectUri,
              functionName: functionName
            }
          });
          break;
        case 1: //活动页面跳转日志接口
          postMethod('/api/core/visit/actlog/add', {
            url: '/api/core/visit/actlog/add',
            params: {
              mobile: this.loginInfo.phone,
              channel: this.getUrlParam('channelId'),
              fromAppType: this.loginInfo.fromAppType,
              businessType: businessType,
              jumpUrl: jumpUrl || this.redirectUri,
              currentUrl: this.redirectUri,
              functionName: functionName,
              actId: actId,
              actName: actName
            }
          });
          break;
        case 2:
          break;
        default:
          break;
      }
    },

    getUrlParam(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },

    closeLogin() {
      this.isLoginShow = false;
    },

    jumpToSign() {
      window.location.href = `https://open.hl139.net/OAuth/Index?redirect_uri=${
        encodeURIComponent(`https://open.hl139.net/Member/BindTel?redirect_uri=${
          encodeURIComponent(window.location.href)
        }`)
      }`;
    },

    cancelSubscribe() {
      this.isSubscribeShow = false;
      window.sessionStorage.setItem('hl139_has_check_mobile', 'true');
    }
  }
};

Login.install = function(Vue) {
  // 生成一个Vue的子类
  // 同时这个子类也就是组件
  const LoginConstructor = Vue.extend(Login);
  // 生成一个该子类的实例
  const instance = new LoginConstructor();
  // 将这个实例挂载在我创建的div上
  // 并将此div加入全局挂载点内部
  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);

  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法
  Object.defineProperty(Vue.prototype, '$login', {
    get() {
      return instance.login;
    }
  });
  Object.defineProperty(Vue.prototype, '$log', {
    get() {
      return instance.log;
    }
  });
};

export default Login;
</script>

<style lang='less'>
@import url("./index");
</style>