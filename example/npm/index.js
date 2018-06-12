import Vue from 'vue'
import mount from 'vm-mount'
import demo from './demo'
import acp from '../../src'

Vue.use(acp)

const app = new Vue({
  render: h => h(demo)
})

app.$mount(mount())
