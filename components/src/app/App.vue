<!-- % script % -->
<script setup lang="ts">
import type { CodeProps } from '@/components/code'
import { Code } from '@/components/code'
import { ElConfigProvider, ElButton } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { defineAsyncComponent, onBeforeMount, ref, shallowRef, watch } from 'vue'
import MenuTree from './MenuTree.vue'
import type { Page } from '@/page'
import { queryPages } from '@/page'
import type { Menu } from './menu'
import { assert } from '@/components/assert'
import CompInfo from './CompInfo.vue'

// %% menu %%
const onRightClickMenu = (data: Exclude<Menu['data'], undefined>) => {
  window.open(window.location.origin + '#' + data.id)
}
const onClickMenu = (data: Exclude<Menu['data'], undefined>) => {
  locationHash.value = data.id
  switchPage(data)
}
const isSelectedMenu = (menu: Menu) => locationHash.value === menu.data?.id
const locationHash = ref<string>(window.location.hash.slice(1))
watch(locationHash, () => (window.location.hash = locationHash.value))
const switchPage = (page: Page) => {
  PageComp.value = defineAsyncComponent(page.component ?? Empty)
  docList.value = page.docs ?? []
  compInfo.value = page
}
const pages = shallowRef<Record<string, Page>>({})
const initPage = async () => {
  pages.value = await queryPages()
  let curPage = pages.value[locationHash.value]
  if (!curPage) {
    curPage = Object.values(pages.value)[0]
  }
  assert(curPage)
  switchPage(curPage)
}
onBeforeMount(initPage)

// %% page %%
const setShowPage = (value: boolean) => {
  showPage.value = value
  localStorage.setItem('showPage', value.toString())
}
const getShowPage = () => localStorage.getItem('showPage') !== 'false'
const showPage = ref(getShowPage())
const Empty = () => import('./Empty.vue')
const PageComp = shallowRef(defineAsyncComponent(Empty))
const compInfo = ref<Page>()

// %% doc %%
const setShowDoc = (value: boolean) => {
  showDoc.value = value
  localStorage.setItem('showDoc', value.toString())
}
const getShowDoc = () => localStorage.getItem('showDoc') !== 'false'
const showDoc = ref(getShowDoc())
const docList = ref<CodeProps[]>([])
</script>

<!-- % template % -->
<template>
  <el-config-provider :locale="zhCn">
    <div class="app">
      <div class="nav">
        <div class="btns">
          <el-button plain round @click="setShowDoc(!showDoc)">
            {{ showDoc ? '显示文档' : '隐藏文档' }}
          </el-button>
          <el-button plain round @click="setShowPage(!showPage)">
            {{ showPage ? '显示示例' : '隐藏示例' }}
          </el-button>
        </div>
        <MenuTree
          :pages="pages"
          :is-selected-menu="isSelectedMenu"
          @click-menu="onClickMenu"
          @right-click-menu="onRightClickMenu"
        />
      </div>
      <div v-if="showPage" class="page">
        <PageComp />
      </div>
      <div v-if="showDoc && docList.length > 0" class="code-list">
        <div class="code-list__wrapper">
          <CompInfo v-if="compInfo" :data="compInfo" />
          <div class="code-list__inner">
            <Code v-for="(x, i) in docList" :key="i" :code="x.code" :language="x.language" :label="x.label" />
          </div>
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

.app:has(> .code-list) {
  grid-template-columns: 200px 2fr 1fr;
}

.app:not(.app:has(> .page)) {
  grid-template-columns: 200px 1fr;
}

.app:has(> .page #empty) {
  grid-template-columns: 200px 1fr;
}

/* %% nav %% */
.nav {
  overflow: auto;
  display: flex;
  flex-direction: column;

  padding: 8px;

  background-color: #1e1f26;
}

.btns {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

:deep(.menu-tree) {
  flex: 1;

  .menus {
    background-color: #1e1f26;
  }
}

/* %% page %% */
.page {
  overflow: auto;
}

.page:has(#empty) {
  display: none;
}

/* %% code %% */
.code-list__wrapper {
  width: 100%;
  min-width: max-content;
}

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
