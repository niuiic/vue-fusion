import source from '@/components/time.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'time',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '函数',
  tags: ['desktop', 'mobile'],
  docs: [
    {
      label: '源码',
      language: 'typescript',
      code: source
    }
  ],
  desc: '格式化时间。'
} satisfies Page
