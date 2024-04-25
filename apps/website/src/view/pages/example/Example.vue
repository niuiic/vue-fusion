<!-- # script -->
<script setup lang="ts">
import type { InputConfig } from 'components'
import { formDataValid } from 'components'
import { notify, useObservable } from 'builtins'
import { onBeforeMount } from 'vue'
import { ok, andThen, errThen, flow, toTry } from 'fx-flow'
import { queryUserBiz, updateUserBiz } from '@/business/impl/user'

// ## 表单数据
interface FormData {
  name: string
}
const { getData, setData, overrideData, onDataFieldChange } = useObservable<Partial<FormData>>({})
onBeforeMount(() => {
  flow(ok({ id: '1' }), andThen(queryUserBiz), andThen(toTry((args) => overrideData(args))), errThen(notify('error')))
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

  flow(
    ok({
      id: '1',
      ...getData()
    }),
    andThen(updateUserBiz),
    errThen(notify('error')),
    andThen(toTry(() => notify('success', '用户信息更新成功')))
  )
}
</script>

<!-- # template -->
<template>
  <div class="example">
    <h1>这是一个简单的修改用户名称的案例</h1>
    <x-form-item v-bind="formItemConfig"></x-form-item>
    <button @click="onSubmit">提交</button>
  </div>
</template>
