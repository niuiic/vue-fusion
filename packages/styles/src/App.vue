<!-- ~ script -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { CodeProps } from './utils/code'
import { Code } from './utils/code'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
import { pages, entries } from './utils/router'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// ~~ entry
const onClickEntry = (name: string) => {
  router.push({
    name: name
  })
}

// ~~ code
const codeList = ref<CodeProps[]>([])
const withCode = computed(() => codeList.value.length > 0)
watch(
  () => route.name,
  (name) => {
    const entry = entries.find((x) => x.name === name)?.entry
    if (!entry) {
      return
    }
    pages[entry]().then((x: any) => {
      if (x.codeList) {
        codeList.value = x.codeList
      }
    })
  }
)
</script>

<!-- ~ template -->
<template>
  <el-config-provider :locale="zhCn">
    <div :class="{ app: true, 'app--with-code': withCode }">
      <div class="nav">
        <ol>
          <li
            v-for="({ name }, i) in entries"
            :key="i"
            :class="{ entry: true, 'entry--active': name === route.name }"
            @click="onClickEntry(name)"
          >
            {{ name }}
          </li>
        </ol>
      </div>
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
}

.app--with-code {
  grid-template-columns: 160px 2fr 1fr;
}

/* ~~ nav */
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
