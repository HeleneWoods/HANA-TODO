Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    formData: {
      type: Object,
      value: {}
    }
  },
  data: {
  },
  methods: {
    // 保存表单数据
    handleSave () {
      this.triggerEvent('saveFormData')
    }
  }
})