import { CompStatus, type Page } from '@/page'
import components from './components.md?raw'
import app from './app.md?raw'

export default {
  name: '框架',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: '文档',
  docs: [
    {
      label: '应用',
      language: 'markdown',
      code: app
    },
    {
      label: '组件库',
      language: 'markdown',
      code: components
    }
  ],
  desc: '框架功能及操作说明。'
} satisfies Page
