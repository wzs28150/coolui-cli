/*
 * @Title: init
 * @Author: wzs
 * @Date: 2020-04-14 17:15:05
 * @LastEditors: wzs
 * @LastEditTime: 2020-04-14 19:24:13
 * @Description: 
 */
const fs = require('fs-extra');
const chalk = require('chalk');
exports.run = function (name) {
    fs.pathExists('src', (err, exists) => {
        if (!exists) {
            console.log('src folder is not defined');
        } else {
            function copyFolder(from, to) { // 复制文件夹到指定目录
                let files = [];
                if (fs.existsSync(to)) { // 文件是否存在 如果不存在则创建
                    files = fs.readdirSync(from);
                    files.forEach(function (file, index) {
                        var targetPath = from + "/" + file;
                        var toPath = to + '/' + file;
                        if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
                            copyFolder(targetPath, toPath);
                        } else { // 拷贝文件
                            fs.copyFileSync(targetPath, toPath);
                        }
                    });
                } else {
                    fs.mkdirSync(to);
                    copyFolder(from, to);
                }
            }
            copyFolder('./src/template/app', './' + name);
        }
    });
};