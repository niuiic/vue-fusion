<!-- # script -->
<script setup lang="ts">
import hljs from 'highlight.js'
import { onMounted, ref, watch } from 'vue'
import type { CodeProps } from './nonBusiness'
import { notify } from 'builtins'

// ## 组件配置
const props = defineProps<CodeProps>()

// ## code
const bodyRef = ref<HTMLPreElement>()
const bodyWrapperRef = ref<HTMLPreElement>()
const setCode = () => {
  if (!bodyRef.value) {
    return
  }
  try {
    bodyRef.value.innerHTML = hljs.highlight(props.code, { language: props.language }).value
  } catch {
    bodyRef.value.innerText = props.code
  }
  setTimeout(() => {
    if (!bodyWrapperRef.value || !bodyRef.value) {
      return
    }
    bodyWrapperRef.value.setAttribute('style', `max-height: ${bodyRef.value.getBoundingClientRect().height}px;`)
  }, 100)
  collapsed.value = false
}

onMounted(() => {
  setCode()
  watch(props, setCode)
})

// ## collapsed
const collapsed = ref(false)

// ## copy
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    notify('success', '复制成功')
  } catch {
    notify('error', '复制失败')
  }
}
</script>

<!-- # template -->
<template>
  <div :class="{ code: true, 'code--collapsed': collapsed }">
    <div class="header" @click="collapsed = !collapsed">
      <span class="copy" @click.stop="copyCode">复制</span>
      <span>
        {{ props.label }}
      </span>
    </div>
    <div ref="bodyWrapperRef" class="body__wrapper">
      <pre ref="bodyRef" class="body"></pre>
    </div>
  </div>
</template>

<!-- # style -->
<style lang="scss" scoped>
/* ## code */
.code {
  min-width: max-content;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);
}

/* ## header */
.header {
  height: 24px;
  font-size: 16px;
  border-bottom: 1px solid black;
  cursor: pointer;
  user-select: none;
  line-height: 24px;

  &::before {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: black;
    border-radius: 50%;
    content: '';
    margin-inline: 8px;
  }
}

.copy {
  display: inline-block;
  margin-right: 8px;
  opacity: 0.5;

  &:hover {
    transform: scale(1.2);
  }
}

/* ## body */
.body {
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
