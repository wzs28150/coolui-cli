/*
 * @Author: your name
 * @Date: 2020-04-07 08:27:29
 * @LastEditTime: 2020-04-13 21:17:09
 * @LastEditors: wzs
 * @Description: In User Settings Edit
 * @FilePath: \geyun\pages\index\index.js
 */
const app = getApp();
Page({
  onLoad: function (options) {

  },
  onShow: function () {
    let that = this;
    setTimeout(() => {
      if (wx.getStorageSync("token") && wx.getStorageSync("type")) {
        if (wx.getStorageSync("type") == 1) {
          // 用户端
          app
            .checkPhoneSession()
            .then(function (res) {
              if (res) {
                wx.reLaunch({
                  url: "/pages/user/index",
                });
              }
            })
            .catch(function (err) {
              app.phoneLoginState().then(function (data) {
                console.log(data)
                if (data) {
                  wx.reLaunch({
                    url: "/pages/user/index",
                  });
                }
              });
            });
        } else {
          // 检测端
          setTimeout(() => {
            app
              .checkInspectorSession()
              .then(function (data) {
                if (data) {
                  wx.reLaunch({
                    url: "/pages/inspector/index/index",
                    // url: "/pages/info/index?id=1",
                  });
                }
              })
              .catch(function (err) {
                wx.reLaunch({
                  url: "/pages/inspector/login/index",
                });
              });
          }, 100);
        }
      } else {
        wx.reLaunch({
          // url: "/pages/user/index",
          url: "/pages/inspector/login/index",
          // url: "/pages/info/index?id=1",
        });
      }
    }, 1000);
    
  }
})