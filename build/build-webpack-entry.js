const glob = require('glob');
const path = require('path');

const ENTRY = 'main.js';
const PAGE_FLODER = path.resolve(__dirname, '../public/pages/');
const PAGES = PAGE_FLODER + '/**/' + ENTRY;

/**
 * 初始化 pages 下所有的页面
 *
 * @returns
 */
function initPages() {
  const pages = {};
  glob.sync(PAGES).forEach((entry) => {
    const pageName = getPageName(entry);
    pages[pageName] = entry;
  });

  return pages;
}

/**
 * 获取目录名字
 *
 * @param {*} filePath
 * @returns
 */
function getPageName(filePath) {
  return filePath.substring(PAGE_FLODER.length + 1, filePath.indexOf(ENTRY) - 1);
}

module.exports = {
  initPages,
};
