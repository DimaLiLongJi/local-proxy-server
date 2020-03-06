import { getRandomHex } from './common';

/**
 * 微信分享回调
 *
 * @param {Event} e
 * @param {string} link
 * @param {string} title
 * @param {string} desc
 * @param {string} imgUrl
 * @param {string} timestamp
 * @param {string} nonceStr
 * @param {string} jsApiList
 */
function configCallBack(e, link, title, desc, imgUrl, timestamp, nonceStr, jsApiList) {
  let res = JSON.parse(e.currentTarget.responseText);
  let wxConfig = {
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxf2f12a7d37be327b', // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: res.data, // 必填，签名
    jsApiList: jsApiList // 必填，需要使用的JS接口列表
  };


  window.wx.config(wxConfig);
  console.log({
    title: title,
    desc: desc,
    link: link,
    imgUrl: encodeURI(imgUrl),
    type: 'link',
    success() { },
    cancel() { },
  });
  window.wx.ready(() => {
    window.wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: encodeURI(imgUrl),
      type: 'link',
      success() { },
      cancel() { },
    });

    window.wx.onMenuShareTimeline({
      title: title,
      desc: desc,
      link: link,
      imgUrl: encodeURI(imgUrl),
      success() { },
      cancel() { },
    });
  });
}

/**
 * 设置微信分享，非微信环境会跳出
 * 
 * @export
 * @param {string} link
 * @param {string} title
 * @param {string} desc
 * @param {string} imgUrl
 * @param {string[]} configJsApiList
 */
export function configWeChat(link, title, desc, imgUrl, configJsApiList) {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('micromessenger') === -1) return;

  const jsApiList = configJsApiList ? configJsApiList : ['onMenuShareAppMessage', 'onMenuShareTimeline'];

  const timestamp = Math.floor(Date.now() / 1000);

  const nonceStr = getRandomHex();
  const xhr = new XMLHttpRequest();
  // xhr.addEventListener('load', configCallBack);
  xhr.addEventListener('load', (e) => {
    configCallBack(e, link, title, desc, imgUrl, timestamp, nonceStr, jsApiList);
  });
  xhr.open('GET', 'https://wxxcs.hl139.net/api/NetflowMarketForWx/loginAction.do?method=jsSdkSignature' + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + encodeURIComponent(location.href.split('#')[0]));
  xhr.send();
}