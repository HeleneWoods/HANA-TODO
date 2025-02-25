Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      "pagePath": "/pages/todotoday/todotoday",
      "iconPath": "/assets/pictures/todoList.png",
      "selectedIconPath": "/assets/pictures/todoList-selected.png",
      "text": "今日计划"
    },
    {
      "pagePath": "/pages/calender/calender",
      "iconPath": "/assets/pictures/calender.png",
      "selectedIconPath": "/assets/pictures/calender-selected.png",
      "text": "日历"
    },
    {
      "pagePath": "/pages/progress/progress",
      "iconPath": "/assets/pictures/progress.png",
      "selectedIconPath": "/assets/pictures/progress-selected.png",
      "text": "目标"
    },
    {
      "pagePath": "/pages/mine/mine",
      "iconPath": "/assets/pictures/mine.png",
      "selectedIconPath": "/assets/pictures/mine-selected.png",
      "text": "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e:any) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})