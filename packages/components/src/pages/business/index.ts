import doc from '@/components/business/README.md?raw'
import type { Page } from '@/router'

export default {
  name: 'business',
  category: 'api',
  docs: [
    {
      label: '文档',
      language: 'markdown',
      code: doc
    }
  ]
} satisfies Page
