<!-- # script -->
<script setup lang="ts">
import type { InputConfig } from '@/components/xFormItem'
import { XFormItem, formDataValid, useFormData } from '@/components/xFormItem'

interface FormData {
  data?: string
}
const { getFormData, setFormData, overrideFormData, onFormDataFieldChange } = useFormData<FormData>({})
setTimeout(() => overrideFormData({ data: 'initialData' }), 0)
const formItemConfig: InputConfig = {
  itemType: 'input',
  getData: getFormData,
  setData: setFormData,
  onDataFieldChange: onFormDataFieldChange,
  dataKey: 'data',
  rules: [(value: string) => (value.length > 10 ? '最大长度为10' : undefined)]
}
const onSubmit = async () => {
  if (!(await formDataValid(getFormData(), [formItemConfig]))) {
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
