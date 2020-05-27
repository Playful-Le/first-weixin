// js网络请求模块
import { request } from "../../request/index.js"
// 使用async和await方法
import regeneratorRuntime from '../../lib/runtime/runtime'

// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goods_list: []
  },
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pageSize: 10
  },
  // 总页数
  totalPages: '',

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log
    this.queryParams.cid = options.cid || '';
    this.queryParams.query = options.query || '';
    this.getGoodsList()
  },
  async getGoodsList() {
    const { data: res } = await request(
      {
        url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
        data: this.queryParams
      })
    let total = res.message.totalPages
    this.totalPages = Math.ceil(total / this.queryParams.pageSize)
    this.setData({
      goods_list: [...this.data.goods_list, ...res.message.goods]
    })
  },
  handletabsItemChange(e) {
    const index = e.detail.index
    let { tabs } = this.data
    tabs.forEach((item) => {
      return item.id === index ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs
    })
  },
  // 下拉触底加载下一页
  onReachBottom() {
    if (this.totalPages === this.queryParams.pagenum || this.pagenum > this.totalPages) {
      wx.showToast({
        title: "没有下一页数据了"
      })
    } else {
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 重置列表数组
    this.setData({
      goods_list: []
    })
    // 重置页码值
    this.queryParams.pagenum = 1
    this.getGoodsList()
    wx.stopPullDownRefresh()
  }
})