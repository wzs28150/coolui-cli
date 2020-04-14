#!/usr/bin/env node
/*
 * @Title: 
 * @Author: wzs
 * @Date: 2020-04-14 17:15:05
 * @LastEditors: wzs
 * @LastEditTime: 2020-04-14 19:24:56
 * @Description: 
 */
const program = require('commander');
const chalk = require('chalk')
const cooluig = require('../src/generate');
const cooluii = require('../src/init');

/**
 * Usage.
 */

program
.command('generate')
.description('quick create')
.alias('g')
.action(function(type, name){
    cooluig.run(type, name);
});
program
.command('init')
.description('init weapp')
.alias('i')
.action(function(type, name){
    cooluii.run(name);
});
program.parse(process.argv);