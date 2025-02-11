import source from '@/components/cFormItem/CFormItem.vue?raw'
import components from '@/components/cFormItem/components.ts?raw'
import doc from '@/components/cFormItem/README.md?raw'
import example from './CFormItemPage.vue?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'cFormItem',
  component: () => import('./CFormItemPage.vue'),
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '组件/表单',
  tags: ['desktop'],
  docs: [
    {
      label: '文档',
      language: 'markdown',
      code: doc
    },
    {
      label: '内置表单组件',
      language: 'typescript',
      code: components
    },
    {
      label: '示例',
      language: 'vue',
      code: example
    },
    {
      label: '源码',
      language: 'vue',
      code: source
    }
  ],
  desc: '通用表单项，可容纳任意表单组件。'
} as Page
