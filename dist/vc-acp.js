(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['vc-acp'] = factory());
}(this, (function () { 'use strict';

  var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  //
  //
  //
  //
  //
  //

  var script = {
    name: 'vc-mask',
    props: {
      className: {
        type: String,
        default: ''
      },
      zIndex: {
        type: Number,
        default: 1000
      }
    },
    data: function data() {
      return {
        show: false
      };
    },

    methods: {
      touchmove: function touchmove(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      afterLeave: function afterLeave(el) {
        el.parentNode.removeChild(el);
        this.__afterLeave && this.__afterLeave();
        this.$destroy();
      }
    }
  };

  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: "vc-mask" }, on: { "after-leave": _vm.afterLeave } }, [_c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.show,
        expression: "show"
      }],
      staticClass: "vc-mask",
      class: _vm.className,
      style: { zIndex: _vm.zIndex },
      on: { touchmove: _vm.touchmove }
    })]);
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

  var __vue_template__ = typeof __vue_render__ !== 'undefined' ? { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ } : {};
  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    {
      component.__file = "/Users/wangjie/repositories/vc-mask/src/mask.vue";
    }

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  var mask = __vue_normalize__(__vue_template__, __vue_inject_styles__, typeof __vue_script__ === 'undefined' ? {} : __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, typeof __vue_create_injector__ !== 'undefined' ? __vue_create_injector__ : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  };

  var Mask = void 0,
      instance = void 0,
      body = void 0;
  var hasSetEscEvent = false;
  var hasSetClickEvent = false;

  var def = {
    className: '',
    zIndex: 1000,
    enabledClickClose: true,
    enabledEscClose: false
  };

  var depStack = [];
  var linkDescribe = {};

  function clickHandle(e) {
    var pid = depStack[depStack.length - 1];
    if (!pid) return;

    var link = linkDescribe[pid];

    if (link && link.close && link.instance) {
      if (e && link.option.enabledClickClose || link.option.enabledEscClose) {
        link.close.apply(link.instance);
      }
    }
  }

  function escHandle(e) {
    if (e.keyCode === 27) clickHandle(0);
  }

  function __initEl(option) {
    var el = this.$mount().$el;
    if (!hasSetClickEvent && option.enabledClickClose) {
      el.addEventListener('click', clickHandle, false);
      hasSetClickEvent = true;
    }
    body.appendChild(el);
  }

  function esc() {
    if (!hasSetEscEvent) {
      window.addEventListener('keydown', escHandle, false);
      hasSetEscEvent = true;
    }
  }

  function __setData(option) {
    var _this = this;

    ['className', 'zIndex'].forEach(function (prop) {
      _this[prop] = option[prop];
    });
  }

  function __open(option) {
    this.__initEl(option);
    this.__setData(option);
    this.show = true;
  }

  function close() {
    var pid = depStack[depStack.length - 1];

    if (pid) {
      this.__setData(linkDescribe[pid].option);
    }

    if (depStack.length) return;

    this.show = false;
  }

  function __afterLeave() {
    if (hasSetClickEvent) {
      instance.$el.removeEventListener('click', clickHandle, false);
      hasSetClickEvent = false;
    }

    if (hasSetEscEvent) {
      window.removeEventListener('keydown', escHandle, false);
      hasSetEscEvent = false;
    }

    instance = null;
  }

  function initMask(Vue) {
    var Clazz = Vue.extend(mask);
    Object.assign(Clazz.prototype, { __open: __open, __initEl: __initEl, __setData: __setData, close: close, __afterLeave: __afterLeave });
    return Clazz;
  }

  function install(Vue, useOption) {
    Mask = initMask(Vue);
    Mask.useOption = useOption;
    body = document.body || document.querySelector('body') || document.getElementsByTagName('body')[0];
  }

  function getInstance() {
    instance = instance || new Mask();
    return instance;
  }

  function randomId() {
    return Math.random().toString(36).slice(2);
  }

  function loop() {}

  function mapMask(option) {
    var pid = randomId();

    linkDescribe[pid] = {};
    option = option || {};

    if (option.enabledEscClose) esc();

    function mapMaskOpen(open) {
      var index = void 0,
          ret = void 0,
          callOption = void 0,
          retOption = void 0;
      open = open || loop;

      return function () {
        ret = open.apply(this, arguments);

        if (ret === false) return;
        if (ret && (typeof ret === 'undefined' ? 'undefined' : _typeof(ret)) === 'object') {
          retOption = ret;
        }

        callOption = _extends({}, def, Mask.useOption, option, retOption);
        linkDescribe[pid].option = callOption;
        linkDescribe[pid].instance = this;
        index = depStack.indexOf(pid);

        if (!~index) {
          depStack.push(pid);
        } else {
          if (depStack.length > 1) {
            depStack.push(depStack.splice(index, 1)[0]);
          }
        }

        getInstance().__open(callOption);
      };
    }

    function mapMaskClose(close) {
      var popPid = void 0,
          ret = void 0,
          index = void 0;
      close = close || loop;

      var newClose = function newClose() {
        ret = close.apply(this, arguments);
        if (ret === false || !depStack.length) return ret;

        popPid = depStack[depStack.length - 1];
        index = depStack.indexOf(pid);

        if (~index) depStack.splice(index, 1);

        if (popPid === pid) instance.close();

        return ret;
      };

      linkDescribe[pid].close = newClose;

      return newClose;
    }

    return { mapMaskOpen: mapMaskOpen, mapMaskClose: mapMaskClose };
  }

  var index = { install: install };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$1 = {
    name: 'vc-acp',
    props: {
      className: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '提示'
      },
      message: {
        type: String,
        default: ' '
      },
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      showInput: {
        type: Boolean,
        default: false
      },
      cancelButtonText: {
        type: String,
        default: '取消'
      },
      confirmButtonText: {
        type: String,
        default: '确定'
      },
      showCancelButton: {
        type: Boolean,
        default: false
      },
      showConfirmButton: {
        type: Boolean,
        default: true
      },
      callback: {
        type: Function,
        default: function _default() {}
      },
      zIndex: {
        type: Number,
        default: 10001
      }
    },
    data: function data() {
      return {
        show: false
      };
    },

    methods: {
      afterLeave: function afterLeave(el) {
        var shouldDestroy = this.__afterLeave();
        if (shouldDestroy) {
          el.parentNode.removeChild(el);
          this.$destroy();
        }
      }
    }
  };

  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: "vc-acp" }, on: { "after-leave": _vm.afterLeave } }, [_c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.show,
        expression: "show"
      }],
      staticClass: "vc-acp",
      class: _vm.className,
      style: { zIndex: _vm.zIndex }
    }, [_vm.title ? _c("div", { staticClass: "vc-acp-header" }, [_c("div", { staticClass: "vc-acp-title" }, [_vm._v(_vm._s(_vm.title))])]) : _vm._e(), _vm._v(" "), _vm.message ? _c("div", { staticClass: "vc-acp-body" }, [_c("div", {
      staticClass: "vc-acp-message",
      domProps: { innerHTML: _vm._s(_vm.message) }
    }), _vm._v(" "), _vm.showInput ? _c("div", { staticClass: "vc-acp-prompt" }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.value,
        expression: "value"
      }],
      ref: "input",
      staticClass: "vc-acp-input",
      attrs: { placeholder: _vm.placeholder },
      domProps: { value: _vm.value },
      on: {
        input: function input($event) {
          if ($event.target.composing) {
            return;
          }
          _vm.value = $event.target.value;
        }
      }
    })]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c("div", { staticClass: "vc-acp-footer" }, [_vm.showCancelButton ? _c("a", {
      staticClass: "vc-acp-btn vc-acp-cancel",
      attrs: { href: "javascript:;" },
      on: {
        click: function click($event) {
          _vm.__action(false);
        }
      }
    }, [_vm._v(" " + _vm._s(_vm.cancelButtonText))]) : _vm._e(), _vm._v(" "), _vm.showConfirmButton ? _c("a", {
      staticClass: "vc-acp-btn vc-acp-confirm",
      attrs: { href: "javascript:;" },
      on: {
        click: function click($event) {
          _vm.__action(true);
        }
      }
    }, [_vm._v(" " + _vm._s(_vm.confirmButtonText))]) : _vm._e()])])]);
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

  var __vue_template__$1 = typeof __vue_render__$1 !== 'undefined' ? { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 } : {};
  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    {
      component.__file = "/Users/wangjie/repositories/vc-acp/src/acp.vue";
    }

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */
  function __vue_create_injector__$1() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  var acp = __vue_normalize__$1(__vue_template__$1, __vue_inject_styles__$1, typeof __vue_script__$1 === 'undefined' ? {} : __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, typeof __vue_create_injector__$1 !== 'undefined' ? __vue_create_injector__$1 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

  var Acp = void 0,
      instance$1 = void 0,
      body$1 = void 0,
      member = void 0;

  var def$1 = {
    mask: true,
    maskClassName: ''
  };

  var acpDefault = {
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
  };

  var maskDefault = {
    enabledClickClose: false,
    enabledEscClose: false
  };

  var acpQueue = [];

  function merge(target) {
    var i = void 0,
        j = void 0,
        source = void 0,
        prop = void 0,
        value = void 0;
    for (i = 1, j = arguments.length; i < j; i++) {
      source = arguments[i];
      for (prop in source) {
        if (source.hasOwnProperty(prop)) {
          value = source[prop];
          if (value !== undefined) {
            target[prop] = value;
          }
        }
      }
    }
    return target;
  }

  function $alert(message, callback, title) {
    return $acp({ message: message, title: title }, callback);
  }

  function $confirm(message, callback, title) {
    return $acp({ message: message, title: title, showCancelButton: true }, callback);
  }

  function $prompt(message, callback, title, value, placeholder) {
    return $acp({
      message: message,
      title: title,
      value: value,
      placeholder: placeholder,
      showInput: true,
      showCancelButton: true
    }, callback);
  }

  function $acp(callOption, callback) {
    var option = merge({}, def$1, acpDefault, maskDefault, Acp.useOption, callOption);
    var instance = getInstance$1();

    if (typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        acpQueue.push({ option: option, callback: callback, resolve: resolve, reject: reject });
        instance.__show();
      });
    }

    acpQueue.push({ option: option });
    instance.__show();
  }

  function __show() {
    var _this = this;

    var maskOption = void 0,
        option = void 0,
        value = void 0;

    if (this.show) return false;

    member = acpQueue.shift();
    option = member.option;

    body$1.appendChild(this.$mount().$el);

    this.__setData(option);
    this.show = true;

    if (option.showInput) {
      this.$nextTick(function () {
        _this.$refs.input.focus();
      });
    }
    if (!option.mask) return false;

    maskOption = {};

    Object.keys(maskDefault).forEach(function (prop) {
      value = option[prop];
      if (typeof value !== 'undefined') {
        maskOption[prop] = value;
      }
    });

    if (option.maskClassName) {
      maskOption.className = option.maskClassName;
    }

    if (option.zIndex) {
      maskOption.zIndex = option.zIndex - 1;
    }

    return maskOption;
  }

  function wrapCallback(action) {
    var value = void 0;

    if (member.option.showInput) {
      value = instance$1.value;
    }

    if (member.callback) {
      return member.callback(action, value);
    }

    action ? member.resolve(value) : member.reject();
  }

  function __action(b) {
    if (this.callback(b) !== false) {
      this.__close();
    }
  }

  function __setData$1(option) {
    Object.keys(acpDefault).forEach(function (prop) {
      instance$1[prop] = option[prop];
    });
  }

  function __afterLeave$1() {
    if (acpQueue.length) {
      instance$1.__show();
      return false;
    }
    instance$1 = null;
    return true;
  }

  function __close() {
    this.show = false;
  }

  function initAcp(Vue) {
    var Acp = Vue.extend(acp);
    var maskOne = mapMask(maskDefault);

    Object.assign(Acp.prototype, {
      __show: maskOne.mapMaskOpen(__show),
      __close: maskOne.mapMaskClose(__close),
      __setData: __setData$1,
      __action: __action,
      __afterLeave: __afterLeave$1
    });

    return Acp;
  }

  function getInstance$1() {
    instance$1 = instance$1 || new Acp();
    instance$1.callback = wrapCallback;
    return instance$1;
  }

  function init(Vue, useOption) {
    Acp = initAcp(Vue);
    Acp.useOption = useOption;

    return { $acp: $acp, $alert: $alert, $confirm: $confirm, $prompt: $prompt };
  }

  function install$1(Vue, useOption) {
    var acp$$1 = init(Vue, useOption);

    body$1 = document.body || document.querySelector('body') || document.getElementsByTagName('body')[0];

    Object.keys(acp$$1).forEach(function (key) {
      Vue[key] = Vue.prototype[key] = acp$$1[key];
    });

    Vue.use(index);
  }

  var index$1 = { install: install$1 };

  return index$1;

})));
