/*
 * @Title: careat
 * @Author: wzs
 * @Date: 2020-04-14 17:15:05
 * @LastEditors: wzs
 * @LastEditTime: 2020-04-14 19:24:26
 * @Description: 
 */
const fs = require('fs-extra');
const chalk = require('chalk');
exports.run = function (type, name) {
    fs.pathExists('src', (err, exists) => {
        if (!exists) {
            console.log('src folder is not defined');
        } else {
            switch (type) {
                case 'page':
                    const pageFile = './src/page/' + name + '/' + name + '.vue';
                    const styleFile = './src/page/' + name + '/' + name + '.less';
                    const jsFile = './src/page/' + name + '/' + name + '.js';
                    fs.pathExists(pageFile, (err, exists) => {
                        if (exists) {
                            console.log('this file has created')
                        } else {
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/page.vue', pageFile, err => {
                                if (err) return console.error(err);
                                console.log(pageFile + '  has created')
                            });
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/page.less', styleFile, err => {
                                if (err) return console.error(err);
                                console.log(styleFile + '  has created')
                            });
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/page.js', jsFile, err => {
                                if (err) return console.error(err);
                                console.log(jsFile + '  has created')
                            });

                        }
                    });
                    break;
                case 'p':
                    const pageFile = './src/page/' + name + '/' + name + '.vue';
                    const styleFile = './src/page/' + name + '/' + name + '.less';
                    const jsFile = './src/page/' + name + '/' + name + '.js';
                    fs.pathExists(pageFile, (err, exists) => {
                        if (exists) {
                            console.log('this file has created')
                        } else {
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/page.vue', pageFile, err => {
                                if (err) return console.error(err);
                                console.log(pageFile + '  has created')
                            });
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/page.less', styleFile, err => {
                                if (err) return console.error(err);
                                console.log(styleFile + '  has created')
                            });
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/page.js', jsFile, err => {
                                if (err) return console.error(err);
                                console.log(jsFile + '  has created')
                            });

                        }
                    });
                    break;
                case 'component':
                    const componentFile = './src/components/' + name + '/' + name + '.vue';
                    const cssFile = './src/components/' + name + '/' + name + '.less';
                    const jsxFile = './src/components/' + name + '/' + name + '.js';
                    fs.pathExists(componentFile, (err, exists) => {
                        if (exists) {
                            console.log('this file has created')
                        } else {
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/component.vue', componentFile, err => {
                                if (err) return console.error(err);
                                console.log(componentFile + '  has created')
                            });
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/component.less', cssFile, err => {
                                if (err) return console.error(err);
                                console.log(cssFile + '  has created')
                            });
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/component.js', jsxFile, err => {
                                if (err) return console.error(err);
                                console.log(componentFile + '  has created')
                            })
                        }
                    });
                    break;
                case 'c':
                    const componentFile = './src/components/' + name + '/' + name + '.vue';
                    const cssFile = './src/components/' + name + '/' + name + '.less';
                    const jsxFile = './src/components/' + name + '/' + name + '.js';
                    fs.pathExists(componentFile, (err, exists) => {
                        if (exists) {
                            console.log('this file has created')
                        } else {
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/component.vue', componentFile, err => {
                                if (err) return console.error(err);
                                console.log(componentFile + '  has created')
                            });
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/component.less', cssFile, err => {
                                if (err) return console.error(err);
                                console.log(cssFile + '  has created')
                            });
                            fs.copy('/usr/local/lib/node_modules/coolui-cli/src/template/component.js', jsxFile, err => {
                                if (err) return console.error(err);
                                console.log(componentFile + '  has created')
                            })
                        }
                    });
                    break;
                default:
                    console.log(chalk.red(`ERROR: uncaught type , you should input like $ coolui g page demo`))
                    console.log()
                    console.log('  Examples:')
                    console.log()
                    console.log(chalk.gray('    # create a new page'))
                    console.log('    $ coolui g page product')
                    console.log()
                    console.log(chalk.gray('    # create a new component'))
                    console.log('    $ coolui g component  product')
                    console.log()
                    console.log(chalk.gray('    # create a new store'))
                    console.log('    $ coolui g store  product')
                    console.log()
                    break;
            }
        }
    });
};