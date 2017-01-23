//person.js
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data:{
    userInfo:{
      avatarUrl: "http://vinceok.com/demos/express/assets/logo.jpg",
      nickName: "--",
      gender: "--",
      country: "--",
      city: "--",
      province: "--"
    }
  },
  onLoad: function () {
    var self = this
    // 微信登陆  
    wx.login({
      success: function(res) {
        if (res.code) {
          // 登陆成功后获取用户信息
          wx.getUserInfo({
            success: function(res) {
              // 更新全局用户信息
              self.setData({
                userInfo:{
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName,
                  gender: util.formatGender(res.userInfo.gender),
                  country: util.formatCountry(res.userInfo.country),
                  city: res.userInfo.city,
                  province: res.userInfo.province
                }
              })
            },
            fail:function(res){
              console.log("getUserInfo-fail"+res.errMsg)
            }
          })
        } else{
          console.log("wx.login-success-else"+res.errMsg)
        }
      },
      fail:function(res){
        console.log("wx.login-fail"+res.errMsg)
      }
    })
  }
})
