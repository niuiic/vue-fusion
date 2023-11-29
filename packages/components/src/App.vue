<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'

const isHome = ref(true)

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
    isHome.value = true
    return
  }
  isHome.value = false
  import(`./pages/${pageName}/index.ts`).then((x) => (page.value = x.default))
}
onMounted(renderPage)
window.addEventListener('popstate', renderPage)

const onClickEntry = (pageName: string) => {
  history.pushState(undefined, '', pageName)
  isHome.value = false
  import(`./pages/${pageName}/index.ts`).then((x) => (page.value = x.default))
}
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <div class="app">
    <ol v-if="isHome">
      <li v-for="(x, i) in pageNameList" :key="i" class="page" @click="onClickEntry(x)">{{ x }}</li>
    </ol>
    <component :is="page" v-else> </component>
  </div>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.page {
  user-select: none;
  cursor: pointer;
}
</style>
