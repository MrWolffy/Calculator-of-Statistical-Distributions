// pages/tdist/tdist.js

function gamma(df) {
  if (df == 1) return 1
  else if (df == 0.5) return Math.sqrt(Math.PI)
  else return (df - 1) * gamma(df - 1)
}

function tDist(x, df) {
  return gamma((df + 1) / 2) / (Math.sqrt(df * Math.PI) * gamma(df / 2)) * Math.pow(1 + x * x / df, -(df + 1) / 2)
}

function calTCdf(x, df) {
  let ans = 0, h = 0.001, a = -50 + Math.abs(x - Math.floor(x)), b = x
  for (let i = a; i < b; i = i + h) {
    ans = ans + 14 * tDist(i, df) + 32 * tDist(i + h / 4, df) + 12 * tDist(i + h / 2, df) + 32 * tDist(i + h / 4 * 3, df)
  }
  ans = ans - 7 * tDist(a, df) + 7 * tDist(b, df)
  return ans * h / 90
}

function calInvTCdf(p, df) {
  let left = -10, right = 10, ans, eps = 0.01
  while (Math.abs(right - left) > eps) {
    ans = (left + right) / 2
    if (calTCdf(ans, df) < p) {
      left = ans
    }
    else {
      right = ans
    }
  }
  eps = 1e-6
  let tmp = calTCdf(ans, df) - p
  while (Math.abs(tmp) > eps) {
    ans = ans - tmp / tDist(ans, df)
    tmp = calTCdf(ans, df) - p
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
    loadingp: false,
    x: 0,
    getx: false,
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

  submitCalTCdf(e) {
    console.log(e.detail.value)
    this.setData({
      loadingp: true,
    })
    this.setData({
      p: calTCdf(Number(e.detail.value.x), Number(e.detail.value.df)),
      getp: true,
    })
    this.setData({
      loadingp: false,
    })
  },

  submitCalInvTCdf(e) {
    console.log(e.detail.value)
    this.setData({
      loadingx: true,
    })
    this.setData({
      x: calInvTCdf(Number(e.detail.value.p), Number(e.detail.value.df)),
      getx: true,
    })
    this.setData({
      loadingx: false,
    })
  }
})