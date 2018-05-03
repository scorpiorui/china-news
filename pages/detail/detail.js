// pages/detail/detail.js
var app = getApp()

Page({

  data: {
    detailTitle: "",//新闻标题
    detailSource: "",//新闻来源
    detailTime: "",//新闻时间
    detailReadCount: "",//新闻阅读数
    nowReadCount:1,//计数 问题在于只能增加一次，可能要通过缓存解决
    detailContent: [],//新闻内容
  },
  onLoad: function (options) {
    console.log(this.data.nowReadCount)
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
        let detailSource = !result.source ? "来源不明" : result.source
        let detailTime = result.date.substring(11,16)
        let detailReadCount = "阅读 "+(result.readCount + this.data.nowReadCount)
        let detailContent = result.content

        this.setData({
          detailTitle: detailTitle,
          detailSource: detailSource,
          detailTime: detailTime,
          detailReadCount: detailReadCount,
          detailContent: detailContent,
          nowReadCount:this.data.nowReadCount+1
        })
      }
    })
  },
  //返回首页
  returnIndex(){
    wx.navigateBack({
      delta: 1
    })
  }
})