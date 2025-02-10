import doc from '@/components/request/README.md?raw'
import source from '@/components/request/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'request',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: 'api',
  tags: ['desktop', 'mobile'],
  docs: [
    {
      label: '文档',
      language: 'markdown',
      code: doc
    },
    {
      label: '源码',
      language: 'typescript',
      code: source
    }
  ],
  desc: '发送请求，完全兼容axios，增加缓存功能。'
} satisfies Page
