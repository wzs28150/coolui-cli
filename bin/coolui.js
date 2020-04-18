#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const program = require("commander");
const spawn = require("cross-spawn");
const inquirer = require("inquirer");
// const success = require('../src/logger').success
const info = require("../src/logger").info;
const options = {
  cmd: "",
  projectName: "",
  mirror: "default",
  language: "en",
};

program
  .version(require("../package").version, "-v, --version")
  .usage("<cmd> [project-name]")
  .option(
    "-m, --mirror <mirror>",
    "Select mirror like: npm, cnpm, taobao",
    /^(npm|cnpm|taobao|nj|rednpm|skimdb|yarn)$/i
  )
  .option(
    "-c, --createComponents <name>",
    "create a Components",
    createComponents
  )
  .option("-p, --createPage <name>", "create a Page", createPage)
  .option("-a, --createApi <name>", "create a Api", createApi)
  .option(
    "-l, --language <language>",
    "Select language: en / cn",
    selectLanguage
  )
  .on("-h, --help", help);

program
  .command("init [projectName]")
  .alias("i")
  .description("Initialize a new coolui application in the current folder")
  .action(function (projectName) {
    console.log();
    info("欢迎使用cool系统", "请安提示进行操作");
    console.log()
    return inquirer
      .prompt([
        {
          type: "list",
          name: "template",
          message: "请选择要开发的内容",
          default: true,
          choices: [
            {
              name: "1. 小程序 v1.0.0",
              value: "weapp",
            },
            {
              name: "2. pc多页面 v1.0.0",
              value: "pc-m",
            },
            {
              name: "3. pc单页面 (待完善)",
              value: "pc-s",
            },
            {
              name: "4. wap多页面 (待完善)",
              value: "wap-m",
            },
            {
              name: "5. wap单页面 (待完善)",
              value: "wap-s",
            },
            {
              name: "6. coolphp tp5.0版 v1.0.0",
              value: "tp5",
            },
            {
              name: "7. coolphp tp6.0版 (待完善)",
              value: "tp6",
            },
          ],
        },
      ])
      .then((answers) => {
        require("../src/init-template")({
          template: answers.template,
          project: projectName,
          mirror: options.mirror,
          language: options.language,
        });
      });
  });

program.command("*").action(function (currentCmd) {
  const templateName = isInitTemplate(currentCmd); // verify init-{templateName}
  // eslint-disable-next-line
  const option = arguments[2] || arguments[1]; // if no arguments[2], second parameter is an option.
  // eslint-disable-next-line
  const projectName = typeof arguments[1] === "string" ? arguments[1] : ""; // if arguments[1] is not a string, no project name input.
  // init a template
  if (templateName) {
    const cmd = "init-template";
    if (option.parent.mirror && typeof option.parent.mirror === "string") {
      options.mirror = option.parent.mirror;
    }
    // coolui init-{templateName} {projectName}
    switchCommand(cmd, {
      project: projectName,
      template: templateName,
      mirror: options.mirror,
      language: options.language,
    });
  } else {
    // default, if it is not init a template
    spawn("coolui", ["-h"], {
      stdio: "inherit",
    });
  }
});

program.parse(process.argv);

function switchCommand(cmd, args) {
  if (cmd) {
    // eslint-disable-next-line
    require("../src/" + cmd)(args);
  } else {
    setTimeout(program.help, 0);
  }
}

function selectLanguage(language) {
  if (language !== "en" && language !== "cn") {
    language = "en";
  }
  options.language = language;
  return language;
}

// verify a command is init a template, and return a template name without init-
// i.e. init-coolui-cli to coolui-cli
function isInitTemplate(cmd) {
  // eslint-disable-next-line
  return /init-(.)+/.test(cmd) && /init-([^\ ]+)/.exec(cmd)[1];
}

function getcoolconfig(callback) {
  const config = "./coolui.json";
  fs.readFile(config, "utf8", function (err, data) {
    if (err) {
      console.log("缺少项目配置文件coolui.json!");
    } else {
      const configarr = JSON.parse(data);
      if (!configarr.type) {
        console.log("缺少必要参数type!");
      } else {
        if (callback) callback(configarr.type);
      }
    }
  });
}

