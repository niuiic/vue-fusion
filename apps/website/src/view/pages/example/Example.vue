<!-- # script -->
<script setup lang="ts">
import type { InputConfig } from 'components'
import { formDataValid } from 'components'
import { notify, useObservable } from 'builtins'
import { onBeforeMount } from 'vue'
import { queryUserBiz, updateUserBiz } from '@/business/impl/user'
import { GFormItem } from 'components'

// ## 表单数据
interface FormData {
  name: string
}
const { getData, setData, overrideData, onDataFieldChange } = useObservable<Partial<FormData>>({})
onBeforeMount(async () => {
  const res = await queryUserBiz({ id: '0' })
  if (res.ok) {
    overrideData(res.data)
  } else {
    notify('error', res.err)
  }
})

// ## 表单配置
const formItemConfig: InputConfig = {
  itemType: 'input',
  getData,
  setData,
  onDataFieldChange,
  dataKey: 'name',
  rules: [(value: string) => (value.length < 10 ? '最小长度为10' : undefined)]
}

// ## 提交表单
const onSubmit = async () => {
  if (!(await formDataValid(getData(), [formItemConfig]))) {
    notify('error', '表单数据有误')
    return
  }

  const res = await updateUserBiz({
    id: '1',
    ...(getData() as FormData)
  })
  if (res.ok) {
    notify('success', '用户信息更新成功')
  } else {
    notify('error', res.err)
  }
}
</script>

<!-- # template -->
<template>
  <div class="example">
    <h1>这是一个简单的修改用户名称的案例</h1>
    <GFormItem v-bind="formItemConfig"></GFormItem>
    <button @click="onSubmit">提交</button>
  </div>
</template>
