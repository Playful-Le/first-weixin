import request from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

import {login,showToast} from "../../utils/asyncWx.js"
// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async bindGetUserInfo(e){
    console.log(e)
    let {encrypteData,rawData,iv,signature} = e.detail
    const {code} = await login()
    let loginParams = {encrypteData,rawData,iv,signature,code}
    // 发送请求，获取token
    // let token = await request({url:'/users/wxlogin',data:loginParams,method:'POST'})
    showToast({title:'获取token失败，无法实现支付功能'})
    ssetTimeOut(()=>{
      wx.navigateBack({
        delta: 1
      })
    },1500)
  }
})