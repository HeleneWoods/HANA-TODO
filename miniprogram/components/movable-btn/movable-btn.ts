Component({
  options: {
    multipleSlots: true
  },
  properties: {
    movableHeight: {
      type: Number,
      value: 0,
      observer (newVal) {
        this.setData({
          y: newVal - 100
        })
      }
    }
  },
  data: {
    x: 0,
    y: 0,
    btnActive: false,
    editPic: '/assets/pictures/edit.png',
    editActivePic: '/assets/pictures/edit-active.png',
  },
  lifetimes: {
    created () {
    },
    attached () {
      const windowInfo = wx.getWindowInfo()
      const x = windowInfo.windowWidth - 80
      this.setData({
        x
      })  
    }
  },
  ready () {
  },
  methods: {
    clickBtn () {
      this.setData({
        btnActive: true
      })
      const _this = this
      setTimeout(function () {
        _this.setData({
          btnActive: false
        })
      }, 100)
      this.triggerEvent('showEditPanel')
    }
  }
})