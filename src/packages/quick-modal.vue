<script>
export default {
  name: 'QuickModal',
  data: () => ({
    buttons: [],
    title: null,
    width: 800,
    closable: true,
    keyboard: true,
    maskClosable: true,
    mask: true,
    visible: false,
    wrapClassName: '',
    component: null,
    afterClose: null,
    destroy: null,
    buttonLoadingKeys: [],
    buttonDisabledKeys: [],
    getContainer: () => document.body,
    callback: null
  }),
  methods: {
    onClose() {
      this.visible = false
      this.afterClose && this.afterClose()
      const timer = setTimeout(() => {
        this.buttons = []
        this.buttonDisabledKeys = []
        this.buttonDisabledKeys = []
        this.loading = false
        this.wrapClassName = ''
        this.title = null
        this.component = null
        this.destroy && this.destroy()
        clearTimeout(timer)
      }, 400)
    },
    async onButtonClicked(button) {
      if (!button.callback) return
      if (typeof button.callback === 'string') {
        if (!this.$refs.vNodeComponent) return
        this.$refs.vNodeComponent[button.callback](button.params)
        return
      }
      if (button.confirm) {
        window.antd.Modal.confirm({
          content: `是否确认${button.text}?`,
          cancelText: '再想一想',
          okText: button.text,
          onCancel: () => button.cancel && button.cancel(),
          onOk: () => button.callback && button.callback()
        })
        return
      }
      button.callback && button.callback()
    }
  },
  render(h) {
    let {
      visible,
      maskClosable,
      wrapClassName,
      buttonLoadingKeys,
      buttonDisabledKeys,
      buttons,
      loading,
      title,
      width,
      closable,
      keyboard,
      callback,
      component,
      getContainer,
      onButtonClicked,
      onClose,
      mask
    } = this

    return h(
      'a-modal',
      {
        props: {
          title,
          width,
          visible,
          closable,
          keyboard,
          mask,
          wrapClassName,
          maskClosable,
          getContainer,
          destroyOnClose: true,
          footer:
            buttons && buttons.length > 0
              ? buttons.map(button =>
                  h(
                    'a-button',
                    {
                      key: button.name,
                      props: {
                        type: button.type || 'primary',
                        icon: button.icon,
                        loading: loading || button.loading || buttonLoadingKeys.includes(button.name),
                        disabled: button.disabled || buttonDisabledKeys.includes(button.name)
                      },
                      on: { click: () => onButtonClicked(button) }
                    },
                    button.text
                  )
                )
              : null
        },
        on: {
          afterClose: onClose,
          cancel: onClose
        }
      },
      component && [
        typeof component === 'function'
          ? component(h, this)
          : component instanceof Object
          ? h(component, {
              ref: 'vNodeComponent',
              on: {
                callback: () => callback && callback(this),
                'update:loading': v => (this.loading = v),
                'update:buttons': v => (this.buttons = v),
                'update:visible': v => {
                  this.visible = v
                  onClose()
                },
                'update:title': v => (this.title = v),
                'update:disabled-keys': v => (this.buttonDisabledKeys = v),
                'update:loading-keys': v => (this.buttonLoadingKeys = v)
              }
            })
          : component
      ]
    )
  }
}
</script>
