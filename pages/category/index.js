import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightMenuList: [],
    currentIndex: 0,
    scroolTop: 0
  },
  cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cates = wx.getStorageSync('cates')
    if(!cates){
      this.getCates()
    }else{
      if(Date.now()-cates.time>1000*10){
        this.getCates()
      }else{
        console.log(a)
      }
      this.cates = cates.data
      let leftMenuList = this.cates.map((item)=>{
        return item.cat_name
      })
      let rightMenuList = this.cates[0].children;
      this.setData({
        leftMenuList,
        rightMenuList
      })
    }
  },
  getCates(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"}).then((res)=>{
      this.cates = res.data.message;
      wx.setStorageSync('cates', {time:Date.now(),data:this.cates})
      let leftMenuList = this.cates.map((item)=>{
        return item.cat_name
      })
      let rightMenuList = this.cates[0].children;
      this.setData({
        leftMenuList,
        rightMenuList
      })
    })
  },
  handleItemTap(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index,
      rightMenuList: this.cates[index].children,
      scroolTop: 0
    })
  }
})