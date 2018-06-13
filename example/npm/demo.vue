<template>
  <div>
    <button @click="testAlert">alert</button>
    <button @click="testConfirm">confirm</button>
    <button @click="testPrompt">prompt</button>
    <button @click="testAcp">acp</button>
  </div>
</template>
<style>
button {
  position: relative;
  z-index: 10001;
}
</style>
<script>
export default {
  methods: {
    testAlert () {
      this.$alert('欢迎使用我的组件').then(() => {
        console.log('aaaa')
      })
    },
    testConfirm () {
      this.$confirm('确认删除吗？').then(() => {
        console.log('点击了确认按钮')
      }).catch(() => {
        console.log('点击了取消按钮')
      })
    },
    testPrompt () {
      this.$prompt('请输入你的名字：').then(val => {
        console.log(`点击了确认按钮：${val}`)
      }).catch(() => {
        console.log(`点击了取消按钮`)
      })
    },
    testAcp () {
      this.$acp({
        message: '自定义配置',
        mask: false,
        zIndex: 30000,
        showInput: true,
      }, val => {
        console.log(val)
      })
    }
  }
}
</script>
