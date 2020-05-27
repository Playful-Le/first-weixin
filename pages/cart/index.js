//使用 es7 中的 async 和 await 方法
import regeneratorRuntime from '../../lib/runtime/runtime'
//进入 封装的 微信小程序 api 模块
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx.js'

// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    // 缓存中的购物车数组
    cart: [],
    // 全选
    allChecked: true,
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || []
    this.setData({
      address
    })
    this.setCart(cart)
  },
  // 点击获取收货地址
  async handleChooseAddress() {
    try {
      // 获取权限状态
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting['scope.userInfo']
      // 判断权限状态
      if (scopeAddress === false) {
        await openSetting()
      }
      // 调用获取收货地址的api
      const res2 = await chooseAddress()
      console.log(res2);

      // 将获取到的收货地址存到本地存储中
      wx.setStorageSync('address', res2)
    } catch (error) {
      console.log(error);
    }
  },
  // 单选框的选中取消事件
  checkedChange(e) {
    // 获取选中商品id
    let goods_id = e.currentTarget.dataset.id
    // 获取购物车数组
    let { cart } = this.data
    // 找到被修改的商品对象
    let index = cart.findIndex(item => item.goods_id === goods_id)
    // 取反
    cart[index].checked = !cart[index].checked
    // 计算数量价格
    this.setCart(cart)
  },
  // 点击全选
  allCheckedChange() {
    // 获取购物车数组和全选变量
    let { cart, allChecked } = this.data
    allChecked = !allChecked
    cart.forEach(item => item.checked = allChecked)
    // 重新计算商品和价格
    this.setCart(cart)
  },
  // 修改商品数量
  async operationGoods(e) {
    // 获取购物车数组
    let { cart } = this.data
    // 获取修改商品的id和加减参数
    let { id, operation } = e.currentTarget.dataset
    // 获取要修改商品的索引
    let index = cart.findIndex(item => item.goods_id === id)
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({ content: "是否删除该商品" })
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    } else {
      cart[index].num += operation
      this.setCart(cart)
    }
  },
  // 点击结算
  async handlePay() {
    let { cart, address } = this.data
    // 判断用户有没有选购商品
    if (cart.length === 0) {
      await showToast({ title: '请先收藏一件商品' })
      return
    }
    // 判断用户是否添加收货地址
    if (!address) {
      await showToast({ title: '请先设置收货地址' })
      return
    }
    // 如果上边都已添加就跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  // 设置购物车状态同时重新计算底部工具栏的数据,全选、总价格、购买数量
  setCart(cart) {
    // 计算全选
    let allChecked = cart.length > 0 ? cart.every(item => item.checked) : false
    // 计算总数量
    let totalNum = 0
    let totalPrice = 0
    cart.forEach(item => {
      if (item.checked) {
        totalNum += item.num
        totalPrice += item.num * item.goods_price
      }
    })
    this.setData({
      cart,
      totalNum,
      totalPrice,
      allChecked
    })
    // 计算完后将购物车数组更新保存到缓存中
    wx.setStorageSync('cart', cart)
  }
})