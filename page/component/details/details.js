// page/component/details/details.js
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
  }
 
})