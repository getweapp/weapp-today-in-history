// pages/thatday/thatday.js
var app = getApp()
Page({
  data:{
    month:'2',
    day:'14',
    data:[]
  },
  onLoad:function(options){
    wx.showNavigationBarLoading()
    var date = options.date
    var month = parseInt(date.substring(5,7))
    var day = parseInt(date.substring(8,10))
    wx.setNavigationBarTitle({
      title: month+'月'+day+'日'
    })
    this.setData({
      month:month,
      day:day
    })
    var self = this
    wx.request({
      url: 'https://api.getweapp.com/vendor/vinceok/queryEvent',
      data: {
        key:app.globalData.key,
        date:this.data.month+'/'+this.data.day
      },
      method: 'GET',
      success: function(res){
        var response = res.data;
        if(response.error_code === 0){
          var data = response.result
          self.setData({
            data:data
          })
        } else{
          console.log(response.reason+",错误码："+response.error_code)
        }
      },
      fail: function() {
        // fail
        console.log("查询失败，请重试")
      },
      complete:function(){
        wx.hideNavigationBarLoading()
      }
    })
  },
  detail:function(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../thatday/detail/detail?id='+id
    })
  },
  onShareAppMessage: function () {
    var month = this.data.month
    var day = this.data.day
    return {
      title: '那年今日',
      desc: month+'月'+day+"日,竟然发生了这么多事情，赶紧来看看",
      path: '/pages/thatday/thatday?date='+app.globalData.date
    }
  }
})