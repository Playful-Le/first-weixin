
/*
    1、页面加载的时候
        1、从缓存中获取购物车数据 渲染到页面
            这些数据 checked=true
        2、微信支付
            1、哪些人 哪些账号  可以实现微信支付
                1、企业账号
                2、企业账号的小程序后台中 必须 给开发者 添加上白名单
                    1、 一个 appid 可以同时绑定多个开发者
                    2、这些开发者就可以公用这个 appid 和 它的开发权限
        3、支付按钮
            1、 先判断缓存中有没有token
            2、没有 跳转到授权页面 进行获取 token
            3、有 token 那就进行 正常操作
*/
// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: [],
    // 购物车
    cart: [],
    // 商品总数量
    totalNum: 0,
    // 商品总价格
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let address = wx.getStorageSync('address')||[]
    let cart = wx.getStorageSync('cart')||[]
    let checkedCart = cart.filter(item=>item.checked)
    let totalNum = 0
    let totalPrice = 0
    checkedCart.forEach(item=>{
      totalNum +=  item.num
      totalPrice += item.num*item.goods_price
    })
    this.setData({
      address,
      cart,
      totalNum,
      totalPrice
    })
  },
  // 点击支付按钮
  handleOrderPay(){
    // 获取用户的token
    let token = wx.getStorageSync('token')
    if(!token){
      // 跳转到授权页面
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
  }
})