<!-- # script -->
<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref } from 'vue'
import { logErr, nestedGet, toStr } from 'builtins'
import type { CommonConfig } from './nonBusiness'

// ## 组件配置
defineOptions({
  inheritAttrs: true
})

type Props = {
  itemType: string
} & CommonConfig
const props = withDefaults(defineProps<Props>(), {
  showErr: true
})

// ## 表单项组件
const comp = defineAsyncComponent(() => {
  switch (props.itemType) {
    case 'input': {
      return import('../gInput/GInput.vue')
    }
    default:
      throw new Error(`GFormItem: nothing matched for the type ${props.itemType}`)
  }
})

// ## 数据
const data = ref<any>()
const assignData = (value: unknown) => (data.value = value)
onBeforeMount(() => {
  props.onDataFieldChange(props.dataKey, assignData)
  Promise.resolve(nestedGet(props.getData(), props.dataKey))
    .then((x) => (data.value = x))
    .catch((e) => logErr('GFormItem:', e))
})
const onUpdate = (value: unknown) => {
  props.setData(props.dataKey, value)
}

// ## 校验
const error = ref<string>()
onBeforeMount(() => {
  props.onDataFieldChange(props.dataKey, async (value) => {
    if (!props.rules) {
      return
    }

    let finish = false
    for (const rule of props.rules) {
      const fn = async () => rule(value, props.getData())
      await fn()
        .catch((e) => `校验函数执行出错: ${toStr(e)}`)
        .then((x) => {
          if (x === undefined) {
            return
          }
          finish = true
          if (error.value !== x) {
            error.value = x
          }
        })

      if (finish) {
        return
      }
    }

    error.value = undefined
  })
})
</script>

<!-- # template -->
<template>
  <div :class="{ 'g-form-item': true, 'g-form-item--no-error': props.showErr !== false && error === undefined }">
    <component :is="comp" v-bind="$attrs" :model-value="data" @update:model-value="onUpdate"></component>
    <span v-if="props.showErr !== false && error !== undefined" class="error">{{ error }}</span>
  </div>
</template>

<!-- # style -->
<style lang="scss" scoped>
.g-form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.g-form-item--no-error {
  margin-bottom: 24px;
}

.error {
  line-height: 20px;
  font-size: 14px;
  color: red;
}
</style>
