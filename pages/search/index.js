import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
import {showToast} from '../../utils/asyncWx.js'
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索返回的数组
    searchGoods:[],
    // 控制输入框中的按钮显示隐藏
    isFocus: false,
    // 输入框的值
    inputValue: ''
  },
  timeId: 1,
  handleInput(e){
    let value = e.detail.value
    if(!value.trim()){
      showToast({title:"请不要输入无效空格"})
      value = ''
      return
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.timeId)
    this.timeId = setTimeout(()=>{
      this.search(value)
    },1000)
  },
  async search(value){
    let res = await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',data:{query:value}})
    this.setData({
      searchGoods: res.data.message
    })
  },
  handelCancel(){
    this.setData({
      searchGoods: [],
      inputValue: '',
      isFocus: false
    })
  }
})