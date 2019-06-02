// page/component/details/details.js
const app = getApp();
var util = require('../../../util/util.js');
Page({
  data:{
    goods: {
      id: 1,
      image: '1557233475945_288.png',
      title: '新鲜梨花带雨',
      price: 0.01,
      user: '李小二',
      detail: '这里是梨花带雨详情。',
      parameter: '125g/个',
      service: '不支持退货',
      avatar:''
    },
    startTime:"",
    startDate: "",   //最早日期
    lastDate: "",    //最迟日期
    setTime: "",    //选择的时间
    address:"",   //用户保存的地址
    userAddress:"",
    nickname:"",
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },

  onLoad: function (options) {
    //console.log(options.avatar)
      this.setData({
        'goods.image':options.img,
        'goods.user': options.user,
        'goods.avatar': options.avatar,
        'goods.detail': options.info,
        'goods.title': options.title,
        'goods.price': options.price,
        'goods.index':options.index,
      })
    
    var self=this;
    wx.getStorage({
      key: 'address',
      success: function (res) {
        self.setData({
          address: res.data.detail,
          nickname:res.data.name
        })
      }
    })
    this.setData({
      startDate: util.getDateStr("", 1),
      lastDate: util.getDateStr("", 15) //只能订购两周内的服务
    });
  },

  order(){
    //console.log(app.globalData.openid)
    //console.log(this.data.goods.index)
    var _this=this;
    if (!(this.data.startTime && this.data.setTime)) {
      wx.showModal({
        title: '提示',
        content: '请填写服务时间',
        showCancel: false
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '本次预约将消耗5以太币，是否确定预约',
        showCancel: true,
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            wx.request({
              url: 'http://localhost:8080/' + 'order',
              method: 'post',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                customer: app.globalData.openid,
                date: util.timeConvertTimeStamp(_this.data.startTime, _this.data.setTime),
                //nickname: _this.data.address.name,
                address: _this.data.address,
                flag:0, //flag=0代表消费者预约
                index: _this.data.goods.index,
              },
              success: res => {
                //console.log(res.data)
                wx.showToast({
                  title: '成功预约',
                  icon: 'success',
                  duration: 2000,
                  success: function () {
                    setTimeout(function () {

                      //返回上一页
                      wx.navigateBack()
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
    }
  },

  call(){
    wx: wx.makePhoneCall({
      phoneNumber: "18223255014",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
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

  addressHandler: function (e) {
    this.setData({
      userAddress: e.detail.value
    })
  },
 
})