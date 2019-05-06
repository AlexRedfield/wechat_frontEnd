Page({
  data: {
    detail: [],
    curIndex: 0,
    isScroll: true,
    currentTab: 0,
    alreadyOrder: [{ name: "隔壁老王", state: "交易成功", time: "2018-09-30 14:00", status: "竹五215", url: "http://img.zcool.cn/community/01ca005b02587ba801218cf4fe698a.gif", money: "132" }, { name: "跃动体育运动俱乐部(圆明园店)", state: "交易成功", time: "2018-10-12 18:00-20:00", status: "未开始", url: "http://img.zcool.cn/community/01ca005b02587ba801218cf4fe698a.gif", money: "205" }]

  },
  //动态计算高度
  onLoad: function (options) {
    var that = this;
    /**
     * 获取系统信息
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