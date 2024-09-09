<!-- ~ script -->
<script setup lang="ts">
import { useRoute, type RouteRecordRaw } from 'vue-router'
import { ElTree } from 'element-plus'
import { computed } from 'vue'
import { generateMenusFromRoutes } from './menu'

// ~~ 组件配置
interface Props {
  routes: RouteRecordRaw[]
}
const props = defineProps<Props>()

interface Emits {
  (e: 'click-menu', route: RouteRecordRaw): void
  (e: 'enter-menu', el: HTMLElement, route: RouteRecordRaw): void
  (e: 'leave-menu', el: HTMLElement, route: RouteRecordRaw): void
}
const emit = defineEmits<Emits>()

// ~~ 菜单项
const route = useRoute()
const menus = computed(() => generateMenusFromRoutes(props.routes))

// ~~ 树
const treeProps = {
  children: 'children',
  label: 'label'
}
</script>

<!-- ~ template -->
<template>
  <el-tree class="menu-tree" :props="treeProps" :data="menus" default-expand-all>
    <template #default="{ data }">
      <div
        :class="{ 'menu-node': true, 'menu-node--selected': route.name === data.data?.name }"
        @click="data.data && emit('click-menu', data.data)"
        @mouseenter="(e) => data.data && emit('enter-menu', e.target as HTMLElement, data.data)"
        @mouseleave="(e) => data.data && emit('leave-menu', e.target as HTMLElement, data.data)"
      >
        {{ data.label }}
      </div>
    </template>
  </el-tree>
</template>

<!-- ~ style -->
<style lang="scss" scoped>
.menu-tree {
  overflow: auto;
  color: #ffffff;

  --el-tree-node-hover-bg-color: #74829a;
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
