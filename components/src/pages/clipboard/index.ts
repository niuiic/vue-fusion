import source from '@/components/clipboard.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'clipboard',
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
  desc: '复制文本到剪贴板。'
} satisfies Page
