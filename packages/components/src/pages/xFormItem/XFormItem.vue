<!-- # script -->
<script setup lang="ts">
import type { InputConfig } from '@/components/xFormItem'
import { XFormItem, useFormData } from '@/components/xFormItem'
import { ref } from 'vue'

interface FormData {
  data?: string
}
const [getFormData, setFormData, onFormDataChange] = useFormData<FormData>({
  data: 'initialData'
})
const formItemConfig: InputConfig = {
  itemType: 'input',
  getData: getFormData,
  setData: setFormData,
  dataKey: 'data'
}
const info = ref('')
onFormDataChange((key, value, prevValue) => {
  info.value = JSON.stringify({ key, value, prevValue })
})
</script>

<!-- # template -->
<template>
  <div class="x-form-item-page">
    <XFormItem v-bind="formItemConfig"></XFormItem>
    {{ info }}
  </div>
</template>
