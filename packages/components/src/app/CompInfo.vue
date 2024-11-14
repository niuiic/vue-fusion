<!-- % script % -->
<script setup lang="ts">
import type { Page } from '@/router'

// %% 组件配置 %%
interface Props {
  info: Page
  top: number
  left: number
}
defineProps<Props>()
</script>

<!-- % template % -->
<template>
  <div v-if="info.desc" class="comp-info" :style="`top: ${top}px; left: ${left}px;`">
    {{ info.desc }}
  </div>
</template>

<!-- % style % -->
<style lang="scss" scoped>
.comp-info {
  position: fixed;
  transform: translateX(160px);

  min-width: 300px;
  min-height: 300px;
  padding: 16px;

  border-radius: 8px;
  box-shadow: 0 0 3px 0 rgb(0 0 0 / 50%);
}
</style>
