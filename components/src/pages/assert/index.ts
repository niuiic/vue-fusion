import source from '@/components/assert.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'assert',
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
  desc: '确认某个值为truthy。'
} satisfies Page
