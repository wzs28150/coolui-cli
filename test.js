/*
 * @Descripttion: test
 * @version: 
 * @Author: wzs
 * @Date: 2020-04-14 18:51:05
 * @LastEditors: wzs
 * @LastEditTime: 2020-04-14 19:17:11
 */
/**
 * Created by xushaoping on 17/10/11.
 */

const fs = require('fs-extra')

const name = 'coolui'
// const pageFile = './src/page/' + name + '/' + name + '.vue'
// const styleFile = './src/page/' + name + '/' + name + '.less'
// fs.pathExists(pageFile, (err, exists) => {
//     if (exists) {
//         console.log('this file has created')
//     } else {
//         fs.copy('./src/template/page.vue', pageFile, err => {
//             if (err) return console.error(err)
    
//             console.log(pageFile + '  has created')
//         })
//         fs.copy('./src/template/page.less', styleFile, err => {
//             if (err) return console.error(err)
        
//             console.log(styleFile + '  has created')
//         })
//     }
// })

// function copyFolder(from, to) {        // 复制文件夹到指定目录
//     let files = [];
//     if (fs.existsSync(to)) {           // 文件是否存在 如果不存在则创建
//         files = fs.readdirSync(from);
//         files.forEach(function (file, index) {
//             var targetPath = from + "/" + file;
//             var toPath = to + '/' + file;
//             if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
//                 copyFolder(targetPath, toPath);
//             } else {                                    // 拷贝文件
//                 fs.copyFileSync(targetPath, toPath);
//             }
//         });
//     } else {
//         fs.mkdirSync(to);
//         copyFolder(from, to);
//     }
// }
// copyFolder('./src/template/app', './src/web');
