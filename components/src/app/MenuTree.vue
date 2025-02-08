<!-- % script % -->
<script setup lang="ts">
import { ElTree } from 'element-plus'
import { computed } from 'vue'
import type { Menu } from './menu'
import { generateMenusFromPages } from './menu'
import type { Page } from '@/page'

// %% 组件配置 %%
interface Props {
  pages: Record<string, Page>
  isSelectedMenu: (menu: Menu) => boolean
}
const props = defineProps<Props>()

interface Emits {
  (e: 'click-menu', data: Exclude<Menu['data'], undefined>): void
  (e: 'enter-menu', el: HTMLElement, data: Exclude<Menu['data'], undefined>): void
  (e: 'leave-menu', el: HTMLElement, data: Exclude<Menu['data'], undefined>): void
}
const emit = defineEmits<Emits>()

// %% 菜单项 %%
const menus = computed(() => generateMenusFromPages(props.pages))

// %% 树 %%
const treeProps = {
  children: 'children',
  label: 'label'
}
</script>

<!-- % template % -->
<template>
  <el-tree class="menu-tree" :props="treeProps" :data="menus" default-expand-all>
    <template #default="{ data }">
      <div
        :class="{ 'menu-node': true, 'menu-node--selected': isSelectedMenu(data) }"
        @click="data.data && emit('click-menu', data)"
        @mouseenter="(e) => data.data && emit('enter-menu', e.target as HTMLElement, data)"
        @mouseleave="(e) => data.data && emit('leave-menu', e.target as HTMLElement, data)"
      >
        {{ data.label }}
      </div>
    </template>
  </el-tree>
</template>

<!-- % style % -->
<style lang="scss" scoped>
.menu-tree {
  --el-tree-node-hover-bg-color: #74829a;

  overflow: auto;
  color: #fff;
}

.menu-node {
  overflow: hidden;
  min-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-node--selected {
  color: #409eff;
}
</style>
