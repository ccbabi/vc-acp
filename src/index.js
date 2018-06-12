import acp from './acp'

let Acp, instance, body, member

const def = {
  mask: true
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
  showConfirmButton: true
}

const maskDefault = {}

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
  if (this.show) return

  member = acpQueue.shift()

  body.appendChild(this.$mount().$el)

  this.__setData(member.option)
  this.show = true
}

function wrapCallback (action) {
  let value

  if (member.option.showInput) {
    value = instance.value
  }

  if (member.callback) {
    return member.callback(action, value)
  }

  action ? member.resolve(value) : member.reject()
}

function __action (b) {
  if (this.callback(b) !== false) {
    this.show = false
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

function initAcp (Vue) {
  const Acp = Vue.extend(acp)
  Object.assign(Acp.prototype, { __show, __setData, __action, __afterLeave })
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

  return { $alert, $confirm, $prompt }
}

function install (Vue, useOption) {
  const acp = init(Vue, useOption)

  body = document.body ||
    document.querySelector('body') ||
    document.getElementsByTagName('body')[0]

  Object.keys(acp).forEach(key => {
    Vue[key] = Vue.prototype[key] = acp[key]
  })
}

export default { install }
