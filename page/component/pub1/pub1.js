// pages/pagepublication/pagepublication.js
const app = getApp();
var util = require('../../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: "",  //选择的日期
    setTime: "",    //选择的时间
    startDate: "",   //最早日期
    lastDate: "",    //最迟日期
    imgSrc: "",
    array: ['保洁清洗', '房屋维修', '家电维修', '数码维修', '健康服务', '上门安装', '便民服务'],
    index: "",
    name: "",
    price: "",
    info: "",
    filePath:"",
    address: {
      name: '',
      phone: '',
      detail: ''
    },
    thumb:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    console.log("上面那个时间戳可以转换为：" + util.TimeStampConvertTime(timestamp));
    //显示日期时间
    var TIME = util.formatTime(new Date());
    var hmTIME = TIME.substring(10, 16); //只显示小时分钟
    console.log("当前时间：" + hmTIME);
    var ymdTIME = TIME.substring(0, 10);//显示日期

    console.log("当前日期：" + util.getDateStr("", 1));

    this.setData({
      startDate: util.getDateStr("", 1),
      lastDate: util.getDateStr("", 15) //只能订购两周内的服务
    });
    var stamp1 = new Date(util.getDateStr("", 0) + ' ' + hmTIME + ":00").getTime();
    console.log("转换为时间戳：" + stamp1 / 1000);

    var self = this;

    wx.getStorage({
      key: 'address',
      success: function (res) {
        self.setData({
          address: res.data,
          thumb: app.globalData.userInfo.avatarUrl
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 用户点击右上角发布服务
   */

  postTask: function () {
    if (this.data.address.name && this.data.address.phone && this.data.address.detail) {
      wx.request({
        url: 'http://localhost:8080/' + 'postTask',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          name: this.data.name,
          worker: app.globalData.openid,
          customer: app.globalData.openid,
          flag: 1,
          price: this.data.price,
          sort: this.data.array[this.data.index],
          date: util.timeConvertTimeStamp(this.data.startTime, this.data.setTime),
          info: this.data.info,
          img:"",
          nickname:this.data.address.name,
          phone: this.data.address.phone,
          address: this.data.address.detail,
          avatar: this.data.thumb
        },
        success: res => {
          //console.log(res.data)
        }
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请在个人资料页面填写完整资料',
        showCancel: false
      })
    }
    //console.log(app.globalData.openid);
  },

  /**
  * 设置服务类型
  */
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  /**
  * 设置开始时间
  */
  setStartTime: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },


  bindTimeChange: function (e) {
    this.setData({
      setTime: e.detail.value
    })
  },

  

  nameHandler(e) {
    this.setData({
      name: e.detail.value
    });
  },

  priceHandler(e) {
    this.setData({
      price: e.detail.value
    });
  },

  infoHandler(e) {
    this.setData({
      info: e.detail.value
    });
  },
})