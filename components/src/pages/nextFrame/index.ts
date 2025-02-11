import doc from '@/components/nextFrame/README.md?raw'
import source from '@/components/nextFrame/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'nextFrame',
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
  desc: '等待下一帧再执行任务。'
} as Page
