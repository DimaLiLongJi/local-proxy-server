/**
 * 创建页面环境
 * 
 * 返回枚举值 1微信 2手厅 3浏览器 4其他
 *
 * @returns
 */
function createSourceId() {
  var u_agent = navigator.userAgent.toLowerCase();
  var sourceId = 4;
  if (u_agent.indexOf(' leadeon/') > -1) {
    sourceId = 2;
  } else if (u_agent.indexOf('micromessenger') > -1) {
    sourceId = 1;
  } else {
    sourceId = 3;
  }
  return sourceId;
}

var baseUrl = 'https://wxxcs.hl139.net';
if (window.location.hostname === 'localhost') baseUrl = '';


/**
 * 创建单页访问日志
 * 
 *  mobile 手机号
 *  jumpUrl 跳出地址
 *  channel 渠道
 *
 * @param {{
 *  mobile?: string | number,
 *  jumpUrl?: string,
 *  channel?: string
 * }} logData
 * @returns {Promise<any>}
 */
function createVisitLog(logData) {
  console.log(logData);
  return $.ajax(baseUrl + "/logs/visitRecord/addLog", {
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      mobile: logData.mobile,
      jumpUrl: logData.jumpUrl,
      url: window.location.href,
      channel: logData.channel,
      sourceId: createSourceId(),
    })
  });
}

/**
 * 创建活动办理日志
 * 
 * actId 活动编码
 * url    当前页面url  必填
 * channel   来源渠道 
 * funcationName   调用方法名
 * sourceId  1.微信 2.手厅app 3.浏览器 4.未知  必填
 * acceptMobile 业务办理手机号 必填
 * zfCode  资费编码
 * actId  营销活动编码
 * actName 活动名称
 * meansId  营销档位编码
 * meansName 营销档位名称
 * resultCode  办理结果标志  必填 0成功 其他失败
 * returnCode  接口返回结果码 必填
 * returnMsg  接口返回结果码  必填
 *
 * @param {{
 *  channel?: string,
 *  funcationName: string,
 *  mobile: string | number,
 *  acceptMobile: string,
 *  zfCode?: string,
 *  actId?: string,
 *  actName?: string,
 *  meansId?: string,
 *  meansName?: string,
 *  resultCode: number,
 *  returnCode?: string,
 *  returnMsg?: string,
 * }} logData
 * @returns
 */
function createHandlerLog(logData) {
  return $.ajax(baseUrl + "/logs/handleRecord/handleAddLog", {
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      url: window.location.href,
      channel: logData.channel,
      funcationName: logData.funcationName,
      sourceId: createSourceId(),
      mobile: logData.mobile,
      acceptMobile: logData.acceptMobile,
      zfCode: logData.zfCode,
      actId: logData.actId,
      actName: logData.actName,
      meansId: logData.meansId,
      meansName: logData.meansName,
      resultCode: logData.resultCode,
      returnCode: logData.returnCode || 'null',
      returnMsg: logData.returnMsg || 'null',
    })
  });
}

/**
 * 创建活动访问日志
 * 
 *  actId 活动编码
 *  actName 活动名称
 *  mobile 手机号
 *  jumpUrl 跳出地址
 *  channel 渠道
 *
 * @param {{
 *  actId?: string,
 *  actName?: string,
 *  mobile?: string | number,
 *  jumpUrl?: string,
 *  channel?: string,
 * }} logData
 * @returns {Promise<any>}
*/
 function createActivityVisitLog(logData) {
   console.log(logData);
   return $.ajax(baseUrl + "/logs/activityVisitRecord/addActivityLog", {
     type: 'POST',
     contentType: 'application/json',
     data: JSON.stringify({
       actId: logData.actId,
       actName: logData.actName,
       mobile: logData.mobile,
       jumpUrl: logData.jumpUrl,
       url: window.location.href,
       channel: logData.channel,
       sourceId: createSourceId(),
     })
   });
 }
