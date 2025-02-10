import doc from '@/components/useAsyncFn/README.md?raw'
import source from '@/components/useAsyncFn/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'useAsyncFn',
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
  desc: '动态加载函数。'
} satisfies Page
