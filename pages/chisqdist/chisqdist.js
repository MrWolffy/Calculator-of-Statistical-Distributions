// pages/chisqdist/chisqdist.js

function gamma(df) {
  if (df == 1) return 1
  else if (df == 0.5) return Math.sqrt(Math.PI)
  else return (df - 1) * gamma(df - 1)
}

function chiDist(x, df) {
  if (x <= 0) return 0
  return Math.pow(x, df / 2 - 1) * Math.exp(-x / 2) / Math.pow(2, df / 2) / gamma(df / 2)
}

function calChiCdf(x, df) {
  let ans = 0, h = 0.001, a = -1 + Math.abs(x - Math.floor(x)), b = x
  for (let i = a; i < b; i = i + h) {
    ans = ans + 14 * chiDist(i, df) + 32 * chiDist(i + h / 4, df) + 12 * chiDist(i + h / 2, df) + 32 * chiDist(i + h / 4 * 3, df)
  }
  ans = ans - 7 * chiDist(a, df) + 7 * chiDist(b, df)
  return ans * h / 90
}

function calInvChiCdf(p, df) {
  let left = -0, right = 100, ans, eps = 0.01
  let t1 = new Date()
  while (Math.abs(right - left) > eps) {
    let t2 = new Date()
    if (t2.getTime() - t1.getTime() > 5000) return {
      ans: ans,
      error: true,
    }
    ans = (left + right) / 2
    if (calChiCdf(ans, df) < p) {
      left = ans
    }
    else {
      right = ans
    }
  }
  eps = 1e-6
  let tmp = calChiCdf(ans, df) - p
  while (Math.abs(tmp) > eps) {
    let t2 = new Date()
    if (t2.getTime() - t1.getTime() > 5000) return {
      ans: ans,
      error: true,
    }
    ans = ans - tmp / chiDist(ans, df)
    tmp = calChiCdf(ans, df) - p
  }
  return {
    ans: ans,
    error: false,
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    p: 0,
    getp: false,
    situationp: false,
    loadingp: false,
    x: 0,
    getx: false,
    situationx: false,
    loadingx: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    return {
      title: '统计分布计算器',
      path: '/pages/index/index'
    }
  },

  submitCalChiCdf(e) {
    console.log(e.detail.value)
    this.setData({
      loadingp: true,
    })
    this.setData({
      p: calChiCdf(Number(e.detail.value.x), Number(e.detail.value.df)),
      getp: true,
    })
    this.setData({
      loadingp: false,
    })
  },

  submitCalInvChiCdf(e) {
    console.log(e.detail.value)
    this.setData({
      loadingx: true,
    })
    let ans = calInvChiCdf(Number(e.detail.value.p), Number(e.detail.value.df))
    this.setData({
      x: ans.ans,
      getx: true,
      situationx: ans.error,
    })
    this.setData({
      loadingx: false,
    })
  }
})