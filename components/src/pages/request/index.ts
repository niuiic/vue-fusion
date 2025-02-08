import doc from '@/components/request/README.md?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'request',
  component: () => import('./Request.vue'),
  status: [CompStatus.Approved, CompStatus.Deprecated],
  author: 'nsc',
  auditor: 'nsc',
  category: 'api',
  tags: ['api'],
  docs: [
    {
      label: '文档',
      language: 'markdown',
      code: doc
    }
  ],
  desc: '发送请求，完全兼容axios，增加缓存功能。'
} satisfies Page
