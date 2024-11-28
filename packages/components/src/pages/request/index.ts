import doc from '@/components/request/README.md?raw'
import type { Page } from '@/router'

export default {
  name: 'request',
  category: 'api',
  docs: [
    {
      label: '文档',
      language: 'markdown',
      code: doc
    }
  ]
} satisfies Page
