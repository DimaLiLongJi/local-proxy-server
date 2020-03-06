/**
 * 插码统一调用方法
 *
 * type 类型
 * 1. visit访问
 * 2. establish点击开通
 * 3. success办理成功
 * 4. error办理失败
 *
 * @export
 * @param {string} type 类型：visit访问
 * @param {string} siN 资费名称
 * @param {string} errCode
 * @param {string} errMsg
 */
export function sendWebtrends(type, siN, siS, errCode, errMsg) {
  switch (type) {
    case 'visit':
      window.Webtrends.multiTrack({
        argsa: ['WT.si_n', siN, 'WT.si_x', '1'],
      });
      break;
    case 'establish':
      window.Webtrends.multiTrack({
        argsa: ['WT.si_n', siN, 'WT.si_s', siS, 'WT.si_x', '20'],
      });
      break;
    case 'success':
      window.Webtrends.multiTrack({
        argsa: ['WT.si_n', siN, 'WT.si_s', siS, 'WT.si_x', '99'],
      });
      break;
    case 'error':
      window.Webtrends.multiTrack({
        argsa: ['WT.si_n', siN, 'WT.si_s', siS, 'WT.si_x', '-99', 'WT.errCode', errCode, 'WT.errMsg', errMsg],
      });
      break;
    default:
      break;
  }
}