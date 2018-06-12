<template>
  <transition name="vc-acp" @after-leave="afterLeave">
    <div class="vc-acp" :class="className" v-show="show">
      <div class="vc-acp-header" v-if="title">
        <div class="vc-acp-title">{{ title }}</div>
      </div>
      <div class="vc-acp-body" v-if="message">
        <div class="vc-acp-message" v-html="message" />
        <div class="vc-acp-prompt" v-if="showInput">
          <input class="vc-acp-input" v-model="value" :placeholder="placeholder" />
        </div>
      </div>
      <div class="vc-acp-footer">
        <button class="vc-acp-btn vc-acp-cancel" v-if="showCancelButton" @click="__action(false)"> {{ cancelButtonText }}</button>
        <button class="vc-acp-btn vc-acp-confirm" v-if="showConfirmButton" @click="__action(true)"> {{ confirmButtonText }}</button>
      </div>
    </div>
  </transition>
</template>

<style lang="less">
  .vc-acp {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 80%;
    background: #fff;
    border-radius: 3px;
    overflow: hidden;

    &-header {
      padding: .5em;
      font-size: 14px;
      color: #666;
    }

    &-body {
      padding: 1em 1.5em;
    }

    &-message {
      line-height: 1.75;
      white-space: normal;
      word-wrap: break-word;
      color: #333;
    }

    &-prompt {
      padding: .5em 0;
    }

    &-input {
      width: 100%;
      font-size: 16px;
      background-color: transparent;
      outline: none;
      border: none;
      padding: .2em 0;
      border-bottom: 1px solid #ccc;
      color: #222;
    }

    &-footer {
      display: flex;
      border-top: 1px solid #eee;
      margin-left: -1px;
    }

    &-btn {
      flex: 1;
      display: block;
      border: none;
      border-left: 1px solid #eee;
      padding: 0 1px;
      height: 2.2em;
      font-size: 16px;
      cursor: pointer;
      outline: none;
    }

    &-confirm {
      color: #0083ff;
    }

    &-enter-active,
    &-leave-active {
      transition: .2s;
    }

    &-enter,
    &-leave-to,
    &-leave-active {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0) scale(0.7)
    }
  }
</style>

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
