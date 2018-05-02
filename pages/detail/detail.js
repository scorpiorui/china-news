// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailTitle: "",
    detailSource: "",
    detailTime: "",
    detailReadCount: "",
    detailContent: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.showNewsDetail(options)
  },
  showNewsDetail(options){
    let detailUrl ="https://test-miniprogram.com/api/news/detail"
    wx.request({
      url:detailUrl,
      data:{
        id:options.id
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        let detailTitle = result.title
        let detailSource = (result.source === "") ? "来源不明" : result.source
        let detailTime = result.date.substring(11,16)
        let detailReadCount = "阅读 "+result.readCount
        let detailContent = result.content

        this.setData({
          detailTitle: detailTitle,
          detailSource: detailSource,
          detailTime: detailTime,
          detailReadCount: detailReadCount,
          detailContent: detailContent
        })
      }
    })
  }
})