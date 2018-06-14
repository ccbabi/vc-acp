## vc-acp
Implement non-blocking alert, confirm, prompt components via vue

## Install
```sh
$ npm install --save vc-acp
```

## Usage
```javascript
import Vue from 'vue'
import acp from 'vc-acp'
import 'vc-mask/dist/css/vc-mask.css'
import 'vc-acp/dist/css/vc-acp.css'

Vue.use(acp)

// Vue property
Vue.$alert('你好').then(() => {
  // do something
})

// Vue Instance property
Vue.$confirm('你好').then(() => {
  // confirm do something
}).catch(() => {
  // cancel do something
})
```

The $alert, $confirm, and $prompt methods are registered with the Vue class properties and instance properties

## API
### Grammer
- vm.$alert(\<message>, [callback], [title]) : Promise
- vm.$confirm(\<message>, [callback], [title]) : Promise
- vm.$prompt(\<message>, [callback], [title], [value], [placeholder]) : Promise
- vm.$acp(\<option>, [callback]): Promise

**Note that if the callback is passed, the then or catch method will never be executed**

### Option
- className: The top-level class name for acp components, default ''
- title: Elastic layer title, default '提示'
- message: The prompt message default ' '
- value: The value of the input when $prompt is called, default ''
- placeholder: The prompt value of the input when $prompt is called default ''
- showInput: Whether the input element is displayed, default false
- cancelButtonText: Cancel button copy default '取消'
- confirmButtonText: Determine the copy of the button default '确定'
- showCancelButton: Whether to display the cancel button default false
- showConfirmButton: Whether the confirmation button is displayed, default true
- zIndex: The zIndex value of the top div, default 10001
- mask: Does the mask overlay appear, default true
- maskClassName: The top div class name for the mask default ''
- enabledClickClose: Is the mask layer clickable, default false
- enabledEscClose: Can the mask layer be closed by pressing Esc, default false

## License
MIT
