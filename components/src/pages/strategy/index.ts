import doc from '@/components/strategy/README.md?raw'
import source from '@/components/strategy/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'strategy',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '函数/代码优化',
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
  desc: '策略模式。'
} satisfies Page
