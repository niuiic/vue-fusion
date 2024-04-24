<!-- # script -->
<script setup lang="ts">
import type { AnyObject } from 'fx-flow'
import { defineAsyncComponent, onBeforeMount, ref } from 'vue'
import { nestedGetter } from './nonBusiness'

// ## 组件配置
defineOptions({
  inheritAttrs: true
})

interface Props {
  itemType: string
  getData: (setter?: [key: string, (value: unknown) => void]) => AnyObject
  setData: (key: string, value: any) => void
  dataKey: string
}
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
  data.value = nestedGetter(props.getData([props.dataKey, assignData]), props.dataKey)
})
const onUpdate = (value: unknown) => {
  props.setData(props.dataKey, value)
}

// ## 错误信息
const error = ref<string>()
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