function createComponents(name) {
  getcoolconfig(function (type) {
    if (type == "weapp") {
      const pageFile = "./components/" + name;
      const wxmlFile = "./components/" + name + "/" + name + ".wxml";
      const jsonFile = "./components/" + name + "/" + name + ".json";
      const styleFile = "./components/" + name + "/" + name + ".less";
      const jsFile = "./components/" + name + "/" + name + ".js";
      const wxssFile = "./components/" + name + "/" + name + ".wxss";
      fs.exists(pageFile, (err, exists) => {
        if (err) {
          console.log("该页面已存在!");
        } else {
          fs.mkdir("./components/" + name + "/", 0777, function (err) {
            if (err) {
              console.log("文件夹创建失败,请检查是否已存在!");
            } else {
              console.log();
              fs.copyFile(
                __dirname + "/../src/template/weapp/components.wxml",
                wxmlFile,
                (err) => {
                  if (err) return console.error(err);
                  console.log(wxmlFile + "  创建成功!");
                }
              );
              fs.copyFile(
                __dirname + "/../src/template/weapp/components.json",
                jsonFile,
                (err) => {
                  if (err) return console.error(err);
                  console.log(jsonFile + "  创建成功!");
                }
              );
              fs.copyFile(
                __dirname + "/../src/template/weapp/components.less",
                styleFile,
                (err) => {
                  if (err) return console.error(err);
                  console.log(styleFile + "  创建成功!");
                }
              );
              fs.copyFile(
                __dirname + "/../src/template/weapp/components.js",
                jsFile,
                (err) => {
                  if (err) return console.error(err);
                  console.log(jsFile + "    创建成功!");
                }
              );
              fs.copyFile(
                __dirname + "/../src/template/weapp/components.wxss",
                wxssFile,
                (err) => {
                  if (err) return console.error(err);
                  console.log(wxssFile + "  创建成功!");
                  console.log();
                }
              );
            }
          });
        }
      });
    }
  });
  return false;
}

function createPage(name) {
  getcoolconfig(function (type) {
    if (type == "weapp") {
      const appFile = "./app.json";
      const pageFile = "./pages/" + name;
      const wxmlFile = "./pages/" + name + "/" + name + ".wxml";
      const jsonFile = "./pages/" + name + "/" + name + ".json";
      const styleFile = "./pages/" + name + "/" + name + ".less";
      const jsFile = "./pages/" + name + "/" + name + ".js";
      const wxssFile = "./pages/" + name + "/" + name + ".wxss";
      fs.exists(pageFile, (err, exists) => {
        if (err) {
          console.log("该页面已存在!");
        } else {
          fs.mkdir("./pages/" + name + "/", 0777, function (err) {
            if (err) {
              console.log("文件夹创建失败,请检查是否已存在!");
            } else {
              fs.copyFile(
                __dirname + "/../src/template/weapp/page.wxml",
                wxmlFile,
                (err) => {
                  if (err) return console.error(err);
                  console.log(wxmlFile + "  创建成功!");
                }
              );
              fs.copyFile(
                __dirname + "/../src/template/weapp/page.json",
                jsonFile,
                (err) => {
                  if (err) return console.error(err);
                  console.log(jsonFile + "  创建成功!");
                }
              );
              fs.copyFile(
                __dirname + "/../src/template/weapp/page.less",
                styleFile,
                (err) => {
                  if (err) return console.error(err);
                  console.log(styleFile + "  创建成功!");
                }
              );
              fs.copyFile(
                __dirname + "/../src/template/weapp/page.js",
                jsFile,
                (err) => {
                  if (err) return console.error(err);
                  console.log(jsFile + "    创建成功!");
                }
              );
              fs.copyFile(
                __dirname + "/../src/template/weapp/page.wxss",
                wxssFile,
                (err) => {
                  if (err) return console.error(err);
                  console.log(wxssFile + "  创建成功!");
                }
              );
            }
          });
          fs.readFile(appFile, "utf8", function (err, appdata) {
            const appconfig = JSON.parse(appdata);
            if (!in_array("pages/" + name + "/" + name, appconfig.pages)) {
              appconfig.pages.push("pages/" + name + "/" + name);
              let Content = JSON.stringify(appconfig, null, 4);
              fs.writeFile(appFile, Content, "utf8", (err) => {
                if (err) throw err;
                console.log();
                console.log("页面创建成功!");
                console.log();
              });
            }
          });
        }
      });
    }
  });
  return false;
}

function in_array(search, array) {
  for (var i in array) {
    if (array[i] == search) {
      return true;
    }
  }
  return false;
}

function createApi(name) {
  getcoolconfig(function (type) {
    if (type == "weapp") {
      const jsFile = "./api/" + name + ".js";
      fs.exists(jsFile, (err, exists) => {
        if (err) {
          console.log("该接口已存在");
        } else {
          fs.copyFile(__dirname + "/../src/template/weapp/api.js", jsFile, (err) => {
            if (err) return console.error(err);
            console.log();
            console.log(jsFile + "    创建成功!");
            console.log();
          });
        }
      });
    }
  });
}

function help() {}
