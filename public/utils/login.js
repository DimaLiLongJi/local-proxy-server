import Vue from 'vue';
import { urlParam } from './url-parser';

export function getLoginInfo() {
  const ua = navigator.userAgent.toLowerCase();
  let fromAppType = 'web';
  if (ua.indexOf('leadeon/') > -1) fromAppType = 'leadeon';
  else if (ua.indexOf('micromessenger') > -1) fromAppType = 'wx';

  return {
    unionid: window.localStorage.getItem('wx_unionid'), //用户unionid
    openid: window.localStorage.getItem('wx_openid'), //用户unionid
    phone: window.localStorage.getItem('wx_mobile'), //用户手机号
    nickname: window.localStorage.getItem('wx_nickname'), //用户昵称
    avatar: window.localStorage.getItem('wx_imgheader'), //用户头像
    channel: urlParam('channelId'), //来源
    fromAppType, //渠道 wx微信 leadeon手厅
  };
}

export async function loginForRoute(next, webCallback) {
  await Vue.prototype.$login();
  const loginInfo = getLoginInfo();
  console.log('登录信息', loginInfo);
  if (loginInfo && loginInfo.phone) next();
  else {
    if (loginInfo.fromAppType !== 'web') {
      next();
      // TODO 微信未登录
      // Vue.prototype.$showLoading();
      // return;
    }
    if (webCallback && typeof webCallback === 'function') webCallback(next());
    else next();
  }
}

// const commonData = {};

// const commonReferrer = this.removeUrl(document.referrer); //上一页
// 		const commonLocation = this.removeUrl(window.location.href); //下一页
// 		return {
// 			mobile: window.localStorage.getItem("wx_mobile") ? window.localStorage.getItem("wx_mobile") : "",
// 			channel: $get.urlParam('channelId') ? $get.urlParam('channelId') : "null", //频道ID来源    不传默认获取顶部链接的channelId
// 			fromAppType: window.localStorage.getItem("fromAppType") ? window.localStorage.getItem("fromAppType") : "", //来源类型   不传的话 则直接获取内部判断的类型
// 			businessType: this.getBusinessType(), //名称    //不传的话 直接获取当前页面上一级的文件夹名称
// 			jumpUrl: commonReferrer ? commonReferrer : "", //跳转前地址    //不传的话 直接获取上一页的地址
// 			currentUrl: commonLocation ? commonLocation : "", //当前地址	  //不传的话 直接获取当前地址
// 		}
