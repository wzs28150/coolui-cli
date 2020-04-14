/*
 * @Descripttion: axios api接口 处理接口设置与拦截
 * @version: 1.0.0
 * @Author: wzs
 * @Date: 2020-04-02 22:53:27
 * @LastEditors: wzs
 * @LastEditTime: 2020-04-13 21:19:07
 */
import Abi from 'wx-axios-promise'
let api = Abi()
let showLoading = false
const instance = api.create({
  url: 'https://api.coolwl.net/geyun/api/v1'
})
instance.interceptors.response.use(function (response) {
  //接口||wx.接口
  if (showLoading) {
    wx.hideLoading()
  }
  try {
    if (response.data.code == 1) {
      return response.data.data
    } if (response.data.code == -3) {
      wx.reLaunch({
        url: '/pages/user/index'
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  } catch (error) {

  }

}, function (error) {
  return error
})
instance.interceptors.request.use(function (config) {
  //返回的是和wx.request相关的参数
  if (wx.getStorageSync("token")) {
    config.header = {
      "content-type": "application/json",
      'Authorization': 'Bearer ' + wx.getStorageSync("token"),
      Cookie: wx.getStorageSync("sessionId")
    }
  }
  if (showLoading) {
    wx.showLoading({
      title: '加载内容'
    })
  }

  return config;
}, function (error) {
  return error
})
export default instance