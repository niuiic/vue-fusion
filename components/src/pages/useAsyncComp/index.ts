import doc from '@/components/useAsyncComp/README.md?raw'
import source from '@/components/useAsyncComp/index.ts?raw'
import { CompStatus, type Page } from '@/page'

export default {
  name: 'useAsyncComp',
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
  desc: '动态渲染组件，将组件转换为命令式函数。'
} satisfies Page
