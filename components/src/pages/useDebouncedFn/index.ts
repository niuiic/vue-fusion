import source from '@/components/useDebouncedFn.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'useDebouncedFn',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: 'api',
  tags: ['desktop', 'mobile'],
  docs: [
    {
      label: '源码',
      language: 'typescript',
      code: source
    }
  ],
  desc: '将函数转换为防抖函数。'
} as Page
