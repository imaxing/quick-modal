<template>
  <button @click="handleSubmit">测试</button>
</template>

<script>
export default {
  name: 'Test',
  methods: {
    handleSubmit(params) {
      this.$emit('update:title', '触发成功' + params.a)
    }
  }
}
</script>
