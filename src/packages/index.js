import Vue from 'vue'
import QuickModal from './quick-modal'

const QuickModalConstructor = Vue.extend(QuickModal)
let modalCount = 0
export default (options = {}) => {
  const instance = new QuickModalConstructor({
    data: {
      ...options,
      wrapClassName: `quick-modal__${++modalCount}`,
      modalCount,
      destroy() {
        document.querySelector(`.quick-modal__${modalCount}`).parentElement.parentElement.remove()
        --modalCount
      }
    }
  })
  instance.$mount()

  Vue.nextTick(() => {
    if (instance.visible) return
    instance.visible = true
  })

  return instance
}
