/*
 * @Descripttion: 首页模块
 * @version: 1.0.0
 * @Author: wzs
 * @Date: 2020-04-02 20:24:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-07 17:18:34
 */
import {
  getList
} from '../../api/search.js'
const app = getApp();

Page({
  data: {
    value: '',
    loading: true,
    list: [],
    page: 1,
    totalPage: 0,
    isLoadMoreLoading: false,
    isRefreshLoading: false,
    stylestr: "height: calc(100% - 76rpx)",
    userInfo: null,
    show: false
  },
  onLoad() {
    // getList().then(res => console.log(res))
  },
  onShow() {
    let that = this
    setTimeout(() => {
      that.setData({
        loading: false,
        userInfo: app.globalData.userInfo
      });
      if (wx.getStorageSync("token") && that.data.userInfo) {
        this.getData(that.data.userInfo)
      } else {
        // that.setData({
        //   show: true
        // });
      }
    }, 300);


  },
  onChange(e) {
    this.setData({
      value: e.detail,
      list: []
    });
    this.getData(e.detail ? e.detail : this.data.userInfo)
  },
  getData(key) {
    let that = this
    getList({
      key: key,
      page_id: that.data.page
    }).then(res => {
      let list = that.data.list;
      if (res) {
        if (that.data.page == 1) {
          setTimeout(() => {
            that.setData({
              list: res.list,
              totalPage: res.totalPage,
              isRefreshLoading: false,
              isLoadMoreLoading: false
            });
          }, 300);

        } else {
          setTimeout(() => {
            if ( that.data.page <= res.totalPage) {
              that.setData({
                list: list.concat(res.list),
                totalPage: res.totalPage,
                isRefreshLoading: false,
                isLoadMoreLoading: false
              });
            } else {
              that.setData({
                isRefreshLoading: false,
                isLoadMoreLoading: false
              });
            }
          }, 300);
        }
      }
    })
  },
  upper: function (e) {
    let that = this;
    that.setData({
      page: 1,
      list: []
    })
    let value = that.data.value
    if (app.globalData.type == "dev") {
      that.getData(value ? value : this.data.userInfo)
    } else {
      that.getDataByServe()
    }
  },
  lower: function (e) {
    let that = this;
    console.log(that.data.page, that.data.totalPage)
    if (that.data.page <= that.data.totalPage) {
      that.setData({
        page: that.data.page <= that.data.totalPage ? that.data.page + 1 : that.data.page
      })
      let value = that.data.value
      if (app.globalData.type == "dev") {
        that.getData(value ? value : this.data.userInfo)
      } else {
        that.getDataByServe()
      }
    }

  },
  getUserInfo: function (e) {
    if (wx.getStorageSync("token")) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
      this.getData(app.globalData.userInfo)
    }
  },
  getPhoneNumber: function (e) {
    wx.login({
      success: (result) => {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
      }
    })
  }
});