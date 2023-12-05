<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
import { computed } from 'vue'

// %%--------------------------- 组件配置 ---------------------------%%
interface Props {
  name: string
  color?: string
}

const props = defineProps<Props>()

// %%--------------------------- icon名 ---------------------------%%
const fixedName = computed(() => `#${props.name}`)
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <svg class="g-icon" aria-hidden="true">
    <use :xlink:href="fixedName" :fill="color" />
  </svg>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.g-icon {
  width: 14px;
  height: 14px;
}
</style>
