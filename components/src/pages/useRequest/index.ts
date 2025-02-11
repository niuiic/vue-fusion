import doc from '@/components/useRequest/README.md?raw'
import source from '@/components/useRequest/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'useRequest',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '函数/请求',
  tags: ['驾驶舱', '后台管理'],
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
  desc: '转换数据查询函数为vue数据结构。'
} satisfies Page
