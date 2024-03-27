import { shallowRef, type Component } from 'vue'

export const useComponent = <T extends Component>(component: () => Promise<{ default: T }>) => {
  const dynComp = shallowRef<T>()
  const compProps = shallowRef<ComponentProps<T>>()

  const render = (props?: ComponentProps<T>) => {
    if (props) {
      compProps.value = props
    }
    component().then((x) => (dynComp.value = x.default))
  }
  const destory = () => (dynComp.value = undefined)

  return [dynComp, compProps, render, destory]
}
