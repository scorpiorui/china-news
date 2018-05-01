//index.js

Page({
  data: {
    newsList: [],
    firstnews:[]
  },
  onLoad() {
    this.showNews()
  },
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
        let firstNews = [articles[0].title, (articles[0].source === "") ? "来源不明" : articles[0].source, articles[0].date,(articles[0].firstImage === "") ? "images/default-news.jpg" : articles[0].firstImage]
        let newsList = []
        for (let i = 1; i < articles.length; i += 1) {
          newsList.push({
            title: articles[i].title,
            source: (articles[i].source === "") ? "来源不明" : articles[i].source,
            date:articles[i].date,
            image: (articles[i].firstImage === "") ? "images/default-news.jpg" : articles[i].firstImage
          })
        }
        this.setData({
          newsList: newsList,
          firstNews:firstNews
        })
      }
    })
  }
})
