<!-- # script -->
<script setup lang="ts">
import type { InputConfig } from '@/components/xFormItem'
import { XFormItem, useFormData } from '@/components/xFormItem'

interface FormData {
  data?: string
}
const { getFormData, setFormData, onFormDataFieldChange } = useFormData<FormData>({
  data: 'initialData'
})
const formItemConfig: InputConfig = {
  itemType: 'input',
  getData: getFormData,
  setData: setFormData,
  onDataFieldChange: onFormDataFieldChange,
  dataKey: 'data',
  rules: [(value: string) => value]
}
</script>

<!-- # template -->
<template>
  <div class="x-form-item-page">
    <XFormItem v-bind="formItemConfig"></XFormItem>
  </div>
</template>
