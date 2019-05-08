Page({
  data: {
    imgUrls: [
      '/image/b1.jpg',
      '/image/b2.jpg',
      '/image/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },

  onLoad: function(){
    /*
    wx.request({
      url: 'http://localhost:8080/' + 'sql',
      method: 'get',
      
      data: {
        
      },
      success: res => {
        console.log(res.data[1])
      }
    })*/
  }
})