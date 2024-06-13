import type { ComponentProps } from '@/types'
import type { Component, Ref, ShallowRef } from 'vue'
import { ref, shallowRef } from 'vue'

export const useComponent = <T extends Component>(
  component: () => Promise<{ default: T }>
): [
  dynComp: ShallowRef<T | undefined>,
  render: (props: ComponentProps<T>) => void,
  destory: () => void,
  compProps: Ref<ComponentProps<T> | undefined>
] => {
  const dynComp = shallowRef<T>()
  const compProps = ref<ComponentProps<T>>()

  const render = (props: ComponentProps<T>) => {
    compProps.value = props
    component().then((x) => (dynComp.value = x.default))
  }
  const destory = () => {
    dynComp.value = undefined
    compProps.value = undefined
  }

  return [dynComp, render, destory, compProps]
}
