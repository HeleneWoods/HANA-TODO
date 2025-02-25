// pages/editPanel/editPanel.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {},
    isChildAim: false,
    multiArray: [['前端', '英语'], ['js', 'html', 'scss', 'vue'], ['原型', '数据类型', 'this']],
    multiIndex: [0, 0, 0],
    parentAim: ''
  },
  handleTypeChange (e: any) {
    const checkStatus = e.detail.value
    this.setData({
      isChildAim: checkStatus,
      isShowParentSelector: checkStatus,
      multiIndex: [0, 0, 0],
      parentAim: ''
    })
  },
  // 保存数据
  handleSave () {
    wx.navigateBack()
  },
  bindMultiPickerChange (e: any) {
    const multiArray = this.data.multiArray
    const multiIndex = e.detail.value
    let parentAimStr = ''

    // 动态构建 parentAimStr
    for (let i = 0; i < multiArray.length; i++) {
      if (multiArray[i] && multiArray[i].length > 0) {
        parentAimStr += multiArray[i][multiIndex[i]]
        // 仅在当前层级不是最后一个有效层级时添加分隔符
        if (i < multiArray.length - 1 && multiArray[i + 1] && multiArray[i + 1].length > 0) {
          parentAimStr += '>'
        }
      }
    }

    this.setData({
      multiIndex: multiIndex,
      parentAim: parentAimStr
    })
  },
  bindMultiPickerColumnChange (e: any) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0: 
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['js', 'html', 'scss', 'vue']
            data.multiArray[2] = ['原型', '数据类型', 'this']
            break;
          case 1:
            data.multiArray[1] = ['语法', '听力', '写作'];
            data.multiArray[2] = ['主谓宾', '定语从句'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['原型', '数据类型', 'this']
                break;
              case 1:
                data.multiArray[2] = ['标签', 'dom元素']
                break;
              case 2:
                data.multiArray[2] = ['选择器', '动画', 'css3']
                break;
              case 3:
                data.multiArray[2] = ['模板语音', '插槽', '变量']
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['主谓宾', '定语从句']
                break;
              case 1:
                data.multiArray[2] = ['慢速', 'CNN']
                break;
              case 2:
                data.multiArray[2] = []
                break;
            }
            break;
        }
      break;
    }
    this.setData(data);
  }
})