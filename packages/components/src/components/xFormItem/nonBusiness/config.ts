import type { ComponentProps } from 'builtins'
import type { ElInput } from 'element-plus'
import type { AnyObject } from 'fx-flow'

export interface CommonConfig {
  getData: (...args: any[]) => AnyObject
  setData: (...args: any[]) => void
  dataKey: string
  rules?: ((data: AnyObject) => boolean | Promise<boolean>)[]
  validateOn?: 'change' | 'manually'
}

export type InputConfig = {
  itemType: 'input'
} & CommonConfig &
  Omit<ComponentProps<typeof ElInput>, 'modelValue' | 'onUpdate:modelValue'>

export type FormItemConfig = InputConfig
