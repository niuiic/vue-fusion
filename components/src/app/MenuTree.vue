<!-- % script % -->
<script setup lang="ts">
import { ElTree, ElSelect, ElOption, ElInput } from 'element-plus'
import { computed, ref } from 'vue'
import type { Menu } from './menu'
import { generateMenusFromPages } from './menu'
import { CompStatus, type Page } from '@/page'

// %% 组件配置 %%
interface Props {
  pages: Record<string, Page>
  isSelectedMenu: (menu: Menu) => boolean
}
const props = defineProps<Props>()

interface Emits {
  (e: 'click-menu', data: Exclude<Menu['data'], undefined>): void
  (e: 'right-click-menu', data: Exclude<Menu['data'], undefined>): void
  (e: 'enter-menu', el: HTMLElement, data: Exclude<Menu['data'], undefined>): void
  (e: 'leave-menu', el: HTMLElement, data: Exclude<Menu['data'], undefined>): void
}
const emit = defineEmits<Emits>()

// %% 菜单项 %%
const menus = computed(() => {
  const tags = formData.value.tags && formData.value.tags.length > 0 ? new Set(formData.value.tags) : undefined
  const status = formData.value.status && formData.value.status.length > 0 ? new Set(formData.value.status) : undefined
  const pages = Object.fromEntries(
    Object.entries(props.pages).filter(([_, page]) => isPageValid({ page, tags, name: formData.value.name, status }))
  )
  return generateMenusFromPages(pages)
})

// %% 树 %%
const treeProps = {
  children: 'children',
  label: 'label'
}

// %% 筛选 %%
interface FormData {
  tags: string[]
  name: string
  status: CompStatus[]
}
const formData = ref<Partial<FormData>>({})
const tags = computed(() =>
  Array.from(
    new Set(
      Object.values(props.pages)
        .map((x) => x.tags ?? [])
        .flat()
    )
  )
)
const compStatus = {
  [CompStatus.Approved]: '审核通过',
  [CompStatus.PendingReview]: '待审核',
  [CompStatus.Deprecated]: '废弃',
  [CompStatus.Developing]: '开发中',
  [CompStatus.Rejected]: '审核不通过'
}
const isPageValid = ({
  page,
  tags,
  name,
  status
}: {
  page: Page
  tags?: Set<string>
  name?: string
  status?: Set<CompStatus>
}) => {
  if (status && page.status.every((x) => !status.has(x))) {
    return false
  }
  if (tags && page.tags?.every((x) => !tags.has(x))) {
    return false
  }
  if (name && !page.name.toLowerCase().includes(name.toLowerCase())) {
    return false
  }
  return true
}
</script>

<!-- % template % -->
<template>
  <div class="menu-tree">
    <div class="form">
      <el-select
        v-model="formData.tags"
        multiple
        clearable
        filterable
        placeholder="组件标签"
        :max-collapse-tags="1"
        collapse-tags
      >
        <el-option v-for="x in tags" :key="x" :label="x" :value="x" />
      </el-select>
      <el-select
        v-model="formData.status"
        multiple
        clearable
        filterable
        placeholder="组件状态"
        :max-collapse-tags="1"
        collapse-tags
      >
        <el-option v-for="[k, v] in Object.entries(compStatus)" :key="k" :label="v" :value="k" />
      </el-select>
      <el-input v-model="formData.name" clearable placeholder="组件名称" />
    </div>
    <el-tree class="menus" :props="treeProps" :data="menus" default-expand-all>
      <template #default="{ data }">
        <div
          :class="{ 'menu-node': true, 'menu-node--selected': isSelectedMenu(data) }"
          @contextmenu="data.data && emit('right-click-menu', data.data)"
          @click="data.data && emit('click-menu', data.data)"
          @mouseenter="(e) => data.data && emit('enter-menu', e.target as HTMLElement, data.data)"
          @mouseleave="(e) => data.data && emit('leave-menu', e.target as HTMLElement, data.data)"
        >
          {{ data.label }}
        </div>
      </template>
    </el-tree>
  </div>
</template>

<!-- % style % -->
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.menus {
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
