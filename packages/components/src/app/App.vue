<!-- % script % -->
<script setup lang="ts">
import type { CodeProps } from '@/components/code'
import { Code } from '@/components/code'
import { useAsyncComp } from '@/components/useAsyncComp'
import type { Page } from '@/router'
import { routes } from '@/router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ref, watch } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import MenuTree from './MenuTree.vue'

// %% router %%
const router = useRouter()
const route = useRoute()

// %% entry %%
const [mountInfo, unmountInfo] = useAsyncComp(() => import('./CompInfo.vue'))
const showInfo = (el: HTMLElement, route: RouteRecordRaw) => {
  const pos = el.getBoundingClientRect()
  if (route.meta) {
    mountInfo({
      info: route.meta.page as Page,
      top: pos.top,
      left: pos.left
    })
  }
}
const hideInfo = unmountInfo
const onClickMenu = (route: RouteRecordRaw) => router.push({ name: route.name })

// %% code %%
const codeList = ref<CodeProps[]>([])
watch(
  () => route.name,
  () => {
    codeList.value = (route.meta?.page as Page)?.docs ?? []
  }
)
</script>

<!-- % template % -->
<template>
  <el-config-provider :locale="zhCn">
    <div class="app">
      <MenuTree class="nav" :routes="routes" @click-menu="onClickMenu" @enter-menu="showInfo" @leave-menu="hideInfo" />
      <div class="page">
        <router-view />
      </div>
      <div v-if="codeList.length > 0" class="code-list">
        <div class="code-list__inner">
          <Code v-for="(x, i) in codeList" :key="i" :code="x.code" :language="x.language" :label="x.label" />
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
  grid-template-columns: 160px 1fr;
  height: 100%;
  background-color: #131417;
}

.app:has(.code-list) {
  grid-template-columns: 160px 2fr 1fr;
}

.app:has(#empty) {
  grid-template-columns: 160px 1fr;
}

/* %% nav %% */
.nav {
  overflow: auto;
  padding: 4px;
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
  background-color: #74829a;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #c7c9d3;
}
</style>
