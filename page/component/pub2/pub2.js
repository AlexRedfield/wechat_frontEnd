// pages/pagepublication/pagepublication.js
const app = getApp();
var util = require('../../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: "",
    array: ['保洁清洗', '房屋维修', '家电维修', '数码维修', '健康服务', '上门安装', '便民服务'],
    index: "",
    name: "",
    price: "",
    info: "",
    filePath: "",
    taskImg:"",
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
    /**
     * 获取用户信息
     */
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

  postService: function () {
    if (this.data.address.name && this.data.address.phone && this.data.address.detail)
    {
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
          flag: 0,
          date: 0,
          price: this.data.price,
          sort: this.data.array[this.data.index],
          info: this.data.info,
          img: this.data.taskImg,
          address: "",
          nickname: this.data.address.name,
          phone: this.data.address.phone,
          avatar: this.data.thumb
        },
        success: res => {
          //console.log(res.data)
        }
      })
    }
    else{
        wx.showModal({
          title: '提示',
          content: '请在个人资料页面填写完整资料',
          showCancel: false
    })
    }
    //console.log(app.globalData.openid);
  },

  //选择文件
  chooseImage: function () {

    var _this = this;
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        _this.setData({
          imgSrc: res.tempFilePaths
        })
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        let img =wx.getFileSystemManager().readFileSync(tempFilePaths[0], 'base64');

        wx.request({
          url: 'http://localhost:8080/' + 'upload',
          method: 'post',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            imgData: img,
          },
          success: res => {
            console.log(res.data)
            _this.data.taskImg=res.data
          }
        })

        /*
        wx.uploadFile({
          url: 'http://localhost:8080/' + 'upload',
          filePath: tempFilePaths[0],
          name: 'uploadFile',
          header: { 'Content-Type': "multipart/form-data" },

          success: res => {
            var data = JSON.parse(res.data)
            console.log('上传成功')
            console.log(data)
          }
        })*/
      },
    })
  },

  /**
  * 设置服务类型
  */
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
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