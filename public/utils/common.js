import { postMethod } from './http';

export function getRandomHex() {
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += Math.floor(Math.random() * 16).toString(16);
  }
  return result;
}

export function getCode(mobile) {
  return postMethod('/api/core/authcode/send', {
    params: { mobile: mobile }
  });
}

export function verifyCode(mobile, code) {
  return postMethod('/api/core/authcode/validateCode', {
    params: {
      mobile: mobile,
      receiveMobile: mobile,
      code: code
    }
  });
}