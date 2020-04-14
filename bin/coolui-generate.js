#!/usr/bin/env node
/*
 * @Title: 
 * @Author: wzs
 * @Date: 2020-04-14 17:15:05
 * @LastEditors: wzs
 * @LastEditTime: 2020-04-14 17:21:25
 * @Description: 
 */
const program = require('commander');
const chalk = require('chalk')
const coolui = require('../src/generate');


/**
 * Usage.
 */

program
.command('generate')
.description('quick generate your file')
.alias('g')
.action(function(type, name){
    coolui.run(type, name);
});
program.parse(process.argv);