import source from '@/components/isNil.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'isNil',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '函数/代码优化',
  tags: ['驾驶舱', '后台管理'],
  docs: [
    {
      label: '源码',
      language: 'typescript',
      code: source
    }
  ],
  desc: '判断一个值是否为null或undefined。'
} as Page
