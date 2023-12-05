<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
// %%--------------------------- 组件配置 ---------------------------%%
import { GLayout } from '@/components/gLayout'
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <GLayout>
    <template #nav>
      <div class="nav">nav</div>
    </template>
    <template #lower>
      <div class="lower" @click="() => console.log('lower')">lower</div>
    </template>
    <template #upper>
      <div class="upper" @click="() => console.log('upper')">upper</div>
    </template>
  </GLayout>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.nav {
  background: red;
}

.lower {
  height: 100%;
  background: green;
}

.upper {
  height: 100%;
  background: blue;
}
</style>
