<!-- % script % -->
<script setup lang="ts">
import hljs from 'highlight.js'
import { parse } from 'marked'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { copyToClipboard } from '../clipboard'
import { notify } from '../notify'
import type { CodeProps } from './nonBusiness'

// %% 组件配置 %%
const props = defineProps<CodeProps>()

// %% code %%
const bodyRef = ref<HTMLPreElement>()
const bodyWrapperRef = ref<HTMLPreElement>()
const setCode = async () => {
  if (!bodyRef.value) {
    return
  }
  try {
    if (props.language === 'markdown') {
      bodyRef.value.innerHTML = await parse(props.code)
    } else {
      bodyRef.value.innerHTML = hljs.highlight(props.code, { language: props.language }).value
    }
  } catch {
    bodyRef.value.innerText = props.code
  }
  collapsed.value = false
  nextTick()
    .then(setMaxHeight)
    .catch(() => {})
}
const setMaxHeight = () => {
  if (!bodyWrapperRef.value || !bodyRef.value) {
    return
  }
  bodyWrapperRef.value.setAttribute('style', `max-height: ${bodyRef.value.getBoundingClientRect().height}px;`)
}

onMounted(() => {
  setCode().catch(() => {})
  watch(props, setCode)
  window.addEventListener('resize', setMaxHeight)
})

onUnmounted(() => window.removeEventListener('resize', setMaxHeight))

// %% collapsed %%
const collapsed = ref(false)

// %% copy %%
const copyCode = () =>
  copyToClipboard(props.code)
    .then(() => notify('success', '复制成功'))
    .catch(() => notify('error', '复制失败'))
</script>

<!-- % template % -->
<template>
  <div :class="{ code: true, 'code--collapsed': collapsed }">
    <div class="header" @click="collapsed = !collapsed">
      <span class="copy" @click.stop="copyCode" />
      <span>
        {{ props.label }}
      </span>
    </div>
    <div ref="bodyWrapperRef" class="body__wrapper">
      <div v-if="language === 'markdown'" ref="bodyRef" class="body" />
      <pre v-else ref="bodyRef" class="body" />
    </div>
  </div>
</template>

<!-- % style % -->
<style lang="scss" scoped>
/* %% code %% */
.code {
  min-width: max-content;
  color: #fff;
  background-color: #1e1f26;
}

/* %% header %% */
.header {
  cursor: pointer;
  user-select: none;

  display: flex;
  align-items: center;

  height: 20px;

  font-size: 12px;
  line-height: 20px;

  background-color: #2c303b;
  box-shadow: 0 0 2px 0 #fff;
}

.copy {
  display: inline-block;

  width: 16px;
  height: 16px;
  margin-inline: 8px;

  border-radius: 50%;
  box-shadow: 0 0 8px 0 #74829a inset;

  &:hover {
    transform: scale(1.2);
  }
}

/* %% body %% */
.body {
  display: flow-root;
  margin: 0;
}

.body__wrapper {
  overflow: hidden;
  transition: max-height 0.5s;
}

.code--collapsed .body__wrapper {
  max-height: 0 !important;
}
</style>
