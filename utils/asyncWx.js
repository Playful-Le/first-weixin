// 弹窗轻提示
export function showToast({title,icon="none"}){
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title ,
      icon: icon,
      mask:true,
      duration: 1500,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

export function getSetting(){
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    })
  })
}

export function chooseAddress(){
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    })
  })
}

export function openSetting(){
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    })
  })
}
// 弹窗提示是否删除
export function showModal({content}){
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: "提示",
      content: content,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    })
  })
}

// 获取登录凭证（code
export function login() {
  return new Promise((resolve,reject)=>{
      wx.login({
          timeout:10000,
          success: (result) => {
              resolve(result)
          },
          fail: (err) => {
              reject(err)
          },
      });
  });
}