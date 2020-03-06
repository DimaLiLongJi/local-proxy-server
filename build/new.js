#! /usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const glob = require('glob');
// const projectConfig = require('../project.config.json');


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

/**
 * 检查文件名是否存在
 *
 * @param {string} name
 * @returns
 */
function checkFinderName(name) {
  const nameList = new Map();

  // const jsFinder = path.resolve(__dirname, '../public/js/pages/');
  const jsFinder = path.resolve(__dirname, '../public/pages/');
  const jsEntry = 'main.js';
  const jsPages = jsFinder + '/**/' + jsEntry;

  // const tsFinder = path.resolve(__dirname, '../public/ts/pages/');
  // const tsEntry = 'main.ts';
  // const tsPages = tsFinder + '/**/' + tsEntry;

  glob.sync(jsPages).forEach((entry) => {
    const pageName = getPageName(entry, jsFinder, jsEntry);
    nameList.set(pageName, pageName);
  });

  // glob.sync(tsPages).forEach((entry) => {
  //   const pageName = getPageName(entry, tsFinder, tsEntry);
  //   nameList.set(pageName, pageName);
  // });

  return nameList.has(name);
}

/**
 * 读取模板并复制文件
 *
 * @param {string} templatePath
 * @param {string} targetPath
 * @returns
 */
async function copyTemplate(templatePath, targetPath) {
  try {
    const paths = fs.readdirSync(templatePath);
    paths.forEach(async (_path) => {
      const _targetPath = path.resolve(targetPath, _path);
      const _templatePath = path.resolve(templatePath, _path);
      console.log("创建中...  " + _targetPath);
      if (!fs.statSync(_templatePath).isFile()) {
        fs.mkdirSync(_targetPath);
        await copyTemplate(_templatePath, _targetPath);
      } else {
        await copyFile(_targetPath, _templatePath);
      }
    });
  } catch (error) {
    console.log(error);
    console.log('    ', '----------------------------------------');
    console.log('    ', chalk.red('★'), chalk.red('构建失败'));
    console.log('    ', chalk.red('★'), chalk.red(`失败原因: ${error}`));
    return false;
  }
  return true;
}

/**
 * 复制文件到指定目录
 *
 * @param {string} _targetPath
 * @param {string} _templatePath
 */
async function copyFile(_targetPath, _templatePath) {
  await fs.writeFileSync(_targetPath, fs.readFileSync(_templatePath), "utf-8");
}

/**
 * 替换文件中的占位符
 *
 * @param {string} path
 * @param {string} replaceContent
 */
function replaceRouterFileTemplate(path, replaceContent) {
  const content = fs.readFileSync(path, 'utf8');
  const newContent = content.replace(/\$needReplacePathToken/g, replaceContent);
  fs.writeFileSync(path, newContent, { encoding: 'utf8' });
  console.log('    ', chalk.green('★'), chalk.green('路由文件替换完毕'));
}

/**
 * 替换文件中的占位符
 *
 * @param {string} path
 * @param {string} replaceContent
 */
function replacMainFileTemplate(path, replaceContent) {
  const content = fs.readFileSync(path, 'utf8');
  const newContent = content.replace(/\$needReplaceBusinessType/g, replaceContent);
  fs.writeFileSync(path, newContent, { encoding: 'utf8' });
  console.log('    ', chalk.green('★'), chalk.green('main文件替换完毕'));
}

program
  .version('0.1.0')
  .parse(process.argv);

program
  // .command('create')
  .description('创建前端项目')
  .action(async (cmd, option) => {
    // 获取交互 使用哪种语言 并获取项目名
    const answers = await inquirer.prompt([
    //   {
    //   type: 'list',
    //   name: 'languageChoice',
    //   message: '想用什么语言写vue应用呢',
    //   choices: [
    //     {
    //       name: 'JavaScript',
    //       value: 'js'
    //     },
    //     {
    //       name: 'TypeScript',
    //       value: 'ts'
    //     }
    //   ]
    // },
    {
      type: 'input',
      message: '设置创建的活动文件夹名',
      name: 'pathname',
      validate: (val) => {
        const has = checkFinderName(val);
        if (!has) return true;
        else return `文件夹名字：${val} 已存在，请重新输入`;
      }
    }, {
      type: 'input',
      message: '设置创建的活动businessType',
      name: 'businessType'
    }]);
    // 设置模板路径
    let templatePath = '';
    // 设置创建目录路径
    let targetPath = '';
    // 获取路由文件路径
    let routerFilePath = '';
    // if (answers.languageChoice === 'js') {
      templatePath = path.resolve(__dirname, './template');
      // targetPath = path.resolve(__dirname, `../public/js/pages/${answers.pathname}`);
      targetPath = path.resolve(__dirname, `../public/pages/${answers.pathname}`);
      routerFilePath = `${targetPath}/config/router.js`;
      mainPath = `${targetPath}/main.js`;
    // } else {
    //   templatePath = path.resolve(__dirname, './template/ts');
    //   targetPath = path.resolve(__dirname, `../public/ts/pages/${answers.pathname}`);
    //   routerFilePath = `${targetPath}/config/router.ts`;
    // }

    // 创建文件目录
    fs.mkdirSync(targetPath);

    // 复制模板
    const result = await copyTemplate(templatePath, targetPath);

    if (result) {
      // 替换文件的标志位
      replaceRouterFileTemplate(routerFilePath, answers.pathname);
      replacMainFileTemplate(mainPath, answers.businessType);
      console.log('    ', '----------------------------------------');
      console.log('    ', chalk.green('★'), chalk.green('构建成功'));
      console.info('    ', chalk.green('★'), chalk.green(`请运行 npm start 并在浏览器打开`));
    }
  });

program.parse(process.argv);
