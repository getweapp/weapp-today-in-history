// pages/thatday/detail/detail.js
var app = getApp()
Page({
  data:{
    title:'',
    content:'',
    pic:'',
    hasPic:true,
    hasContent:true
  },
  onLoad:function(options){
    var self = this
    // 查询详情
    wx.request({
      url: 'https://api.getweapp.com/vendor/vinceok/queryDetail',
      data: {
        key:app.globalData.key,
        e_id:options.id
      },
      method: 'GET',
      success: function(res){
        var response = res.data;
        if(response.error_code === 0){
          var data = response.result[0]
          wx.setNavigationBarTitle({
            title: data.title
          })
          if(data.picNo == 0){
            self.setData({
              hasPic:false
            })
          }
          var conStr = data.content
          self.setData({
            title:data.title,
            content:data.content,
            pic:data.picUrl[0]
          })
        } else{
          self.setData({
            hasContent:false
          })
          console.log(response.reason+",错误码："+response.error_code)
        }
      },
      fail: function() {
        // fail
        self.setData({
            hasContent:false
          })
        console.log("查询详情失败，请重试")
      }
    })
  },
  // 如果没有详情或查询详情出错，显示返回上层按钮
  backToList:function(){
    wx.navigateBack(1)
  }
})