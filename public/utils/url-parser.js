export function cleanUrl(url){
  if(url.indexOf('?') != -1)
  return url.split('?')[0];
  return url;
}
 //获取get参数的 1.html?a=1&b=2 $get.urlParam('a')
export function urlParam(name){
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); //构造一个含有目标参数的正则表达式对象
  const r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
