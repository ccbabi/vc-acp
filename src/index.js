import mask, { mapMask } from 'vc-mask'
import acp from './acp.vue'
import './acp.less'

let Acp, instance, body, member

const def = {
  mask: true,
  maskClassName: ''
}

const acpDefault = {
  className: '',
  title: '提示',
  message: ' ',
  value: '',
  placeholder: '',
  showInput: false,
  cancelButtonText: '取消',
  confirmButtonText: '确定',
  showCancelButton: false,
  showConfirmButton: true,
  zIndex: 10001
}

const maskDefault = {
  enabledClickClose: false,
  enabledEscClose: false
}

const acpQueue = []

function merge (target) {
  let i, j, source, prop, value
  for (i = 1, j = arguments.length; i < j; i++) {
    source = arguments[i]
    for (prop in source) {
      if (source.hasOwnProperty(prop)) {
        value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}

function $alert (message, callback, title) {
  return $acp({ message, title }, callback)
}

function $confirm (message, callback, title) {
  return $acp({ message, title, showCancelButton: true }, callback)
}

function $prompt (message, callback, title, value, placeholder) {
  return $acp({
    message,
    title,
    value,
    placeholder,
    showInput: true,
    showCancelButton: true
  }, callback)
}

function $acp (callOption, callback) {
  const option = merge({}, def, acpDefault, maskDefault, Acp.useOption, callOption)
  const instance = getInstance()

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      acpQueue.push({ option, callback, resolve, reject })
      instance.__show()
    })
  }

  acpQueue.push({ option })
  instance.__show()
}

function __show () {
  let maskOption, option, value

  if (this.show) return false

  member = acpQueue.shift()
  option = member.option

  body.appendChild(this.$mount().$el)

  this.__setData(option)
  this.show = true

  if (option.showInput) {
    this.$nextTick(() => {
      this.$refs.input.focus()
    })
  }
  if (!option.mask) return false

  maskOption = {}

  Object.keys(maskDefault).forEach(prop => {
    value = option[prop]
    if (typeof value !== 'undefined') {
      maskOption[prop] = value
    }
  })

  if (option.maskClassName) {
    maskOption.className = option.maskClassName
  }

  if (option.zIndex) {
    maskOption.zIndex = option.zIndex - 1
  }

  return maskOption
}

function wrapCallback (action) {
  let value

  if (member.option.showInput) {
    value = instance.value
  }

  if (member.callback) {
    return member.callback(action ? value : undefined)
  }

  action ? member.resolve(value) : member.reject()
}

function __action (b) {
  if (this.callback(b) !== false) {
    this.__close()
  }
}

function __setData (option) {
  Object.keys(acpDefault).forEach(prop => {
    instance[prop] = option[prop]
  })
}

function __afterLeave () {
  if (acpQueue.length) {
    instance.__show()
    return false
  }
  instance = null
  return true
}

function __close () {
  this.show = false
}

function initAcp (Vue) {
  const Acp = Vue.extend(acp)
  const maskOne = mapMask(maskDefault)

  Object.assign(Acp.prototype, {
    __show: maskOne.mapMaskOpen(__show),
    __close: maskOne.mapMaskClose(__close),
    __setData,
    __action,
    __afterLeave
  })

  return Acp
}

function getInstance () {
  instance = instance || new Acp()
  instance.callback = wrapCallback
  return instance
}

function init (Vue, useOption) {
  Acp = initAcp(Vue)
  Acp.useOption = useOption

  return { $acp, $alert, $confirm, $prompt }
}

function install (Vue, useOption) {
  const acp = init(Vue, useOption)

  body = document.body ||
    document.querySelector('body') ||
    document.getElementsByTagName('body')[0]

  Object.keys(acp).forEach(key => {
    Vue[key] = Vue.prototype[key] = acp[key]
  })

  Vue.use(mask)
}

export default { install }
