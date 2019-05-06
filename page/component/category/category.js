Page({
    data: {
      category: [
          {name:'果味',id:'guowei'},
          {name:'蔬菜',id:'shucai'},
          {name:'炒货',id:'chaohuo'},
          {name:'点心',id:'dianxin'},
          {name:'粗茶',id:'cucha'},
          {name:'淡饭',id:'danfan'}
      ],
      user:"隔壁老王",
      detail:[],
      curIndex: 0,
      isScroll: true,
      toView: 'guowei',
      currentTab:0,
      taskImg:"http://img.zcool.cn/community/01ca005b02587ba801218cf4fe698a.gif"
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
    onReady(){
        var self = this;
        wx.request({
            url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
            success(res){
                console.log(res.data)
                console.log(res.data[0])
                self.setData({
                    //detail : res.data.result
                  detail: res.data
                })
            }
        });
        
    },
    switchTab(e){
        this.setData({
            toView : e.target.dataset.id,
            curIndex : e.target.dataset.index
        })
      //console.log(e.target.dataset.index)
    },
  scrollMove: function (e) {
    //获取滚动距离
    var left = e.detail.scrollTop;
    console.log(left)
    //将滚动距离（位移）动态添给滚动条的left
    this.setData({
      viewleft: left
    })
    if(left>500&&left<928) {
      this.setData({
        curIndex: 1
      })
    }
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