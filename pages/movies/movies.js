// pages/movies/movies.js
const DOUBAN_URL = "http://api.douban.com/v2/movie/in_theaters"
let APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieListArr : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters',
      header: {
        'Content-Type': "application/json"
      },
      success: (data) => {
        //console.log(data.data.subjects)
        APP.data.movieDetails = data.data.subjects
        //赋值电影列表
        this.setData({
          movieListArr: data.data.subjects
        })
      }
    })
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
  
  }
})