import source from '@/components/toStr.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'toStr',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '函数',
  tags: ['驾驶舱', '后台管理'],
  docs: [
    {
      label: '源码',
      language: 'typescript',
      code: source
    }
  ],
  desc: '将一个值序列化为字符串。'
} satisfies Page
