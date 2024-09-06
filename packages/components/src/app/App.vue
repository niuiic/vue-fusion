<!-- ~ script -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { CodeProps } from '@/components/code'
import { Code } from '@/components/code'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
import type { Page } from '@/router'
import { routes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import MenuTree from './MenuTree.vue'
import { useComponent } from '@/components/useComponent'

// ~~ router
const router = useRouter()
const route = useRoute()

// ~~ entry
const [mountInfo, unmountInfo] = useComponent(() => import('./CompInfo.vue'))
const showInfo = (el: HTMLElement, route: RouteRecordRaw) => {
  const pos = el.getBoundingClientRect()
  route.meta &&
    mountInfo({
      info: route.meta.page as Page,
      top: pos.top,
      left: pos.left
    })
}
const hideInfo = unmountInfo
const onClickMenu = (route: RouteRecordRaw) => router.push({ name: route.name })

// ~~ code
const codeList = ref<CodeProps[]>([])
const withCode = computed(() => codeList.value.length > 0)
watch(
  () => route.name,
  () => {
    codeList.value = (route.meta?.page as Page)?.docs ?? []
  }
)
</script>

<!-- ~ template -->
<template>
  <el-config-provider :locale="zhCn">
    <div :class="{ app: true, 'app--with-code': withCode }">
      <MenuTree class="nav" :routes="routes" @click-menu="onClickMenu" @enter-menu="showInfo" @leave-menu="hideInfo">
      </MenuTree>
      <div class="page">
        <router-view></router-view>
      </div>
      <div v-if="withCode" class="code-list">
        <div class="code-list__inner">
          <Code v-for="(x, i) in codeList" :key="i" :code="x.code" :language="x.language" :label="x.label"></Code>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<!-- ~ style -->
<style lang="scss" scoped>
/* ~~ app */
.app {
  display: grid;
  grid-template-columns: 160px 1fr;
  height: 100%;
  background-color: #131417;
}

.app:has(#empty) {
  grid-template-columns: 160px 1fr;
}

.app--with-code {
  grid-template-columns: 160px 2fr 1fr;
}

/* ~~ nav */
.nav {
  overflow: auto;
  margin-right: 3px;
  padding: 4px;
  box-shadow: 3px 0 3px 0 rgba(0, 0, 0, 0.5);
}

.entry {
  font-size: 16px;
  user-select: none;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
}

.entry + .entry {
  margin-top: 8px;
}

.entry--active {
  scale: 1.1;
}

/* ~~ page */
.page {
  overflow: auto;
}

/* ~~ code */
.code-list {
  overflow: auto;
  margin-left: 3px;
  box-shadow: -3px 0 3px 0 rgba(0, 0, 0, 0.5);
}

.code-list__inner {
  width: 100%;
  min-width: max-content;
}

.code + .code {
  margin-top: 3px;
}
</style>
