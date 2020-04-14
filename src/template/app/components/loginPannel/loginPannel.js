/*
 * @Descripttion: 
 * @version: 
 * @Author: wzs
 * @Date: 2020-04-03 21:06:32
 * @LastEditors: wzs
 * @LastEditTime: 2020-04-06 10:05:07
 */
const app = getApp();
Component({
	options: {
		multipleSlots: true,
	},
	properties: {
		param: {
			type: Object,
			value: {},
		},
	},
	data: {
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
	},
	methods: {
		getUserInfo: function (e) {
			let that = this;
			if (e.detail.userInfo) {
				app.globalData.userInfo = e.detail.userInfo;
				that.setData({
					userInfo: e.detail.userInfo,
					hasUserInfo: true,
				});
				wx.showLoading({
					title: '登录中',
				});
				app.phoneLoginState().then(function (res) {
					if (res) {
						app.checkPhoneSession().then(function (data) {
							if (that.data.param) {
								that.triggerEvent("getUserInfo", {
									param: that.data.param
								});
							} else {
								that.triggerEvent("getUserInfo");
							}
							wx.hideLoading();
						}).catch(function (err) {
							console.log(err)
						})
					}
				}).catch(function (err) {
					console.log(err)
				})
			}
		},
		changeStatus() {
			setTimeout(()=>{
				let that = this;
				if (app.globalData.userInfo) {
					this.setData({
						hasUserInfo: true
					})
				} else if (this.data.canIUse) {
					app.userInfoReadyCallback = res => {
						this.setData({
							hasUserInfo: true
						})
					}
				} else {
					wx.getUserInfo({
						success: res => {
							app.globalData.userInfo = res.userInfo
							this.setData({
								hasUserInfo: true
							})
						}
					})
				}				
			},500)
		},
		getPhoneNumber (e) {
			let that = this;
			if(e.detail.iv){
				app.phoneLoginState(e.detail).then(function (res) {
					if (res) {
						app.checkPhoneSession().then(function (data) {
							if (that.data.param) {
								that.triggerEvent("getUserInfo", {
									param: that.data.param
								});
							} else {
								that.triggerEvent("getUserInfo");
							}
							wx.hideLoading();
						}).catch(function (err) {
							console.log(err)
						})
					}
					
				}).catch(function (err) {
					console.log(err)
				})
			}
		}
	},
	ready: function () {
		this.changeStatus()
	},
});
