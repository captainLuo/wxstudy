// pages/detail/detail.js
let datas = require('../../datas/list_data.js')
let app = getApp()
// console.log(app)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index
    //获取参数值
    this.setData({
      detailObj: datas.list_data[index],
      index
    })
    let detailStorage = wx.getStorageSync('isCollected')
    if(detailStorage[index]){
      this.setData({
        isCollected: true
      })
    }

    //第一次进入设置为空
    if (!detailStorage){
      wx.setStorageSync('isCollected', {})
    }

    //监听音乐播放
    let backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.onPlay((event)=>{
      this.setData({
        isMusicPlay: true
      })
      app.data.isMusicPlay = true
      app.data.index = index
    })
    //监听音乐停止
    backgroundAudioManager.onPause((event) => {
      this.setData({
        isMusicPlay: false
      })
      app.data.isMusicPlay = false
    })

    if (app.data.isMusicPlay == true && app.data.index === index){
      this.setData({
        isMusicPlay:true
      })
    }
  },

  handleCollection(){
    let isCollected = !this.data.isCollected
    this.setData({
      isCollected
    })
    //提示用户
    let title = isCollected?"收藏成功":"取消收藏"
    wx.showToast({
      title,
      icon:'success'
    })
    //获取缓存
    //不可行，会覆盖之前的状态
    //let obj = {}
    wx.getStorage({
      key: 'isCollected',
      success: (datas) => {
        let obj = datas.data
        let index = this.data.index
        //缓存到本地
        obj[index] = isCollected
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: (data) => {
            console.log("缓存成功")
          }
        })
      },
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
  
  },
  //控制音乐播放控制
  handleMusicPlay(){
    //控制音乐播发按钮
    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay: isMusicPlay
    })

    //音乐播放控制
    let dataUrl = this.data.detailObj.music.dataUrl
    let title = this.data.detailObj.music.title
    if (isMusicPlay) {
      wx.playBackgroundAudio({
        dataUrl,
        title,
      })
    }else{
      wx.stopBackgroundAudio()
    }
  },
  //处理点击分享功能
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈',
        '分享到qq空间',
        '分享到微博'
      ],
    })
  }
})