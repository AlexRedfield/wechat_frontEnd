// pages/pagepublication/pagepublication.js
const app = getApp();
var util = require('../../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: "",
    array: ['保洁清洗', '房屋维修', '电器维修', '健康服务', '上门安装', '便民服务'],
    index: "",
    name: "",
    price: "",
    info: "",
    filePath: "",
    taskImg:"",
    tempFilePaths:"",
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
    var _this = this;
    if (this.data.address.name && this.data.address.phone && this.data.address.detail)
    {
      if (!(this.data.name && this.data.price && this.data.index!=undefined && this.data.info && this.data.tempFilePaths)) {
        
        wx.showModal({
          title: '提示',
          content: '请填写完整信息',
          showCancel: false
        })
      }
      
      else { 
        wx.showModal({
          title: '提示',
          content: '发布服务将花费5以太币，是否确定发布',
          showCancel: true,
          success: function (res) {
            if (res.cancel) {
              //点击取消,默认隐藏弹框
            } else {
              wx.request({
                url: 'http://localhost:8080/' + 'postTask',
                method: 'post',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  name: _this.data.name,
                  worker: app.globalData.openid,
                  customer: app.globalData.openid,
                  flag: 0,
                  date: 0,
                  price: _this.data.price,
                  sort: _this.data.array[_this.data.index],
                  info: _this.data.info,
                  img: _this.data.taskImg,
                  address: "",
                  nickname: _this.data.address.name,
                  phone: _this.data.address.phone,
                  avatar: _this.data.thumb
                },
                success: res => {
                  //console.log(res.data)
                  wx.showToast({
                    title: '成功发布',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                      setTimeout(function () {
                        //要延时执行的代码
                        wx.navigateBack()
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

      }
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
        _this.data.tempFilePaths = res.tempFilePaths
        console.log(_this.data.tempFilePaths[0])
        let img = wx.getFileSystemManager().readFileSync(_this.data.tempFilePaths[0], 'base64');

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