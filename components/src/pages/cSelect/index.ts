import source from '@/components/cSelect/CSelect.vue?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'cSelect',
  component: () => import('./CSelectPage.vue'),
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
  desc: '同el-select。'
} as Page