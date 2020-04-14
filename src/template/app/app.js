/*
 * @Descripttion:
 * @version:
 * @Author: wzs
 * @Date: 2020-04-02 20:24:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-07 11:14:55
 */
import { getMyInfo, doPhoneLogin, doInspectorLogin } from "./api/login.js";
App({
  globalData: {
    type: "dev",
    userInfo: null,
  },
  onLaunch() {
    
  },
  checkPhoneSession: function () {
    let that = this;
    var promise = new Promise((resolve, reject) => {
      that.globalData.token = wx.getStorageSync("token");
      getMyInfo()
        .then((res) => {
          let userInfo = res.phone;
          that.globalData.userInfo = userInfo;
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(userInfo);
          }
          resolve(userInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  },
  phoneLoginState: function (e) {
    const that = this;
    var promise = new Promise((resolve, reject) => {
      wx.login({
        success: (result) => {
          doPhoneLogin({
            code: result.code,
            iv: e.iv,
            encryptedData: e.encryptedData,
          })
            .then((resu) => {
              wx.setStorageSync("token", resu.token);
              wx.setStorageSync("type", resu.type);
              resolve(resu);
            })
            .catch((err) => {
              reject(err);
            });
        },
      });
    });
    return promise;
  },
  checkInspectorSession: function () {
    let that = this;
    var promise = new Promise((resolve, reject) => {
      that.globalData.token = wx.getStorageSync("token");
      getMyInfo()
        .then((res) => {
          let userInfo = res.type_name;
          that.globalData.userInfo = userInfo;
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(userInfo);
          }
          resolve(userInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  },
  doInspectorLoginState: function (e) {
    const that = this;
    var promise = new Promise((resolve, reject) => {
      doInspectorLogin({
        username: e.username,
        password: e.password,
      })
        .then((res) => {
          wx.setStorageSync("token", res.token);
          wx.setStorageSync("type", res.type);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  },
});
