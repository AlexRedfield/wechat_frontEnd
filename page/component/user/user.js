// page/component/new-pages/user/user.js
const app = getApp()

Page({
  data:{
    thumb:'',
    nickname:'',
    hasAddress:false,
    address:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad(){
    var self = this;
    if (app.globalData.userInfo) {
      this.setData({
        //userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        thumb: app.globalData.userInfo.avatarUrl,
        nickname: app.globalData.userInfo.nickName
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          self.setData({
            thumb: res.userInfo.avatarUrl,
            nickname: res.userInfo.nickName
          })
        }
      })
    }


  },
  onShow(){
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  }
})