// page/component/new-pages/user/user.js
const app = getApp()

Page({
  data:{
    thumb:'',
    nickname:'',
    hasAddress:false,
    address:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    balance:""
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

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var appid = 'wxa89285a741cd0adc'
          var secret = '22739dcb3c40affc1ce039e0649f4fa8'
          var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
          wx.request({
            url: l,
            data: {},
            method: 'GET',
            success: function (res) {
              wx.request({
                url: 'http://localhost:8080/' + 'balance',
                method: 'post',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  user: res.data.openid,
                },
                success: res => {
                  console.log(res.data)
                  self.setData({
                    balance: res.data
                  })
                }
              })
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },

  onPullDownRefresh() {
    // 上拉刷新
    if (!this.loading) {
      this.onLoad()
      wx.stopPullDownRefresh()
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



})

module.exports =Page