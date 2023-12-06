<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
import { GIcon } from '../gIcon'

// %%--------------------------- 组件配置 ---------------------------%%
interface Props {
  title: string
  icon: string
}
defineProps<Props>()

type Emits = (e: 'close') => void
const emit = defineEmits<Emits>()
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <div class="g-dialog">
    <div class="g-dialog__inner">
      <div class="header">
        <slot name="headerLeft">
          <div class="header__left">
            <GIcon class="header__icon" :name="icon" color="#ffffff"></GIcon>
            <span class="header__title">{{ title }}</span>
          </div>
        </slot>
        <slot name="headerRight">
          <div class="header__right">
            <GIcon class="close-btn" name="icon-c-x" color="#ffffff" @click="emit('close')"> </GIcon>
          </div>
        </slot>
      </div>
      <div class="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
/* %%--------------------------- 弹窗 ---------------------------%% */
.g-dialog {
  position: absolute;
  z-index: 10;
  display: flex;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
}

.g-dialog__inner {
  margin: auto;
  width: 1200px;
  height: 510px;
}

/* %%--------------------------- 头部 ---------------------------%% */
$corner-size: 10px;

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 54px;
  background: linear-gradient(90deg, rgba(0, 47, 123, 0.85) 0%, rgba(5, 18, 57, 0.24) 100%),
    linear-gradient(45deg, transparent 0, transparent 50%, rgba(0, 162, 254, 0.8) 50%, rgba(0, 162, 254, 0.8) 100%);
  background-position:
    top left,
    top right;
  background-repeat: no-repeat;
  background-size:
    100% 100%,
    $corner-size $corner-size;
  border: 1px solid rgba(0, 162, 254, 0.8);
  clip-path: polygon(0 0, calc(100% - $corner-size) 0, 100% $corner-size, 100% 100%, 0 100%);
}

.header__left {
  display: inline-flex;
  gap: 8px;
}

.header__title {
  font-size: 20px;
  line-height: 24px;
  font-family: HuXiaoBo-NanShen, HuXiaoBo;
  font-weight: normal;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.header__icon {
  width: 20px;
  height: 20px;
}

.title__icon {
  margin-left: 5px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.close-btn {
  cursor: pointer;
}

/* %%--------------------------- 主体 ---------------------------%% */
.body {
  padding: 20px 24px;
  height: calc(100% - 54px);
  background: url('@/assets/images/gDialog/bg.png');
  background-size: 100% 100%;
}
</style>
