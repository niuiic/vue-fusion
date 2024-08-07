import type { AnyObject, ComponentProps, MaybePromise } from 'builtins'
import type { ElInput } from 'element-plus'

export interface CommonConfig {
  getData: () => AnyObject
  setData: (...args: any[]) => void
  onDataFieldChange: (key: string, handler: (value: any, prevValue: any) => void) => void
  dataKey: string
  rules?: ((value: any, formData: AnyObject) => MaybePromise<string | undefined>)[]
  /** 默认为true */
  showErr?: boolean
}

export type InputConfig = {
  itemType: 'input'
} & CommonConfig &
  Omit<ComponentProps<typeof ElInput>, 'modelValue' | 'onUpdate:modelValue'>

export type FormItemConfig = InputConfig
