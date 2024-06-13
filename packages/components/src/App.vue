<!-- # script -->
<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'
import type { CodeProps } from './utils/code'
import { Code } from './utils/code'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// ## page
const pages = import.meta.glob('./pages/**/index.ts')
const pageNameList = Object.keys(pages)
  .map((x) => {
    const matched = x.match(/\.\/pages\/(.+)\/index\.ts/)
    return matched ? matched[1] : undefined
  })
  .filter((x): x is string => Boolean(x))

const page = shallowRef()
const renderPage = () => {
  const pageName = window.location.pathname.slice(import.meta.env.VITE_BASE_URL.length)
  if (!pageName) {
    return
  }
  import(`./pages/${pageName}/index.ts`).then((x) => {
    page.value = x.page
    codeList.value = x.codeList ?? []
    curPage.value = pageName
  })
}
onMounted(renderPage)
window.addEventListener('popstate', renderPage)

// ## entry
const curPage = ref()
const onClickEntry = (pageName: string) => {
  history.pushState(undefined, '', import.meta.env.VITE_BASE_URL + pageName)
  import(`./pages/${pageName}/index.ts`).then((x) => {
    page.value = x.page
    codeList.value = x.codeList ?? []
    curPage.value = pageName
  })
}

// ## code
const codeList = ref<CodeProps[]>([])
const withCode = computed(() => codeList.value.length > 0)
</script>

<!-- # template -->
<template>
  <el-config-provider :locale="zhCn">
    <div :class="{ app: true, 'app--with-code': withCode }">
      <div class="nav">
        <ol>
          <li
            v-for="(x, i) in pageNameList"
            :key="i"
            :class="{ entry: true, 'entry--active': x === curPage }"
            @click="onClickEntry(x)"
          >
            {{ x }}
          </li>
        </ol>
      </div>
      <div class="page">
        <component :is="page"> </component>
      </div>
      <div v-if="withCode" class="code-list">
        <div class="code-list__inner">
          <Code v-for="(x, i) in codeList" :key="i" :code="x.code" :language="x.language" :label="x.label"></Code>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<!-- # style -->
<style lang="scss" scoped>
/* ## app */
.app {
  display: grid;
  grid-template-columns: 160px 1fr;
  height: 100%;
}

.app--with-code {
  grid-template-columns: 160px 2fr 1fr;
}

/* ## nav */
.nav {
  overflow: auto;
  margin-right: 3px;
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

/* ## page */
.page {
  overflow: auto;
}

/* ## code */
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
