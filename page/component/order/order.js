Page({
  data: {
    detail: [],
    curIndex: 0,
    isScroll: true,
    currentTab: 0,
    alreadyOrder: [{ name: "小明", state: "交易成功", time: "2019-05-25 14:00", address: "竹五215", url: "../../../img/1557148766871_730.png", money: "40" }, { name: "小明", state: "交易成功", time: "2019-05-27 18:00", address: "竹五215", url: "../../../img/1557323672997_227.png", money: "30" }]

  },
  //动态计算高度
  onLoad: function (options) {
    var that = this;
    /**
     * 获取系统信息
     * 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  onReady() {

  },

  call1: function (e) {
    var phonenum = e.currentTarget.dataset.item
    console.log(phonenum)

    /*
    wx: wx.makePhoneCall({
      phoneNumber: phonenum,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })*/
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