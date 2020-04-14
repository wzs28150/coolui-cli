#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const program = require('commander')
const spawn = require('cross-spawn')
const inquirer = require('inquirer')
// const success = require('../src/logger').success
const options = {
    cmd: '',
    projectName: '',
    mirror: 'default',
    language: 'en'
}

program
    .version(require('../package').version, '-v, --version')
    .usage('<cmd> [project-name]')
    .option('-m, --mirror <mirror>', 'Select mirror like: npm, cnpm, taobao', /^(npm|cnpm|taobao|nj|rednpm|skimdb|yarn)$/i)
    .option('-c, --createComponents <name>', 'Select mirror like: npm, cnpm, taobao', createComponents)
    .option('-p, --createPage <name>', 'Select mirror like: npm, cnpm, taobao', createPage)
    .option('-a, --createApi <name>', 'Select mirror like: npm, cnpm, taobao', createApi)
    .option('-l, --language <language>', 'Select language: en / cn', selectLanguage)
    .on('-h, --help', help)


program
    .command('init [projectName]')
    .description('Initialize a new coolui application in the current folder')
    .action(function (projectName) {
        return inquirer
            .prompt([{
                type: 'list',
                name: 'template',
                message: '请选择开发小程序或 Web 的技术栈',
                choices: [{
                    name: 'coolui-ui',
                    value: 'cooluiui'
                }]
            }])
            .then(answers => {
                require('../src/init-template')({
                    template: answers.template,
                    project: projectName,
                    mirror: options.mirror,
                    language: options.language
                })
            })
    })


program
    .command('*')
    .action(function (currentCmd) {
        const templateName = isInitTemplate(currentCmd) // verify init-{templateName}
        // eslint-disable-next-line
        const option = arguments[2] || arguments[1] // if no arguments[2], second parameter is an option.
        // eslint-disable-next-line
        const projectName = typeof arguments[1] === 'string' ? arguments[1] : '' // if arguments[1] is not a string, no project name input.
        // init a template
        if (templateName) {
            const cmd = 'init-template'
            if (option.parent.mirror && typeof option.parent.mirror === 'string') {
                options.mirror = option.parent.mirror
            }
            // coolui init-{templateName} {projectName}
            switchCommand(cmd, {
                project: projectName,
                template: templateName,
                mirror: options.mirror,
                language: options.language
            })
        } else {
            // default, if it is not init a template
            spawn('coolui', ['-h'], {
                stdio: 'inherit'
            })
        }
    })

program.parse(process.argv)

function switchCommand(cmd, args) {
    if (cmd) {
        // eslint-disable-next-line
        require('../src/' + cmd)(args)
    } else {
        setTimeout(program.help, 0)
    }
}


function selectLanguage(language) {
    if (language !== 'en' && language !== 'cn') {
        language = 'en'
    }
    options.language = language
    return language
}

// verify a command is init a template, and return a template name without init-
// i.e. init-coolui-cli to coolui-cli
function isInitTemplate(cmd) {
    // eslint-disable-next-line
    return /init-(.)+/.test(cmd) && /init-([^\ ]+)/.exec(cmd)[1]
}

function createComponents(name) {
    const pageFile = './components/' + name;
    const wxmlFile = './components/' + name + '/' + name + '.wxml';
    const jsonFile = './components/' + name + '/' + name + '.json';
    const styleFile = './components/' + name + '/' + name + '.less';
    const jsFile = './components/' + name + '/' + name + '.js';
    const wxssFile = './components/' + name + '/' + name + '.wxss';
    fs.exists(pageFile, (err, exists) => {
        if (err) {
            console.log('该页面已存在!')
        } else {
            fs.mkdir('./components/' + name + '/', 0777, function (err) {
                if (err) {
                    console.log('文件夹创建失败,请检查是否已存在!');
                } else {
                    fs.copyFile(__dirname + '/../src/template/components.wxml', wxmlFile, err => {
                        if (err) return console.error(err);
                        console.log(wxmlFile + '  创建成功!')
                    });
                    fs.copyFile(__dirname + '/../src/template/components.json', jsonFile, err => {
                        if (err) return console.error(err);
                        console.log(jsonFile + '  创建成功!')
                    });
                    fs.copyFile(__dirname + '/../src/template/components.less', styleFile, err => {
                        if (err) return console.error(err);
                        console.log(styleFile + '  创建成功!')
                    });
                    fs.copyFile(__dirname + '/../src/template/components.js', jsFile, err => {
                        if (err) return console.error(err);
                        console.log(jsFile + '    创建成功!')
                    });
                    fs.copyFile(__dirname + '/../src/template/components.wxss', wxssFile, err => {
                        if (err) return console.error(err);
                        console.log(wxssFile + '  创建成功!')
                    });
                }
            })

        }
    });
    return false
}

function createPage(name) {
    const pageFile = './pages/' + name;
    const wxmlFile = './pages/' + name + '/' + name + '.wxml';
    const jsonFile = './pages/' + name + '/' + name + '.json';
    const styleFile = './pages/' + name + '/' + name + '.less';
    const jsFile = './pages/' + name + '/' + name + '.js';
    const wxssFile = './pages/' + name + '/' + name + '.wxss';
    fs.exists(pageFile, (err, exists) => {
        if (err) {
            console.log('该页面已存在!')
        } else {
            fs.mkdir('./pages/' + name + '/', 0777, function (err) {
                if (err) {
                    console.log('文件夹创建失败,请检查是否已存在!');
                } else {
                    fs.copyFile(__dirname + '/../src/template/page.wxml', wxmlFile, err => {
                        if (err) return console.error(err);
                        console.log(wxmlFile + '  创建成功!')
                    });
                    fs.copyFile(__dirname + '/../src/template/page.json', jsonFile, err => {
                        if (err) return console.error(err);
                        console.log(jsonFile + '  创建成功!')
                    });
                    fs.copyFile(__dirname + '/../src/template/page.less', styleFile, err => {
                        if (err) return console.error(err);
                        console.log(styleFile + '  创建成功!')
                    });
                    fs.copyFile(__dirname + '/../src/template/page.js', jsFile, err => {
                        if (err) return console.error(err);
                        console.log(jsFile + '    创建成功!')
                    });
                    fs.copyFile(__dirname + '/../src/template/page.wxss', wxssFile, err => {
                        if (err) return console.error(err);
                        console.log(wxssFile + '  创建成功!')
                    });
                }
            })

        }
    });
    return false
}

function createApi(name) {
    const jsFile = './api/' + name + '.js';
    fs.exists(jsFile, (err, exists) => {
        if (err) {
            console.log('该接口已存在');
        } else {
            fs.copyFile(__dirname + '/../src/template/api.js', jsFile, err => {
                if (err) return console.error(err);
                console.log(jsFile + '    创建成功!')
            });
        }
    });
}


function help() {

}