<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
// %%--------------------------- 组件配置 ---------------------------%%
import { GWeather } from '@/components/gWeather'
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <div class="wrapper">
    <GWeather city="hangzhou"></GWeather>
  </div>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.wrapper {
  background: black;
}
</style>
