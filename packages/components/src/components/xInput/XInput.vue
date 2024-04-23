<!-- # script -->
<script setup lang="ts">
import { ElInput } from 'element-plus'

// ## 组件配置
defineOptions({
  inheritAttrs: true
})

const data = defineModel<string | number>()
</script>

<!-- # template -->
<template>
  <ElInput v-bind="$attrs" v-model="data" class="x-input"></ElInput>
</template>
