const glob = require('glob');
const path = require('path');

/**
 * 初始化 pages 下所有的页面
 *
 * @param {string} type
 * @returns
 */
function initEntry(type) {
  // const ENTRY = type === 'js' ? 'main.js' : 'main.ts';
  // const PAGE_FLODER = type === 'js' ? path.resolve(__dirname, '../public/js/pages/') : path.resolve(__dirname, '../public/ts/pages/');
  // const PAGE_FLODER = type === 'js' ? path.resolve(__dirname, '../public/js/pages/') : path.resolve(__dirname, '../public/ts/pages/');
  const ENTRY = 'main.js';
  const PAGE_FLODER = path.resolve(__dirname, '../public/pages/') ;
  const PAGES = PAGE_FLODER + '/**/' + ENTRY;
  const pageMap = {};
  glob.sync(PAGES).forEach((entry) => {
    const pageName = getPageName(entry, PAGE_FLODER, ENTRY);
    pageMap[pageName] = entry;
  });

  return pageMap;
}

/**
 * 获取目录名字
 *
 * @param {string} filePath
 * @param {string} PAGE_FLODER
 * @param {string} ENTRY
 * @returns
 */
function getPageName(filePath, PAGE_FLODER, ENTRY) {
  return filePath.substring(PAGE_FLODER.length + 1, filePath.indexOf(ENTRY) - 1);
}

module.exports = {
  initEntry,
};
