<!-- # script -->
<script setup lang="ts">
import type { InputConfig } from '@/components/xFormItem'
import { XFormItem, formDataValid } from '@/components/xFormItem'
import { useObservable } from 'builtins'

interface FormData {
  data?: string
}
const { getData, setData, overrideData, onDataFieldChange } = useObservable<FormData>({})
setTimeout(() => overrideData({ data: 'initialData' }), 0)
const formItemConfig: InputConfig = {
  itemType: 'input',
  getData: getData,
  setData: setData,
  onDataFieldChange: onDataFieldChange,
  dataKey: 'data',
  rules: [(value: string) => (value.length > 10 ? '最大长度为10' : undefined)]
}
const onSubmit = async () => {
  if (!(await formDataValid(getData(), [formItemConfig]))) {
    alert('表单数据有误')
  }
}
</script>

<!-- # template -->
<template>
  <div class="x-form-item-page">
    <XFormItem v-bind="formItemConfig"></XFormItem>
    <button @click="onSubmit">submit</button>
  </div>
</template>
