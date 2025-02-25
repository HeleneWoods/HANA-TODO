// pages/calender/calender.ts
var app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    programTitle: app.globalData.programTitle,
    days: [],
    tasks: [],
    calendarHeight: '',
    dayBlockHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.generateCalendar()
    this.generateRandomTasks()
  },

  generateCalendar() {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    this.setData({ days })
  },

  generateRandomTasks() {
    const multiArray = [['前端', '英语'], ['js', 'html', 'scss', 'vue'], ['原型', '数据类型', 'this']]
    const tasks = this.data.days.map(() => {
      // 随机决定是否显示任务
      if (Math.random() > 0.7) { // 30% chance to show a task
        const detail = multiArray[2][Math.floor(Math.random() * multiArray[2].length)]
        return detail
      }
      return '' // No task for this day
    })
    this.setData({ tasks })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().setData({ selected: 1 })

    const windowInfo = wx.getWindowInfo()
    const query = wx.createSelectorQuery()
    const _this = this
    // 获取组件navigator的高度
    query.select('#navigator').boundingClientRect(function(rect){
      /**
       * rect.height是组件navigator的高度
       * 50px是自定义tab-bar的高度
       * **/
      const calendarHeight = windowInfo.windowHeight - windowInfo.statusBarHeight - rect.height - 50
      const dayBlockHeight = calendarHeight / 5
      
      _this.setData({
        calendarHeight: calendarHeight + 'px',
        dayBlockHeight: dayBlockHeight + 'px'
      })
    }).exec()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})