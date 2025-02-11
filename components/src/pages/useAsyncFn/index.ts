import doc from '@/components/useAsyncFn/README.md?raw'
import source from '@/components/useAsyncFn/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'useAsyncFn',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '函数/模块化',
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
  desc: '动态加载函数。'
} satisfies Page
