import doc from '@/components/request/README.md?raw'
import source from '@/components/request/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'request',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '函数/请求',
  tags: ['驾驶舱', '后台管理'],
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
