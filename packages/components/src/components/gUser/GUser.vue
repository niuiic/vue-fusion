<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
import { ref } from 'vue'
import { ElPopover } from 'element-plus'
import '@/assets/icons/gUser/icon.js'
import { GIcon } from '../gIcon'

// %%--------------------------- 组件配置 ---------------------------%%
interface Props {
  user: string
}
defineProps<Props>()

type Emits = (e: 'exit') => void
const emit = defineEmits<Emits>()

const buttonRef = ref()
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <div class="g-user">
    <div ref="buttonRef" class="btn">
      <span>{{ user }}</span>
      <GIcon name="icon-xiala" color="#ffffff"></GIcon>
    </div>
    <el-popover :virtual-ref="buttonRef" popper-class="exit-btn" virtual-triggering>
      <span @click="emit('exit')">退出</span>
    </el-popover>
  </div>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  font-family: PingFangSC-Semibold, 'PingFang SC';
  font-weight: 600;
  color: #ffffff;
  line-height: 28px;
}
</style>

<style lang="scss">
.el-popover.exit-btn {
  font-size: 16px;
  color: #ffffff;
  padding-inline: 20px;
  user-select: none;
  cursor: pointer;
}
</style>
