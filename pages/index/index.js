//index.js

Page({
  //如果第一条新闻可以用nth-child进行布局则将相关函数和数据合并。
  data: {
    navList: [{ id: "gn", text: "国内" }, { id: "gj", text: "国际" }, { id: "cj", text: "财经" }, { id: "yl", text: "娱乐" }, { id: "js", text: "军事" }, { id: "ty", text: "体育" }, { id: "other", text: "其他" }],//wx:for新闻分类
    firstNews:[],//将第一则新闻的元素放入firstnews
    newsList: []//将其他新闻的元素放入newsList
  },
  onLoad() {
    this.showNews()
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  //showNews根据点击的新闻类别动态显示新闻，默认为国内新闻。
  showNews(event) {
    let newsType = event ? event.currentTarget.id :"gn"//default news:gn
    let newsUrl = 'https://test-miniprogram.com/api/news/list'
    wx.request({
      url: newsUrl,
      data:{
        type:newsType,
      },
      success: res => {
        let articles = res.data.result
        //firstNews为第一则新闻的标题、来源、时间、图片的集合，其中来源和图片为空则显示默认值，时间只显示hh:mm.
        let firstNews = [articles[0].id,articles[0].title, (articles[0].source === "") ? "来源不明" : articles[0].source, articles[0].date.substring(11, 16),(articles[0].firstImage === "") ? "images/default-news.jpg" : articles[0].firstImage]
        //newsList为其他新闻的标题、来源、时间、图片的集合，其中来源和图片为空则显示默认值，时间只显示hh:mm.
        let newsList = []
        for (let i = 1; i < articles.length; i += 1) {
          newsList.push({
            id: articles[i].id,
            title: articles[i].title,
            source: (articles[i].source === "") ? "来源不明" : articles[i].source,
            date:articles[i].date.substring(11,16),
            image: (articles[i].firstImage === "") ? "images/default-news.jpg" : articles[i].firstImage
          })
        }
        this.setData({
          newsList: newsList,
          firstNews:firstNews
        })
      }
    })
  },
  //点击第一条新闻调用onTapFirstNews() 
  onTapFirstNews() {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + this.data.firstNews[0],
    })
  },
  //点击其他新闻调用onTapNewsList(event)
  onTapNewsList(event) {
    console.log(event)
    let index = event.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + index,
    })
  },
})
