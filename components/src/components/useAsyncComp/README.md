# useAsyncComp

- 在vue app处注册插件。

```typescript
import { asyncCompRenderer } from 'components'

const app = createApp(App).use(asyncCompRenderer)
```

- 使用示例

```typescript
const mount = useAsyncComp(
  // 指定要使用的组件
  () => import('../code/Code.vue'),
  // 指定组件挂载点
  () => document.getElementById('code')
)
// 挂载组件
mount(
  // 第一个参数需返回组件的props
  // unmount: 卸载组件
  // getVNode: 获取组件vnode，可调用defineExpose导出的方法
  // update: 更新组件
  ({ unmount, getVNode, update }) => ({
    code: 'console.log("hello")',
    language: 'javascript',
    label: 'hello'
  }),
  // 第二个参数可选，可返回子组件
  // type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any)
  () => 'div'
).catch(() => {})
```

- 类型定义

```typescript
function useAsyncComp<T extends Component>(
  loadComponent: () => Promise<{
    default: T
  }>,
  getContainer?: () => HTMLElement | undefined | null
): MountFn<T>

type MountFn<T> = (getProps: GetProps<T>, getChildren?: GetChildren<T>) => Promise<void>

type GetProps<T> = ({
  unmount,
  getVNode,
  update
}: {
  unmount: () => Promise<unknown>
  getVNode: () => VNode
  update: MountFn<T>
}) => ComponentProps<T>

type GetChildren<T> = ({
  unmount,
  getVNode,
  update
}: {
  unmount: () => Promise<unknown>
  getVNode: () => VNode
  update: MountFn<T>
}) => RawChildren

type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any)
```
