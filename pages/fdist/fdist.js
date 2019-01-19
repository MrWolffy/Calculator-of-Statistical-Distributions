// pages/fdist/fdist.js

function gamma(df) {
  if (df == 1) return 1
  else if (df == 0.5) return Math.sqrt(Math.PI)
  else return (df - 1) * gamma(df - 1)
}

function beta(df1, df2) {
  return gamma(df1) * gamma(df2) / gamma(df1 + df2)
}

function FDist(x, df1, df2) {
  if (x <= 0) return 0
  return Math.pow(df1 / df2, df1 / 2) / beta(df1 / 2, df2 / 2) * Math.pow(x, df1 / 2 - 1) * Math.pow(1 + df1 / df2 * x, -(df1 + df2) / 2)
}

function calFCdf(x, df1, df2) {
  let ans = 0, h = 0.001, a = -1 + Math.abs(x - Math.floor(x)), b = x
  for (let i = a; i < b; i = i + h) {
    ans = ans + 14 * FDist(i, df1, df2) + 32 * FDist(i + h / 4, df1, df2) + 12 * FDist(i + h / 2, df1, df2) + 32 * FDist(i + h / 4 * 3, df1, df2)
    // console.log(FDist(i, df1, df2))
  }
  ans = ans - 7 * FDist(a, df1, df2) + 7 * FDist(b, df1, df2)
  return ans * h / 90
}

function calInvFCdf(p, df1, df2) {
  let left = 1, right = 10, ans, eps = 0.01
  while (Math.abs(right - left) > eps) {
    ans = (left + right) / 2
    if (calFCdf(ans, df1, df2) < p) {
      left = ans
    }
    else {
      right = ans
    }
  }
  eps = 1e-6
  let tmp = calFCdf(ans, df1, df2) - p
  while (Math.abs(tmp) > eps) {
    ans = ans - tmp / FDist(ans, df1, df2)
    tmp = calFCdf(ans, df1, df2) - p
  }
  return ans
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    p: 0,
    getp: false,
    x: 0,
    getx: false
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
      path: '/pages/index'
    }
  },

  submitCalFCdf(e) {
    console.log(e.detail.value)
    this.setData({
      p: calFCdf(Number(e.detail.value.x), Number(e.detail.value.df1), Number(e.detail.value.df2)),
      getp: true,
    })
  },

  submitCalInvFCdf(e) {
    console.log(e.detail.value)
    this.setData({
      x: calInvFCdf(Number(e.detail.value.p), Number(e.detail.value.df1), Number(e.detail.value.df2)),
      getx: true,
    })
  }
})