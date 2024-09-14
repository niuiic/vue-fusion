import doc from '@/components/service/README.md?raw'
import type { Page } from '@/router'

export default {
  name: 'service',
  category: 'api',
  docs: [
    {
      label: '文档',
      language: 'markdown',
      code: doc
    }
  ]
} satisfies Page
