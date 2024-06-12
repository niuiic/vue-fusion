<!-- # script -->
<script setup lang="ts">
import { ElInput } from 'element-plus'

// ## 组件配置
defineOptions({
  inheritAttrs: true
})

const modelValue = defineModel<string | number | undefined>()
</script>

<!-- # template -->
<template>
  <ElInput v-bind="$attrs" v-model="modelValue" class="x-input"></ElInput>
</template>
