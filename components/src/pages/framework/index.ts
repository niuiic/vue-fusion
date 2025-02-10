import { CompStatus, type Page } from '@/page'
import components from './components.md?raw'

export default {
  name: '框架',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: 'doc',
  docs: [
    {
      label: '组件',
      language: 'markdown',
      code: components
    }
  ],
  desc: '框架功能及操作说明。'
} satisfies Page
