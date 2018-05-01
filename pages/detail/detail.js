// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailTitle: "外媒称香港回归15年打破“经济将死”预言",
    detailSource: "中国新闻网",
    detailTime: "09:34",
    detailReadCount: "阅读 471",
    detailText: ["报道特别强调金融合作方面，中央支持第三方利用香港办理人民币贸易投资结算，进一步丰富香港人民币离岸产品”。自1997年7月1日回归之后，香港与内地的经济关系日益紧密，“北京方面迫切希望利用这个全球金融中心来进行重大改革试验，比如将人民币国际化的努力。","一些香港居民在接受美国CNN采访时表达了对香港特区以及新任特首的看法。多数香港居民认为，回归以来，“一国两制”实行得不错，相信“一国两制”将进展良好，相信香港的前途会更光明。希望新任特首上台后，能进一步改善包括住房在内的民生条件。"],
    detailImage: "http://img1.gtimg.com/news/pics/hv1/38/85/1076/69988613.jpg",
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
        let result = res.data.result
        let detailTitle = result.title
        let detailSource = (result.source === "") ? "来源不明" : result.source
        let detailTime = result.date.substring(11,16)
        let detailReadCount = "阅读 "+result.readCount
        let detailText = result.content
        let detailImage = result.firstImage
        this.setData({
          detailTitle: detailTitle,
          detailSource: detailSource,
          detailTime: detailTime,
          detailReadCount: detailReadCount,
          detailText: detailText,
          detailImage: detailImage,
        })
      }
    })
  }
})