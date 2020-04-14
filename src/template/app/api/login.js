/*
 * @Descripttion: 登录接口
 * @version: 1.0.0
 * @Author: wzs
 * @Date: 2020-04-02 23:09:18
 * @LastEditors: wzs
 * @LastEditTime: 2020-04-07 10:32:03
 */
import instance from './base'
let token = wx.getStorageSync("token")
export const getMyInfo = () => {
    return instance.get('/user')
}

export const doLogin = ({
    code,
    nickname,
    avatarUrl
}) => {
    return instance.post('/login', {
        code,
        nickname,
        avatarUrl
    })
}

export const doPhoneLogin = ({
    code,
    iv,
    encryptedData
}) => {
    return instance.post('/login/index', {
        code,
        iv,
        encryptedData
    })
}

export const doInspectorLogin = ({
    username,
    password
}) => {
    return instance.post('/login/inspector', {
        username,
        password
    })
}