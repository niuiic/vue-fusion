<!-- % script % -->
<script setup lang="ts">
import type { CodeProps } from '@/components/code'
import { Code } from '@/components/code'
import { useAsyncComp } from '@/components/useAsyncComp'
import { ElConfigProvider, ElButton } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { defineAsyncComponent, onBeforeMount, ref, shallowRef } from 'vue'
import MenuTree from './MenuTree.vue'
import type { Page } from '@/page'
import { queryPages } from '@/page'
import type { Menu } from './menu'
import { assert } from '@/components/assert'

// %% menu %%
const mountInfo = useAsyncComp(() => import('./CompInfo.vue'))
const showInfo = (el: HTMLElement, data: Exclude<Menu['data'], undefined>) => {
  const pos = el.getBoundingClientRect()
  mountInfo(({ unmount }) => {
    hideInfo = () => unmount().catch(() => {})
    return { info: data, top: pos.top, left: pos.left }
  })
}
let hideInfo: () => void
const onClickMenu = (data: Exclude<Menu['data'], undefined>) => {
  window.location.hash = data.id
  switchPage(data)
}
const isSelectedMenu = (menu: Menu) => window.location.hash === menu.data?.id
const switchPage = (page: Page) => {
  PageComp.value = defineAsyncComponent(page.component ?? Empty)
  docList.value = page.docs ?? []
}
const pages = shallowRef<Record<string, Page>>({})
const initPage = async () => {
  pages.value = await queryPages()
  let curPage = pages.value[window.location.hash]
  if (!curPage) {
    curPage = Object.values(pages.value)[0]
  }
  assert(curPage)
  switchPage(curPage)
}
onBeforeMount(initPage)

// %% page %%
const Empty = () => import('./Empty.vue')
const PageComp = shallowRef(defineAsyncComponent(Empty))

// %% doc %%
const setShowDoc = (value: boolean) => {
  showDoc.value = value
  localStorage.setItem('showDoc', value.toString())
}
const getShowDoc = () => localStorage.getItem('showDoc') === 'true'
const showDoc = ref(getShowDoc())
const docList = ref<CodeProps[]>([])
</script>

<!-- % template % -->
<template>
  <el-config-provider :locale="zhCn">
    <div class="app">
      <div class="nav">
        <MenuTree
          :pages="pages"
          :is-selected-menu="isSelectedMenu"
          @click-menu="onClickMenu"
          @enter-menu="showInfo"
          @leave-menu="hideInfo"
        />
        <el-button type="info" plain round @click="setShowDoc(!showDoc)">
          {{ showDoc ? '隐藏文档' : '显示文档' }}
        </el-button>
      </div>
      <div class="page">
        <PageComp />
      </div>
      <div v-if="showDoc && docList.length > 0" class="code-list">
        <div class="code-list__inner">
          <Code v-for="(x, i) in docList" :key="i" :code="x.code" :language="x.language" :label="x.label" />
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<!-- % style % -->
<style lang="scss" scoped>
/* %% app %% */
.app {
  display: grid;
  grid-template-columns: 200px 1fr;
  height: 100%;
  background-color: #131417;
}

.app:has(.code-list) {
  grid-template-columns: 200px 2fr 1fr;
}

.app:has(#empty) {
  grid-template-columns: 200px 1fr;
}

/* %% nav %% */
.nav {
  overflow: auto;
  padding: 4px;
  background-color: #1e1f26;
}

.menu-tree {
  background-color: #1e1f26;
}

/* %% page %% */
.page {
  overflow: auto;
}

.page:has(#empty) {
  display: none;
}

/* %% code %% */
.code-list {
  overflow: auto;
  background-color: #1e1f26;
}

.code-list__inner {
  width: 100%;
  min-width: max-content;
}

.code + .code {
  margin-top: 3px;
}

// %% scrollbar %%
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #2c303b;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #74829a;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #c7c9d3;
}
</style>
