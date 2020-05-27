// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: [],
    // 收藏商品的数量
    collectNum: 0
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    // 获取缓存中的用户信息
    let userInfo = wx.getStorageSync('userInfo')
    // 获取缓存中的收藏商品数组
    let collect = wx.getStorageSync('collect')
    this.setData({
      userInfo,
      collectNum: collect.length
    })
  },
  handleLogin(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  commonToast() {
    showToast({title:'该功能还么实现'})
  }
})