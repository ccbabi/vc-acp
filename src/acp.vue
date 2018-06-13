<template>
  <transition name="vc-acp" @after-leave="afterLeave">
    <div class="vc-acp" :class="className" v-show="show" :style="{ zIndex }">
      <div class="vc-acp-header" v-if="title">
        <div class="vc-acp-title">{{ title }}</div>
      </div>
      <div class="vc-acp-body" v-if="message">
        <div class="vc-acp-message" v-html="message" />
        <div class="vc-acp-prompt" v-if="showInput">
          <input class="vc-acp-input" v-model="value" :placeholder="placeholder" ref="input" />
        </div>
      </div>
      <div class="vc-acp-footer">
        <button class="vc-acp-btn vc-acp-cancel" v-if="showCancelButton" @click="__action(false)"> {{ cancelButtonText }}</button>
        <button class="vc-acp-btn vc-acp-confirm" v-if="showConfirmButton" @click="__action(true)"> {{ confirmButtonText }}</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
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
      default: '',
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
      default: () => {}
    },
    zIndex: {
      type: Number,
      default: 10001
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    afterLeave (el) {
      const shouldDestroy = this.__afterLeave()
      if (shouldDestroy) {
        el.parentNode.removeChild(el)
        this.$destroy()
      }
    }
  }
}
</script>
