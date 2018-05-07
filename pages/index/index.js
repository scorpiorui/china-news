//index.js

Page({
  data: {
    navList: [
      { id: "gn", text: "国内" }, 
      { id: "gj", text: "国际" }, 
      { id: "cj", text: "财经" },
      { id: "yl", text: "娱乐" },
      { id: "js", text: "军事" },
      { id: "ty", text: "体育" },
      { id: "other", text: "其他" }
    ],//wx:for新闻分类
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
  //点击新闻类别调用onTapNewsType
  onTapNewsType(event) {
    console.log(event)
    let newsType = event.currentTarget.id
    this.setData({
      currentNewsType: newsType
    })
    this.getNews(newsType)
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
          //取出数据到NewsList，为新闻的标题、来源、时间、图片的集合，其中来源和图片为空则显示默认值，时间只显示hh:mm.
          let newsList = []
          for (let i = 0; i < articles.length; i += 1) {
            newsList.push({
              id: articles[i].id,
              title: articles[i].title,
              source: !articles[i].source ? "来源不明" : articles[i].source,
              date: articles[i].date.substring(11, 16),
              image: !articles[i].firstImage ? "images/default-news.jpg" : articles[i].firstImage
            })
          }
          console.log(newsList)
          //取出NewsList里的第一个元素，并删除
          let firstNewsId = newsList[0].id
          let firstNewsTitle = newsList[0].title
          let firstNewsSource = newsList[0].source
          let firstNewsTime = newsList[0].date
          let firstNewsImage = newsList[0].image
          newsList.splice(0, 1)
          //赋值同步data
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
            title: '选择的新闻不存在或者网络出现问题',
          })
        }
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  //点击新闻调用onTapNews() 
  onTapNews(event) {
    let index = !event.currentTarget.id ? this.data.firstNewsId : event.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + index,
    })
  }
})
