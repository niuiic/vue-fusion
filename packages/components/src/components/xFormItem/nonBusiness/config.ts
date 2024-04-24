import type { ComponentProps } from 'builtins'
import type { ElInput } from 'element-plus'
import type { AnyObject } from 'fx-flow'

export type InputConfig = {
  itemType: 'input'
  getData: (...args: any[]) => AnyObject
  setData: (...args: any[]) => void
  dataKey: string
} & Omit<ComponentProps<typeof ElInput>, 'modelValue' | 'onUpdate:modelValue'>

export type FormItemConfig = InputConfig
