import doc from '@/components/concurrent/README.md?raw'
import source from '@/components/concurrent/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'concurrent',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '函数/性能优化',
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
  desc: '并发任务并限制最大并发数。'
} satisfies Page
