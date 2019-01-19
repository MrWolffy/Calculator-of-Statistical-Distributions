// pages/normaldist/normaldist.js


function normDist(x) {
  return Math.exp(-x*x/2) / Math.sqrt(2 * Math.PI)
}

function calNormCdf(x) {
  let ans = 0, h = 0.001, a = -100 + Math.abs(x - Math.floor(x)), b = x
  for (let i = a; i < b; i = i + h) {
    ans = ans + 14 * normDist(i) + 32 * normDist(i + h / 4) + 12 * normDist(i + h / 2) + 32 * normDist(i + h / 4 * 3)
  }
  ans = ans - 7 * normDist(a) + 7 * normDist(b)
  return ans * h / 90
}

function calInvNormCdf(p) {
  let eps = 1e-10, ans = 0
  let tmp = calNormCdf(ans) - p
  while (Math.abs(tmp) > eps) {
    ans = ans - tmp / normDist(ans)
    tmp = calNormCdf(ans) - p
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

  submitCalNormCdf(e) {
    console.log(e.detail.value)
    this.setData({
      p: calNormCdf(Number(e.detail.value.x)),
      getp: true,
    })
  },

  submitCalInvNormCdf(e) {
    console.log(e.detail.value)
    this.setData({
      x: calInvNormCdf(Number(e.detail.value.p)),
      getx: true,
    })
  }
})