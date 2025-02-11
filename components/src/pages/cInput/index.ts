import source from '@/components/cInput/CInput.vue?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'cInput',
  component: () => import('./CInputPage.vue'),
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
  desc: '同el-input。'
} as Page
