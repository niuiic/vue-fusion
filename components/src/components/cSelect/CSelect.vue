<!-- % script % -->
<script setup lang="ts">
import { h, ref } from 'vue'
import { ElSelect } from 'element-plus'

const compRef = ref()
defineExpose({ getInstance: () => compRef.value })
</script>

<!-- % template % -->
<template>
  <component :is="h(ElSelect, $attrs, $slots)" ref="compRef" class="c-select" />
</template>

<!-- % style % -->
<style lang="scss" scoped>
.c-select {
}
</style>