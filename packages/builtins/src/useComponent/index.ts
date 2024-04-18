import type { Component } from 'vue'
import { ref, shallowRef } from 'vue'
import type { ComponentProps } from '../types'

export const useComponent = <T extends Component>(component: () => Promise<{ default: T }>) => {
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
