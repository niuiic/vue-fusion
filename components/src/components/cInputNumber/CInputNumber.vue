<!-- % script % -->
<script setup lang="ts">
import { h, ref } from 'vue'
import { ElInputNumber } from 'element-plus'

const compRef = ref()
defineExpose({ getInstance: () => compRef.value })
</script>

<!-- % template % -->
<template>
  <component :is="h(ElInputNumber, $attrs, $slots)" ref="compRef" class="c-input-number" />
</template>

<!-- % style % -->
<style lang="scss" scoped>
.c-input-number {
}
</style>