#!/usr/bin/env node

const cp = require('child_process')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const commander = require('commander')
const package = require('./package.json')

let directoryName;
let templateType;
let templateName;
let templateGit;

const program = new commander.Command(package.name)

// 命令配置
program
  .version(package.version, '-V, --version', '查看版本信息')
  .helpOption('-h, --help', '查看帮助文档')
  .arguments('<directory-name>')
  .description('项目脚手架搭建（联网操作）')
  .usage(`${chalk.red('<directory-name>')} [options]`)
  .action(function(name) {
    createApp(name)
  })
  .option('-v, --vue-spa', '创建 Vue(SPA) 项目', () => {
    templateType = 'vue-spa'
    templateName = 'vue_spa_environment_template'
    templateGit = 'https://github.com/zhengjialu/vue_spa_environment_template.git'
  })
  .option('-r, --react-spa', '创建 React(SPA) 项目', () => {
    templateType = 'react-spa'
    templateName = 'react_spa_environment_template'
    templateGit = 'https://github.com/zhengjialu/react_spa_environment_template.git'
  })
  .option('-p, --vue-mpa', '创建 Vue(MPA) 项目', () => {
    templateType = 'vue-mpa'
    templateName = 'vue_mpa_environment_template'
    templateGit = 'https://github.com/zhengjialu/vue_mpa_environment_template.git'
  })
  .option('-a, --react-mpa', '创建 React(MPA) 项目', () => {
    templateType = 'react-mpa'
    templateName = 'react_mpa_environment_template'
    templateGit = 'https://github.com/zhengjialu/react_mpa_environment_template.git'
  })
  .option('-m, --mobile', '创建 mobile(移动端) 项目', () => {
    templateType = 'mobile'
    templateName = 'mobile_spa_environment_template'
    templateGit = 'https://github.com/zhengjialu/mobile_spa_environment_template.git'
  })
  .option('-d, --datav', '创建 datav(可视化) 项目', () => {
    templateType = 'datav'
    templateName = 'dataview_mpa_environment_template'
    templateGit = 'https://github.com/zhengjialu/dataview_mpa_environment_template.git'
  })
  .exitOverride()

// 自定义错误提示
try {
  program.parse(process.argv);
} catch (err) {
  // logTips('请输入文件夹名称来创建项目')
}

/** 
 * ----------------------家----------------------
 * 创建目录 --- 「2020/11/12-17:31:25」星期四
 * ----------------------璐----------------------
 * @desc 通过传入的 directoryName 在本地电脑位置创建同名目录
 * @param name: String 类型（输入的文件夹名称，用于存放项目）
 * @return null
 */
function createApp(name) {
  const projectPath = path.resolve(name)
  const projectName = path.basename(projectPath)

  const files = fs.readdirSync(path.resolve())

  if (files.includes(projectName)) {
    console.log();
    console.log(`当前路径下已经存在 ${chalk.red(projectName)} 目录`);
    console.log();
    process.exit(1);
  } else {
    if (templateType) {
      console.log('开始创建项目文件夹');
      console.log('')
      fs.mkdir(projectName, () => {
        console.log(chalk.green(`${projectName} 目录创建成功`))
        console.log('')
        console.log(`开始载入 ${templateType} 脚手架...`)
        console.log('')
        createTemplate(projectName)
      })
    } else {
      logTips('请输入创建项目的框架类型')
    }
  }
}

/** 
 * ----------------------家----------------------
 * 创建脚手架 --- 「2020/11/13-17:50:06」星期五
 * ----------------------璐----------------------
 * @desc 根据类型从 GitHub 仓库拉取对应脚手架
 * @param name: String 类型（用于寻找存放脚手架内容的项目）
 * @return null
 */
function createTemplate(name) {
  cp.exec(`git clone ${templateGit} ${name}`, {
    cwd: path.resolve()
  }, () => {
    console.log(chalk.green('项目创建成功'))
    cp.execSync(`rm -rf ${path.resolve(name)}/.git`)
    console.log(chalk.green(''))
    console.log(chalk.green('---------------------------------'))
    console.log(chalk.green(''))
    console.log(chalk.green(`___cd ${name}`))
    console.log(chalk.green('___npm install'))
    console.log(chalk.green('___npm start'))
    console.log(chalk.green(''))
    console.log(chalk.green('---------------------------------'))
    console.log(chalk.green(''))
  })
}

// 日志提示
function logTips(err) {
  console.log();
  console.error(`${err}:`);
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<directory-name>')} ${chalk.green('<type>')}`
  );
  console.log();
  console.log('例:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-project')} ${chalk.green('-r')}`);
  console.log();
  console.log('运行:');
  console.log(`  ${chalk.cyan(`${program.name()} --help`)} 查看所有配置项`);
  console.log();
  process.exit(1);
}
