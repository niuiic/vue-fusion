import source from '@/components/id.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'id',
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
  desc: '获取本机范围内的唯一id。'
} as Page
