<!-- % script % -->
<script setup lang="ts">
import { ref } from 'vue'
import { CFormItem } from '@/components/cFormItem'
import { ElInput } from 'element-plus'

const formData = ref({ name: '', age: 0 })
const formItems = {
  name: {
    label: '名称',
    required: true,
    wrap: true,
    rules: [() => (formData.value.name ? true : '请输入名称')],
    showError: true,
    component: () => import('element-plus/es/components/input/index'),
    componentProps: {
      placeholder: '请输入名称'
    }
  },
  age: {
    label: '年龄',
    required: true,
    wrap: true,
    rules: [() => (formData.value.age > 10 ? true : '年龄应该大于10')],
    showError: true
  }
}
</script>

<!-- % template % -->
<template>
  <div class="c-form-item-page">
    <p>通过component属性设置表单组件，此时form item的slot为该组件的slot。</p>
    <CFormItem v-bind="formItems.name" v-model="formData.name" />
    <p>通过slot设置表单组件，适用于一个form item对应多个表单组件的情况。</p>
    <CFormItem v-bind="formItems.age" v-model="formData.age">
      <ElInput v-model="formData.age" type="number" placeholder="请输入年龄" />
    </CFormItem>
  </div>
</template>

<!-- % style % -->
<style lang="scss" scoped>
.c-form-item-page {
  height: 100%;
  background-color: #fff;
}
</style>
