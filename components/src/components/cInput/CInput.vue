<!-- % script % -->
<script setup lang="ts">
import { h, ref } from 'vue'
import { ElInput } from 'element-plus'

const compRef = ref()
defineExpose({ getInstance: () => compRef.value })
</script>

<!-- % template % -->
<template>
  <component :is="h(ElInput, $attrs, $slots)" ref="compRef" class="c-input" />
</template>

<!-- % style % -->
<style lang="scss" scoped>
.c-input {
}
</style>
