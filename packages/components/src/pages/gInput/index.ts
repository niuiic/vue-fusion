import source from '@/components/gInput/GInput.vue?raw'
import type { CodeProps } from '@/utils/code'
import example from './GInput.vue?raw'

export const page = () => import('./GInput.vue')

export const codeList: CodeProps[] = [
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
