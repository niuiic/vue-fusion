import doc from '@/components/router/README.md?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'router',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '函数/路由',
  tags: ['驾驶舱', '后台管理'],
  docs: [
    {
      label: '文档',
      language: 'markdown',
      code: doc
    }
  ],
  desc: '路由管理。'
} as Page
