//index.js

Page({
  data: {
    navList: [{ id: "gn", text: "国内" }, { id: "gj", text: "国际" }, { id: "cj", text: "财经" }, { id: "yl", text: "娱乐" }, { id: "js", text: "军事" }, { id: "ty", text: "体育" }, { id: "other", text: "其他" }],//wx:for新闻分类
    defaultNewsType:'gn',
    currentNewsType:'',
    firstNewsId:'',
    firstNewsTitle:'',
    firstNewsSource:'',
    firstNewsTime:'',
    firstNewsImage:'',
    newsList: []//将其他新闻的元素放入newsList
  },
  onLoad() {
    this.getNews(this.data.defaultNewsType)
  },
  onPullDownRefresh() {
    console.log("test")
    this.getNews(this.data.currentNewsType,() => {
      wx.stopPullDownRefresh()
    })
  },
  //getNews通过拿到的新闻类别获取新闻清单
  getNews(newsType,callback){
    console.log(newsType)
    let newsUrl = 'https://test-miniprogram.com/api/news/list'
    wx.request({
      url: newsUrl,
      data: {
        type: newsType,
      },
      success: res => {
        let articles = res.data.result
        //如果获得的新闻不是空集
        if (articles && articles != []) {
          let firstNewsId = articles[0].id
          let firstNewsTitle = articles[0].title
          let firstNewsSource = !articles[0].source ? "来源不明" : articles[0].source
          let firstNewsTime = articles[0].date.substring(11, 16)
          let firstNewsImage = !articles[0].firstImage ? "images/default-news.jpg" : articles[0].firstImage

          //newsList为其他新闻的标题、来源、时间、图片的集合，其中来源和图片为空则显示默认值，时间只显示hh:mm.
          let newsList = []
          for (let i = 1; i < articles.length; i += 1) {
            newsList.push({
              id: articles[i].id,
              title: articles[i].title,
              source: !articles[i].source ? "来源不明" : articles[i].source,
              date: articles[i].date.substring(11, 16),
              image: !articles[i].firstImage ? "images/default-news.jpg" : articles[i].firstImage
            })
          }
          this.setData({
            newsList: newsList,
            firstNewsId: firstNewsId,
            firstNewsTitle: firstNewsTitle,
            firstNewsSource: firstNewsSource,
            firstNewsTime: firstNewsTime,
            firstNewsImage: firstNewsImage
          })
        } else {
          wx.showToast({
            title: '请选择新闻类别。',
          })
        }
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  //点击新闻类别调用onTapNewsType
  onTapNewsType(event) {
    console.log(event)
    let newsType = event.currentTarget.dataset.type
    this.setData({
      currentNewsType: newsType
    })
    this.getNews(newsType)
  },
  //点击新闻调用onTapNews() 
  onTapNews(event) {
    let index = !event.currentTarget.id ? this.data.firstNewsId : event.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + index,
    })
  }
})
