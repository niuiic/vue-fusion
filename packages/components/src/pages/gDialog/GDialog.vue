<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
// %%--------------------------- 组件配置 ---------------------------%%
import { GDialog } from '@/components/gDialog'
import { ref } from 'vue'

const tips = [
  '设置.g-dialog__inner的宽高改变弹窗大小',
  '设置.g-dialog__inner的margin或者.g-dialog的padding改变弹窗位置',
  '设置.g-dialog的position为fixed创建全屏遮罩',
  '使用插槽headerLeft、headerRight自定义头部内容'
]

const isDialogVisiable = ref(true)
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <div class="wrapper">
    <GDialog v-if="isDialogVisiable" title="弹窗" icon="icon-c-down" @close="isDialogVisiable = false"> </GDialog>
  </div>
  <ul>
    <li v-for="(x, i) in tips" :key="i">{{ x }}</li>
  </ul>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.wrapper {
  position: relative;
  height: 800px;
  background-color: green;
}
</style>
