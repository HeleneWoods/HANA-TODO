// pages/calender/calender.ts
var app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    programTitle: app.globalData.programTitle,
    days: [] as (number | null)[], // 使用 null 表示空白方块
    tasks: [] as string[],
    calendarHeight: '',
    dayBlockHeight: '',
    currentMonth: new Date(),
    showMonth: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      currentMonth: new Date()
    })
    this.updateMonthDisplay()
    this.generateCalendar()
    this.generateRandomTasks()
  },

  updateMonthDisplay() {
    const month = this.data.currentMonth.getMonth() + 1
    const year = this.data.currentMonth.getFullYear()
    this.setData({
      showMonth: `${year}年${month}月`
    })
  },

  generateCalendar() {
    const firstDayOfMonth = new Date(this.data.currentMonth.getFullYear(), this.data.currentMonth.getMonth(), 1).getDay()
    const daysInMonth = new Date(this.data.currentMonth.getFullYear(), this.data.currentMonth.getMonth() + 1, 0).getDate()
    
    // Calculate the number of empty days at the start
    const emptyDaysStart: (number | null)[] = Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }, () => null)
    
    // Generate the days of the month
    const monthDays: number[] = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    
    // Calculate the number of empty days at the end to fill the last week
    const totalDays = emptyDaysStart.length + monthDays.length
    const emptyDaysEnd: (number | null)[] = Array.from({ length: (7 - (totalDays % 7)) % 7 }, () => null)
    
    // Concatenate all parts to form the complete days array
    const days: (number | null)[] = emptyDaysStart.concat(monthDays, emptyDaysEnd)
    this.setData({ days })
  },

  generateRandomTasks() {
    const multiArray = [['前端', '英语'], ['js', 'html', 'scss', 'vue'], ['原型', '数据类型', 'this']]
    const tasks: string[] = this.data.days.map(day => {
      if (day === null) return '' // 空白方块不显示任务
      if (Math.random() > 0.7) { // 30% chance to show a task
        const detail = multiArray[2][Math.floor(Math.random() * multiArray[2].length)]
        return detail
      }
      return '' // No task for this day
    })
    this.setData({ tasks })
  },

  getPrevMonth() {
    const currentMonth = this.data.currentMonth
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    this.setData({ currentMonth: prevMonth }, () => {
      this.updateMonthDisplay()
      this.generateCalendar()
      this.generateRandomTasks()
    })
  },

  getNextMonth() {
    const currentMonth = this.data.currentMonth
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    this.setData({ currentMonth: nextMonth }, () => {
      this.updateMonthDisplay()
      this.generateCalendar()
      this.generateRandomTasks()
    })
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
       * 40px是时间组件的高度
       * 20px是星期组件的高度
       * 50px是自定义tab-bar的高度
       * **/
      const calendarHeight = windowInfo.windowHeight - windowInfo.statusBarHeight - rect.height - 50 - 40 - 20
      const dayBlockHeight = calendarHeight / 6.5
      
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