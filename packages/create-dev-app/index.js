#!/usr/bin/env node

const cp = require('child_process')
const path = require('path')
const chalk = require('chalk')
const commander = require('commander')
const package = require('./package.json')

let directoryName;

const program = new commander.Command(package.name)

// 命令配置
program
  .version(package.version)
  .arguments('<directory-name>')
  .description('初始化项目脚手架')
  .usage(`${chalk.red('<directory-name>')} [options]`)
  .action(function(name) {
    directoryName = name
  })
  .exitOverride()

// 自定义错误提示
try {
  program.parse(process.argv);
} catch (err) {
  if (typeof directoryName === 'undefined') {
    console.error('请输入文件夹名称来创建项目:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('<directory-name>')}`
    );
    console.log();
    console.log('例:');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-project')}`);
    console.log();
    console.log('运行:');
    console.log(`  ${chalk.cyan(`${program.name()} --help`)} 查看所有配置项`);
    console.log();
    process.exit(1);
  }
}

createApp(directoryName)

/** 
 * ----------------------家----------------------
 * 创建目录 --- 「2020/11/12-17:31:25」星期四
 * ----------------------璐----------------------
 * @desc 通过传入的 directoryName 在本地电脑位置创建同名目录
 * @param {name: string}
 * @return null
 */
function createApp(name) {
  const projectPath = path.resolve(name)
  console.log(projectPath)
}
