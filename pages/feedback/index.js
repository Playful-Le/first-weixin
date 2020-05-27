import {showToast} from '../../utils/asyncWx.js'
// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value: '体验问题',
        isActive: true
      },
      {
        id:1,
        value: '商家、商品投诉',
        isActive: false
      }
    ]
  },
  handleTabsItemChange(e){
    let index = e.detail.index
    let {tabs} = this.data
    tabs.forEach(item=>item.id === index ? item.isActive = true : item.isActive = false)
    this.setData({
      tabs
    })
  },
  handleTap() {
    showToast({title:'抱歉，暂时有bug'})
  }
})