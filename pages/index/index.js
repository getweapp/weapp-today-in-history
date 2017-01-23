//index.js
var app = getApp()
Page({
  data:{
    date:"2017-02-14"
  },
  bindDateChange: function(e) {
    app.globalData.date = e.detail.value
    this.setData({
      date: e.detail.value
    })
  },
  search:function(){
    wx.navigateTo({
      url: '../thatday/thatday?&date=' + this.data.date
    })
  },
  onShareAppMessage: function () {
    return {
      title: '那年今日',
      desc: '我发现一个好玩的小程序-【那年今日】，一起来玩吧',
      path: '/pages/index/index'
    }
  }
})
