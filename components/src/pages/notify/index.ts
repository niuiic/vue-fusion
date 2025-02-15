import source from '@/components/notify.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'notify',
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
  desc: '发送通知。'
} satisfies Page
