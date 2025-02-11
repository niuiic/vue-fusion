import doc from '@/components/useEntityFactory/README.md?raw'
import source from '@/components/useEntityFactory/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'useEntityFactory',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '函数',
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
  desc: '实例化类，可选择性地修改成员。'
} satisfies Page
