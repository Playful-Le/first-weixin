// 引入封装的js 请求模块
import { request } from '../../request/index.js'
// 使用 es7 中的 async 和 await 方法
import regeneratorRuntime from '../../lib/runtime/runtime'

import { showToast } from "../../utils/asyncWx.js"
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    // 是否被收藏
    isCollect: false
  },
  goodsInfo: {},
  goods_id: '',

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goods_id = options.goods_id || '',
      this.getGoodsDtrail()
  },
  async getGoodsDtrail() {
    const { data: res } = await request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail", data: { goods_id: this.goods_id } })
    this.goodsInfo = res.message
    let goodsDetail = {
      pics: res.message.pics,
      goods_introduce: res.message.goods_introduce.replace(/\.webp/g, ".jpg"),
      goods_price: res.message.goods_price,
      goods_name: res.message.goods_name
    }
    let collect = wx.getStorageSync('cpllect') || []
    let isCollect = collect.some((item) => {
      item.goods_id === this.goodsInfo.goods_id
    })
    this.setData({
      goodsDetail,
      isCollect
    })
  },
  // 预览大图
  handlePreviewImage(e) {
    let url = e.currentTarget.dataset.url
    let urls = this.data.goodsDetail.pics.map((item) => {
      return item.pics_mid
    })
    console.log(urls)
    wx.previewImage({
      current: url, //当前显示图片的http链接
      urls: urls //需要预览的图片http链接列表
    })
  },
  // 收藏
  hanleCollect() {
    let isCollect = false
    let collect = wx.getStorageSync('collect') || []
    let index = collect.findIndex(item => item.goods_id === this.goodsInfo.goods_id)
    if (index != -1){
      collect.splice(index,1)
      showToast({
        title: "取消收藏成功",
        mask: true
      })
    }else{
      collect.push(this.goodsInfo)
      isCollect = true
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  },
  // 添加购物车
  handleCartAdd() {
    // 1.获取缓存中的购物车数组
    // 2.判断对象是否存在缓存中
    // 3.如果存在就num++,不存在就新增
    // 4.把购物车重新添加会缓存中
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex((item) => {
      return item.goods_id === this.goodsInfo.goods_id
    })
    if (index != -1) {
      cart[index].num++
    } else {
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
    }
    wx.setStorageSync('cart', cart)
    showToast({
      title: '添加成功'
    })
  },
  // 购买
  nowPay() {
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex((item) => {
      return item.goods_id === this.goodsInfo.goods_id
    })
    if (index === -1) {
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
      wx.setStorageSync('cart', cart)
    }
    wx.switchTab({
      url: '/pages/cart/index',
    })
  }
})