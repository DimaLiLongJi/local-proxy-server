const userAgent = window.navigator.userAgent.toLowerCase();

/**
* 判断客户端
*
* @export
*
* @param {string} needle
* @returns {boolean}
*/
function find(needle) {
  return userAgent.indexOf(needle) !== -1;
}
/**
* 微信
*
* @export
* @returns {boolean}
*/
export function weixin() {
return find('micromessenger');
}

/**
* 中国移动 APP
*
* @export
* @returns {boolean}
*/
export function cmcc() {
  return find('leadeon');
}

/**
* 调起登录框并调回登陆后地址
*
* arguments:
*  1. url: 回调地址
*  2. urlType:
*    1 => 本网
*    2 => 异网
*    3 => 本网异网都可以
*
* @export
* @param {string} url
* @param {('1' | '2' | '3')} urlType
* @returns {Promise<any>}
*/
export function showLogin(url, urlType) {
  return new Promise((resolve, reject) => {
      window.leadeon.showLogin({
          debug: false,
          url,
          urlType,
          success: (res) => {
              resolve(res);
          },
          error: (res) => {
              reject(res);
          },
      });
  });
}

/**
* 检查登录状态
*
* success:
*  1. status: 本网登录状态：0未登录；1服务密码登录；2短信验证码登录
*  2. otherStatus: 异网登录状态:  0未登录；1登录
*
* error:
*  1. errNo
*
* @export
* @returns {Promise<any>}
*/
export function checkLogin() {
  return new Promise((resolve, reject) => {
      window.leadeon.userStatus({
          debug: false,
          success: (res) => {
              resolve(res);
          },
          error: (res) => {
              reject(res);
          },
      });
  });
}

/**
* 获取用户信息
*
* success:
*  1. cid 推送标识
*  2. clientID 客户端唯一标识
*  3. xk 客户端安全ID
*  4. ak 签名字串
*  5. sn 设备型号
*  6. st 系统类型 int
*  7. sv 系统版本号
*  8. version 客户端版本号
*  9. sp 屏幕分辨率
*  10. osType 设备类型 android wp ios
*  11. channel 渠道编码
*  12. province 省编码
*  13. city 市编码
*  14. imei 3.8 新增
*  15. sb 手机品牌, 3.8 新增
*  16. nt 上网方式, 3.8 新增      0：2g, 1:3g，2: 4g，3:wifi
*  17. phoneNumber 用户电话号码
*  18. curTime 查询时间
*  19. userBrand 用户品牌
*  20. token 会话信息
*  21. loginProvince 登录号码归属地省编码
*  22. loginCity 登录号码归属地市编码
*  23. carrierOperator 运营商名称(v5.2.0新增字段，异网专区使用),001：中国电信，002：中国移动，003：中国联通
* error:
*
* @export
* @returns {Promise<IAppUserInfo>}
*/
export function getUserInfo() {
  return new Promise((resolve, reject) => {
      window.leadeon.getUserInfo({
          debug: false,
          success: (res) => {
              // var cid = res.cid; //推送标识
              // var clientID = res.clientID; //客户端唯一标识
              // var xk = res.xk; //客户端安全ID
              // var ak = res.ak; //签名字串
              // var sn = res.sn; //设备型号
              // var st = res.st; //系统类型 int
              // var sv = res.sv; //系统版本号
              // var version = res.version; //客户端版本号
              // var sp = res.sp; //屏幕分辨率
              // var osType = res.osType; //设备类型 android wp ios
              // var channel = res.channel; //渠道编码
              // var province = res.province; //省编码
              // var city = res.city; //市编码

              // var imei = res.imei; //imei, 3.8 新增
              // var sb = res.sb; //手机品牌, 3.8 新增
              // var nt = res.nt; //上网方式, 3.8 新增      0：2g, 1:3g，2: 4g，3:wifi

              // // 登录状态信息：
              // var phoneNumber = res.phoneNumber; //用户电话号码
              // var curTime = res.curTime; //查询时间
              // var userBrand = res.userBrand; //用户品牌
              // var token = res.token; //会话信息
              // var loginProvince = res.loginProvince; //登录号码归属地省编码
              // var loginCity = res.loginCity; //登录号码归属地市编码
              // var carrierOperator = res.carrierOperator; //运营商名称(v5.2.0新增字段，异网专区使用),001：中国电信，002：中国移动，003：中国联通
              resolve(res);
          },
          error: (res) => {
              reject(res);
          },
      });
  });
}

/**
* 设置分享
*
* enable： 能否分享
* shareObj：
*  1. t1itle: '', //分享标题 -必传(V4.3变更)
*  2. link: '', //分享链接,参数中如果有中文，需要对参数进行编码 -必传(V4.3变更)
*  3. imgUrl: '', //分享图标 -必传(V4.3变更)
*  4. content: '', //分享内容 -必传(V4.3变更)
*  5. type: '', //分享类型,music、video或link，不填默认为link (ios只支持link)
*  6. dataUrl: '', //如果type是music或video，则要提供数据链接，默认为空
*  7. funCode: '', // 功能编码-V3.8新加
*  8. stepId: '', // 步骤ID-V3.8新加
*  9. shareChannelArray: ['0','1'], // 分享渠道列表，默认不传-5.0新增   5.1 新增快照选项，⚠️5.2修改： 建议截屏长度不超过5屏
*                         //-3: 微信快照, -2:朋友圈快照, -1:保存快照到相册, 0: 微信朋友圈, 1:微信好友, 2:新浪微博, 3:二维码,4：QQ, 5：QQ空间, 6：短信, 7: 更多
*  10. qrCodeUrl: '',//活动URL，客户端负责转成二维码图片（截屏分享才有）5.2 新增
*
* @export
* @param {boolean} enable
* @param {IWechatShareConfig} shareObj
* @returns {Promise<any>}
*/
export function enableShared(enable, shareObj) {
  return new Promise((resolve, reject) => {
      window.leadeon.enableShared({
          debug: false,
          enable,
          shareObj,
          // 分享内容
          // shareObj: {
          //   title: title,
          //   link: link,
          //   imgUrl: imgUrl,
          //   content: content,
          //   type: type,
          //   shareChannelArray: arr,
          //   qrCodeUrl: qrCodeUrl,
          //   dataUrl: dataUrl
          // },      //分享内容
          success: (res) => {
              resolve(res);
          },
          error: (err) => {
              reject(err);
          },
      });
  });
}
