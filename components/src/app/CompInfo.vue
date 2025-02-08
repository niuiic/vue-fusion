<!-- % script % -->
<script setup lang="ts">
import { CompStatus, compStatusLabel, type Page } from '@/page'

// %% 组件配置 %%
interface Props {
  data: Page
}
defineProps<Props>()

// %% 状态 %%
const compStatusClass = {
  [CompStatus.Approved]: 'block--green',
  [CompStatus.PendingReview]: 'block--yellow',
  [CompStatus.Deprecated]: 'block--gray',
  [CompStatus.Developing]: 'block--blue',
  [CompStatus.Rejected]: 'block--red'
}
</script>

<!-- % template % -->
<template>
  <div class="comp-info">
    <div class="label">名称</div>
    <div class="value">{{ data.name }}</div>
    <div class="label">状态</div>
    <div class="value">
      <div v-for="x in data.status" :key="x">
        <div :class="{ block: true, [compStatusClass[x]]: true }">{{ compStatusLabel[x] }}</div>
      </div>
    </div>
    <div class="label">标签</div>
    <div class="value">
      <template v-if="data.tags">
        <div v-for="x in data.tags" :key="x">
          <div class="block block--cyan">{{ x }}</div>
        </div>
      </template>
      <div v-else>-</div>
    </div>
    <div class="label">描述</div>
    <div class="value">{{ data.desc }}</div>
    <div class="label">负责人</div>
    <div class="value">{{ data.author }}</div>
    <div class="label">审核人</div>
    <div class="value">{{ data.author }}</div>
  </div>
</template>

<!-- % style % -->
<style lang="scss" scoped>
.comp-info {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 8px;

  padding: 8px;

  color: #fff;

  background-color: #2c303b;
  box-shadow: 0 0 3px 0 rgb(0 0 0 / 50%);
}

.label {
  align-self: center;

  &::after {
    content: ':';
  }
}

.value {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.block {
  width: fit-content;
  padding: 4px;
  border: 1px solid;
  border-radius: 4px;
}

.block--green {
  border-color: #10b050;
  color: #006020;
  background-color: #00b050;
}

.block--yellow {
  border-color: #f0c000;
  color: #806000;
  background-color: #f0c000;
}

.block--gray {
  border-color: #808080;
  color: #404040;
  background-color: #808080;
}

.block--blue {
  border-color: #0070c0;
  color: #003060;
  background-color: #0070c0;
}

.block--red {
  border-color: #f00;
  color: #800000;
  background-color: #f00;
}

.block--cyan {
  border-color: #00bfff;
  color: #0060c0;
  background-color: #00bfff;
}
</style>
