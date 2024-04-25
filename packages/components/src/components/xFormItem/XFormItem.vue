<!-- # script -->
<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref } from 'vue'
import { nestedGet } from 'builtins'
import type { CommonConfig } from './nonBusiness'
import { toStr } from 'fx-flow'

// ## 组件配置
defineOptions({
  inheritAttrs: true
})

type Props = {
  itemType: string
} & CommonConfig
const props = defineProps<Props>()

// ## 表单项组件
const comp = defineAsyncComponent(() => {
  switch (props.itemType) {
    case 'input': {
      return import('../xInput/XInput.vue')
    }
    default:
      throw new Error(`nothing matched for the type ${props.itemType}`)
  }
})

// ## 数据
const data = ref<any>()
const assignData = (value: unknown) => (data.value = value)
onBeforeMount(() => {
  data.value = nestedGet(props.getData([props.dataKey, assignData]), props.dataKey)
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
  <div class="x-form-item">
    <component :is="comp" v-bind="$attrs" :model-value="data" @update:model-value="onUpdate"></component>
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<!-- # style -->
<style lang="scss" scoped>
.x-form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.error {
  color: red;
}
</style>
