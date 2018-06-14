import Vue from 'vue'
import mount from 'vm-mount'
import demo from './demo'
import acp from '../../src'

import 'vc-mask/dist/css/vc-mask.css'
import '../../src/acp.less'

Vue.use(acp)

const app = new Vue({
  render: h => h(demo)
})

app.$mount(mount())
