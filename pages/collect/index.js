// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectGoods:[],
    tabs:[
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌数量',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false
      }
    ]
  }, 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let collectGoods = wx.getStorageSync('collect')
    this.setData({
      collectGoods
    })
  },
  handleTabsItemChange(e){
    let index = e.detail.index
    let {tabs} = this.data
    tabs.forEach(item=>item.id===index ? item.isActive = true : item.isActive = false)
    this.setData({
      tabs
    })
  }
})