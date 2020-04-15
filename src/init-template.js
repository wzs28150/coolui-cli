const path = require("path");

const join = path.join;
const basename = path.basename;
const fs = require("fs");
const spawn = require("cross-spawn");

const existsSync = fs.existsSync;
const chalk = require("chalk");
const emptyDir = require("empty-dir");
const info = require("./logger").info;
const error = require("./logger").error;
const success = require("./logger").success;
const isCnFun = require("./utils").isCnFuc;
const checkAppName = require("./utils").checkAppName;
const isSafeToCreateProjectIn = require("./utils").isSafeToCreateProjectIn;

function init(args) {
  const CooluiCli = chalk.bold.cyan("Coolui CLI");
  let isCn = isCnFun(args.language);
  const customPrjName = args.project || "";
  const templateName = args.template || "";
  const dest = join(process.cwd(), customPrjName);
  const projectName = basename(dest);
  const mirror = args.mirror;

  isCn = true;
  console.log(CooluiCli + (!isCn ? " is booting... " : " 正在启动..."));
  console.log(
    CooluiCli +
      (!isCn ? " will execute init command... " : " 即将执行 init 命令...")
  );
  checkAppName(projectName);
  if (existsSync(dest) && !emptyDir.sync(dest)) {
    if (!isSafeToCreateProjectIn(dest, projectName)) {
      process.exit(1);
    }
  }

  createApp();

  function createApp() {
    console.log(
      chalk.bold.cyan("Coolui CLI") +
        (!isCn
          ? " will creating a new Coolui app in "
          : " 即将创建一个新的应用在 ") +
        dest
    );
    let url = "";
    switch (templateName) {
      case "weapp":
        url = "https://github.com/wzs28150/coolui-weapp.git";
        weapp(url);
        break;
      case "pc-m":
        url = "https://github.com/wzs28150/coolui-weapp.git";
        weapp(url);
        break;
      case "pc-s":
        url = "https://github.com/wzs28150/coolui-weapp.git";
        weapp(url);
        break;
      case "wap-m":
        url = "https://github.com/wzs28150/coolui-weapp.git";
        weapp(url);
        break;
      case "wap-s":
        url = "https://github.com/wzs28150/coolui-weapp.git";
        weapp(url);
        break;
      default:
        url = "https://github.com/wzs28150/coolui-weapp.git";
        weapp(url);
        break;
    }
  }

  function weapp(url) {

    const { status, error: cloneError } = spawn.sync("git", [
      "clone",
      "--depth=1",
      url,
      customPrjName || ".",
    ]);

    // verify git clone succeed
    if (!cloneError && status === 0) {
      try {
        try {
          // change a project name if project.config.json exist
          if (existsSync(join(dest, "project.config.json"))) {
            // eslint-disable-next-line
            const appProjectJson = require(join(dest, "project.config.json"));
            appProjectJson.projectname = projectName;
            fs.writeFile(
              join(dest, "project.config.json"),
              JSON.stringify(appProjectJson, null, 2),
              (err) => {
                if (err) return console.log(err);
              }
            );
          }
          // change a package name as a project name if package.json exist
          if (existsSync(join(dest, "package.json"))) {
            // eslint-disable-next-line
            const appPackage = require(join(dest, "package.json"));
            appPackage.name = projectName;
            fs.writeFile(
              join(dest, "package.json"),
              JSON.stringify(appPackage, null, 2),
              (err) => {
                if (err) return console.log(err);
              }
            );
            process.chdir(customPrjName || ".");

            // install ndoe package modules
            info("正在安装依赖", "你可以使用 ctrl + c 退出，然后自行安装。");
            console.log();
            require("./install")(mirror, done); // npm install
          } else {
            done();
          }
          // remove .git
          const gitPath = join(dest, ".git");
          if (existsSync(gitPath)) {
            // spawn.sync("rm", ["-rf", gitPath]);
            delDir(gitPath);
          }
        } catch (e) {
          console.log(error(e));
        }
      } catch (e) {
        console.log(error(e));
      }
    } else {
      // if incorrect template name
      error(`安装失败请重试!`);
    }
  }

  function delDir(p) {
    // 读取文件夹中所有文件及文件夹
    var list = fs.readdirSync(p);
    list.forEach((v, i) => {
      // 拼接路径
      var url = p + "/" + v;
      // 读取文件信息
      var stats = fs.statSync(url);
      // 判断是文件还是文件夹
      if (stats.isFile()) {
        // 当前为文件，则删除文件
        fs.unlinkSync(url);
      } else {
        // 当前为文件夹，则递归调用自身
        arguments.callee(url);
      }
    });
    // 删除空文件夹
    fs.rmdirSync(p);
  }

  function done() {
    console.log();
    success(`跳转目录: cd ${projectName}`);
    console.log();
    success("生成页面: coolui -p [name]");
    console.log();
    success("生成组件: coolui -c [name]");
    console.log();
    success("生成接口: coolui -a [name]");
    console.log();
    success(`恭喜你! "${projectName}"项目初始化成功! `);
    console.log();
    console.log();
  }
}

module.exports = init;
