<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'

const pages = import.meta.glob('./pages/**/index.ts')
const pageNameList = Object.keys(pages)
  .map((x) => {
    const matched = x.match(/\.\/pages\/(.+)\/index\.ts/)
    return matched ? matched[1] : undefined
  })
  .filter((x): x is string => Boolean(x))

const page = shallowRef()
const renderPage = () => {
  const pageName = window.location.pathname.slice(1)
  if (!pageName) {
    return
  }
  import(`./pages/${pageName}/index.ts`).then((x) => (page.value = x.default))
}
onMounted(renderPage)
window.addEventListener('popstate', renderPage)

const onClickEntry = (pageName: string) => {
  history.pushState(undefined, '', pageName)
  import(`./pages/${pageName}/index.ts`).then((x) => (page.value = x.default))
}
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <div class="app">
    <div class="nav">
      <ol>
        <li v-for="(x, i) in pageNameList" :key="i" class="entry" @click="onClickEntry(x)">{{ x }}</li>
      </ol>
    </div>
    <div class="page">
      <component :is="page"> </component>
    </div>
  </div>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.app {
  display: flex;
  height: 100vh;
}

.nav {
  overflow: auto;
  padding: 16px;
  width: 160px;
  border-right: 1px solid black;
}

.entry {
  font-size: 16px;
  user-select: none;
  cursor: pointer;
}

.entry + .entry {
  margin-top: 8px;
}

.page {
  flex: 1;
  overflow: auto;
}
</style>
