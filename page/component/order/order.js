const app = getApp();
var util = require('../../../util/util.js');
Page({
  data: {
    detail: [],
    curIndex: 0,
    isScroll: true,
    currentTab: 0,
    alreadyOrder: [{ name: "小明", state: "交易成功", time: "2019-05-25 14:00", address: "竹五215", url: "../../../img/1557148766871_730.png", money: "40" }, { name: "小明", state: "交易成功", time: "2019-05-27 18:00", address: "竹五215", url: "../../../img/1557323672997_227.png", money: "30" }],
    pendtoServe:[],
    pendtoPay:[],
    finishOrder:[],
    openid:"",
  },
  //动态计算高度
  onLoad: function (options) {
    var self = this;
    /**
     * 获取系统信息
     * 
     */
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

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
                url: 'http://localhost:8080/' + 'order1',
                method: 'post',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  user: res.data.openid,
                  status: 1
                },
                success: res => {
                  console.log(res.data)
                  self.setData({
                    pendtoServe: res.data
                  })
                  //self.data.pendtoServe[i].date = temp.replace('/', '-').replace('/', '-').substring(0, 16)
                }
              }),
                wx.request({
                  url: 'http://localhost:8080/' + 'order1',
                  method: 'post',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    user: res.data.openid,
                    status: 2
                  },
                  success: res => {
                    console.log(res.data)
                    self.setData({
                      pendtoPay: res.data
                    })
                  }
                }),
                wx.request({
                  url: 'http://localhost:8080/' + 'order1',
                  method: 'post',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    user: res.data.openid,
                    status: 3
                  },
                  success: res => {
                    console.log(res.data)
                    self.setData({
                      finishOrder: res.data
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
  onReady() {

  },
  onPullDownRefresh() {
    // 上拉刷新
    if (!this.loading) {
      this.onLoad()
      wx.stopPullDownRefresh()
    }
  },
  cancel: function (e) {
    var self = this;
    let index = e.currentTarget.dataset.item
    console.log(index)
    wx.showModal({
      title: '提示',
      content: '是否确认取消订单',
      showCancel: true,
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          wx.request({
            url: 'http://localhost:8080/' + 'cancel',
            method: 'post',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              user: app.globalData.openid,
              whatever: index,
            },
            success: res => {
              //console.log(res.data)
              wx.showToast({
                title: '该订单已成功取消',
                icon: 'success',
                duration: 2000,
                success: function () {
                  setTimeout(function () {
                    //返回上一页
                    self.onLoad()
                  }, 1200) //延迟时间
                }
              })
            }
          })
          console.log("成功预约")
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  pay: function (e) {
    var self = this;
    let index = e.currentTarget.dataset.item
    console.log(index)
    wx.request({
      url: 'http://localhost:8080/' + 'pay',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user: app.globalData.openid,
        whatever: index,
      },
      success: res => {
        //console.log(res.data)
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              //刷新本页
              self.onLoad()
            }, 1200) //延迟时间
          }
        })
      }
    })
  },

  deleteS: function (e) {
    var self = this;
    let index = e.currentTarget.dataset.item
    console.log(index)
    wx.showModal({
      title: '提示',
      content: '是否确认删除订单',
      showCancel: true,
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          wx.request({
            url: 'http://localhost:8080/' + 'delete',
            method: 'post',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              whatever: index,
            },
            success: res => {
              wx.showToast({
                title: '该订单已删除',
                icon: 'success',
                duration: 2000,
                success: function () {
                  setTimeout(function () {
                    //返回上一页
                    self.onLoad()
                  }, 1200) //延迟时间
                }
              })
            }
          })
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  }
})