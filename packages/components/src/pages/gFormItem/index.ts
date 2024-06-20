import source from '@/components/gFormItem/GFormItem.vue?raw'
import doc from '@/components/gFormItem/README.md?raw'
import type { CodeProps } from '@/utils/code'
import example from './GFormItem.vue?raw'

export const page = () => import('./GFormItem.vue')

export const codeList: CodeProps[] = [
  {
    code: doc,
    language: 'markdown',
    label: '文档'
  },
  {
    code: example,
    language: 'vue',
    label: '使用示例'
  },
  {
    code: source,
    language: 'vue',
    label: '源码'
  }
]
