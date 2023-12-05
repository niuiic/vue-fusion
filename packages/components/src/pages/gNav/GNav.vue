<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
// %%--------------------------- 组件配置 ---------------------------%%
import type { Entry } from '@/components/gNav'
import { ref } from 'vue'
import { GNav } from '@/components/gNav'

const entries: Entry[] = [
  {
    id: '1',
    label: '入口1',
    pos: 'LEFT'
  },
  {
    id: '2',
    label: '入口2',
    pos: 'LEFT'
  },
  {
    id: '3',
    label: '入口3',
    pos: 'LEFT',
    children: [
      {
        id: '3.1',
        label: '入口3.1'
      },
      {
        id: '3.2',
        label: '入口3.2'
      }
    ]
  },
  {
    id: '4',
    label: '入口4',
    pos: 'RIGHT'
  },
  {
    id: '5',
    label: '入口5',
    pos: 'RIGHT'
  },
  {
    id: '6',
    label: '入口6',
    pos: 'RIGHT'
  }
]

const activedEntry = ref<Entry>(entries[0])
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <GNav v-model:actived-entry="activedEntry" title="XXX系统标题" :entries="entries">
    <template #left>
      <span class="text"> 最左侧 </span>
    </template>
    <template #right>
      <span class="text"> 最右侧 </span>
    </template>
  </GNav>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.text {
  color: #ffffff;
}
</style>
