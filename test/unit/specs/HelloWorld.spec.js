import Vue from 'vue'
import Notification from '@/views/announcement/Notification'

describe('Notification.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Notification)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.aaa').textContent)
      .toEqual('1')
  })
})
