import { config as envConf } from './env';
import { urlParam } from './url-parser';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import md5 from 'md5';

// 加密接口
axios.interceptors.request.use((config) => {
  let baseUrl = '';
  if (!config.baseURL && config.url && config.url.indexOf('http') !== 0) {
    baseUrl =  envConf.requestBaseUrl;
  }

  if (config.url === '/api/core/login' || config.url === '/api/core/login/check' || config.url === '/api/mshop/acthandlcount/count') {
    config.url = baseUrl + config.url;
    return config;
  } else {

    config.url = baseUrl + config.url;
    const keyvalue = CryptoJS.enc.Utf8.parse('zxmd2013qazwsx12');
    const iv = CryptoJS.enc.Utf8.parse('qazwsx12zxmd2013');
    config.params.mobile = CryptoJS.AES.encrypt(config.params.mobile, keyvalue, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString() + '_Y';

    // 直接获取 fromAppType
    const ua = navigator.userAgent.toLowerCase();
    let fromAppType = 'web';
    if (ua.indexOf('leadeon/') > -1) fromAppType = 'leadeon';
    else if (ua.indexOf('micromessenger') > -1) fromAppType = 'wx';
    config.params.fromAppType = fromAppType;

    // 直接获取 businessType
    config.params.businessType = window.sessionStorage.getItem('hlj_businessType');

    // 直接获取 channel
    config.params.channel = urlParam('channelId') || 'noChannel';

    config.params.appId = 'ajsjdjw21344aSDDSaLLKJRMdss';
    const commonData = config.params;

    config.params.t = Date.parse(new Date().toString());
    if (commonData.receiveMobile) {
      commonData.receiveMobile = CryptoJS.AES.encrypt(commonData.receiveMobile, keyvalue, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString() + '_Y';
    }
    const keys = [];
    const commonKeys = [];
    const newCommonData= [];

    for (const key in commonData) {// 计算
      commonKeys.push(key);
    }
    commonKeys.sort();
    console.log(commonKeys);

    newCommonData.forEach((res) => {
      newCommonData[res] = '';
    });

    for (const key in commonData) {
      newCommonData[key] = commonData[key];
    }

    for (const key in newCommonData) {// 计算
      keys.push(key + '=' + commonData[key]);
    }
    keys.sort();
    console.log('keys', keys);

    let text = '';

    keys.forEach(function (key) {
      text += key + '&';
    });
    commonData.sign = md5(text.substring(0, text.length - 1) + 'ajsjdjw21344aSDDSaLLKJRMdss#Ay90*');
    config.params = commonData;

    return config;
  }

}, (err) => {
  return Promise.resolve(err);
});

axios.interceptors.response.use((res) => res.data, (err) => Promise.resolve(err));

/**
 * function getMethod for for http request of method get
 *
 * @export
 * @param {string} url
 * @returns {AxiosPromise<any>}
 */
export function getMethod(url, config) {
  return axios({
    url,
    ...config,
    method: 'get',
  });
}

/**
 * function postMethod for for http request of method post
 *
 * @export
 * @param {string} url
 * @param {Object} params
 * @returns {AxiosPromise<any>}
 */
export function postMethod(url, config) {
  return axios({
    url,
    ...config,
    method: 'post',
  });
}

/**
 * function putMethod for for http request of method put
 *
 * @export
 * @param {string} url
 * @param {Object} params
 * @returns {AxiosPromise<any>}
 */
export function putMethod(url, config) {
  return axios({
    url,
    ...config,
    method: 'put',
  });
}

/**
 * function deleteMethod for for http request of method delete
 *
 * @export
 * @param {string} url
 * @param {Object} params
 * @returns {AxiosPromise<any>}
 */
export function deleteMethod(url, config) {
  return axios({
    url,
    ...config,
    method: 'delete',
  });
}
