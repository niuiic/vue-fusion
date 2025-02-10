# strategy

```typescript
const sayHello = useStrategies({
  // 每个策略必须具有相同的类型
  // 策略1
  hello: (data: string) => console.log(data),
  // 策略2
  world: (data: string) => console.log(data)
})
sayHello('hello')

const sayHello2 = useStrategies([
  // 每个策略必须具有相同的类型
  strategy(
    // 若该条件成立，则执行
    (data: string) => data === 'hello',
    (data: string) => console.log(data)
  ),
  strategy(
    (data: string) => data === 'world',
    (data: string) => console.log(data)
  )
])
sayHello2('hello')
```
