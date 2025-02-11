<!-- % script % -->
<script setup lang="ts">
import type { AsyncComponentLoader } from 'vue'
import { computed, defineAsyncComponent, h, ref, watch } from 'vue'
import { builtinComponents } from './components'
import { assert } from '../assert'
import { DelayTime, useDebouncedFn } from '../useDebouncedFn'

// %% 组件配置 %%
defineOptions({ inheritAttrs: false })

const value = defineModel<any>()

interface Props {
  label?: string
  required?: boolean
  wrap?: boolean
  rules?: (() => Promise<string | true> | string | true)[]
  showError?: boolean
  component?: string | AsyncComponentLoader
  componentProps?: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), { showError: true })

// %% 表单组件 %%
const formComponent = computed(() => {
  if (!props.component) {
    return
  }

  if (typeof props.component === 'string') {
    const component = builtinComponents[props.component as keyof typeof builtinComponents]
    assert(component, `component ${props.component} not found`)

    return defineAsyncComponent(component)
  }

  return defineAsyncComponent(props.component)
})

// %% 校验 %%
const error = ref()
const validate = async () => {
  if (!props.showError || !props.rules) {
    return
  }

  for (const rule of props.rules) {
    let res: any
    try {
      res = await rule()
    } catch {
      res = '未知错误'
    }
    if (typeof res === 'string') {
      error.value = res
      return
    }
  }

  error.value = undefined
}
const debouncedValidate = useDebouncedFn(validate, DelayTime.Input)
watch(value, debouncedValidate, { deep: true })
</script>

<!-- % template % -->
<template>
  <div
    :class="{
      'c-form-item': true,
      'c-form-item--required': required,
      'c-form-item--wrap': wrap
    }"
  >
    <div v-if="label" class="label">{{ label }}</div>
    <template v-if="component">
      <component :is="h(formComponent, componentProps, $slots)" v-model="value" class="form-component" />
    </template>
    <slot v-else />
    <div v-if="showError && error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<!-- % style % -->
<style lang="scss" scoped>
// %% form item %%
.c-form-item {
  display: grid;
  grid-template-columns: fit-content(8em) 1fr;
  gap: 4px 12px;
}

.c-form-item--wrap {
  grid-template-columns: 1fr;
}

// %% label %%
.label {
  line-height: 32px;
  color: #666;
  white-space: nowrap;
}

.label::before {
  content: '*';
  margin-right: 2px;
  color: transparent;
}

.c-form-item--required .label::before {
  color: red;
}

.c-form-item--wrap:not(.c-form-item--required) .label::before {
  display: none;
}

.c-form-item--wrap .label {
  line-height: 24px;
}

// %% component %%
.component {
  width: 100%;
}

// %% error %%
.error {
  grid-column: 2 / 3;
  height: 24px;
  line-height: 24px;
  color: red;
}

.c-form-item--wrap .error {
  grid-column: unset;
}
</style>
