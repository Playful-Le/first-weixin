// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindGetUserInfo(e){
    // 获取用户信息
    let {userInfo} = e.detail
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      delta: 1
    })
  }
})