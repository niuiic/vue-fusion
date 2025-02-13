import doc from '@/components/emitter/README.md?raw'
import source from '@/components/emitter/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'emitter',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '函数/模块化',
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
  desc: '以消息通信的形式在模块间交换信息。'
} satisfies Page
