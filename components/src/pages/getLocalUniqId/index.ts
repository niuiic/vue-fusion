import source from '@/components/getLocalUniqId.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'getLocalUniqId',
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
  desc: '获取本机范围内的唯一id。'
} as Page
