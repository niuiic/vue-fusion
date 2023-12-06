<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
// %%--------------------------- 组件配置 ---------------------------%%
import { GUser } from '@/components/gUser'
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <div class="wrapper">
    <GUser user="管理员"></GUser>
  </div>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  background: black;
}
</style>
