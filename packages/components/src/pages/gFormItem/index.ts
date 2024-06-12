import source from '@/components/gFormItem/GFormItem.vue?raw'
import type { CodeProps } from '@/utils/code'
import GFormItem from './GFormItem.vue'
import example from './GFormItem.vue?raw'

export const page = GFormItem

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
