#!/usr/bin/env node
/*
 * @Title: 
 * @Author: wzs
 * @Date: 2020-04-14 17:15:05
 * @LastEditors: wzs
 * @LastEditTime: 2020-04-14 19:19:33
 * @Description: 
 */
process.title = "coolui";

require('commander')
.version(require('../package').version)
.usage('<command> [options]')
.command('generate', 'generate file from a template, (command will generate file current folder)')
.parse(process.argv)

require('./coolui-generate');