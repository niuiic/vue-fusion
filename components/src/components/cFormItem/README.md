```typescript
defineOptions({ inheritAttrs: false })

const value = defineModel<any>()

interface Props {
  label?: string
  required?: boolean
  wrap?: boolean
  rules?: (() => Promise<string | true> | string | true)[]
  showError?: boolean
  component?: string | AsyncComponentLoader
  componentProps?: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), { showError: true })
```

若指定component，则slot变为该表单组件的slot。

若不指定component，也应该设置`v-model`以触发表单校验。
