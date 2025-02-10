import doc from '@/components/useData/README.md?raw'
import source from '@/components/useData/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'useData',
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
  desc: '快速实现组件内数据加载。'
} satisfies Page
