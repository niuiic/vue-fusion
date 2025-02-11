import source from '@/components/cInputNumber/CInputNumber.vue?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'cInputNumber',
  component: () => import('./CInputNumberPage.vue'),
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '组件/表单',
  tags: ['驾驶舱'],
  docs: [
    {
      label: '源码',
      language: 'vue',
      code: source
    }
  ],
  desc: '同el-input-number。'
} as Page