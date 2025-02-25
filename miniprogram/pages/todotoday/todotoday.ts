// pages/todotoday/todotoday.ts
var app = getApp<IAppOption>()
import {getDate} from '../../utils/util'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    programTitle: app.globalData.programTitle,
    currentDate: new Date(),
    showDate: '',
    todoListHeight: '',
    movableHeight: 0,
    x: 0,
    y: 0,
    todoList: [{
      uid: 1,
      context: '1',
      status: 0,
      type: 'red',
      parentAim: ''
    },{
      uid: 2,
      context: '2',
      status: 1,
      type: 'green',
      parentAim: ''
    },{
      uid: 3,
      context: '3',
      status: 0,
      type: 'yellow',
      parentAim: ''
    },{
      uid: 4,
      context: '4',
      status: 0,
      type: 'blue',
      parentAim: ''
    },{
      uid: 5,
      context: '5',
      status: 0,
      type: 'purple',
      parentAim: ''
    },{
      uid: 6,
      context: '6',
      status: 0,
      type: 'white',
      parentAim: ''
    },{
      uid: 7,
      context: '7',
      status: 0,
      type: 'pink',
      parentAim: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
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
    this.getTabBar().setData({selected: 0})
    // 计算todo-list的高度
    const windowInfo = wx.getWindowInfo()
    const query = wx.createSelectorQuery()
    const _this = this
    this.setData({
      x: windowInfo.windowWidth - 80,
      y: windowInfo.windowHeight - 300
    })
    // 获取组件navigator的高度
    query.select('#navigator').boundingClientRect(function(rect){
      /**
       * rect.height是组件的高度
       * 40px是时间组件的高度
       * 50px是自定义tab-bar的高度
       * **/
      const todoListHeight = windowInfo.windowHeight - windowInfo.statusBarHeight - rect.height - 40 - 50
      _this.setData({
        todoListHeight: todoListHeight + 'px',
        movableHeight: todoListHeight
      })
    }).exec()
    

    // 获取今天的日期
    const today = new Date()
    this.setData({
      currentDate: today,
      showDate: getDate(today)
    })
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

  // 获取当前显示日期的前一天
  getPrevDate () {
    const curTimeStamp = this.data.currentDate.getTime()
    const prevDate = new Date(curTimeStamp - 24 * 60 * 60 * 1000)
    this.setData({
      currentDate: prevDate,
      showDate: getDate(prevDate)
    })
  },
  // 获取当前显示日期的后一天
  getNextDate () {
    const curTimeStamp = this.data.currentDate.getTime()
    const prevDate = new Date(curTimeStamp + 24 * 60 * 60 * 1000)
    this.setData({
      currentDate: prevDate,
      showDate: getDate(prevDate)
    })
  },
  // 跳转到新增/编辑页
  jumptToEditPanel () {
    wx.navigateTo({url: '/pages/editPanel/editPanel'})
  }
})