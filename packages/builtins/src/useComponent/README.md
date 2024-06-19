# useAsyncTask

## 用法

延迟执行异步任务。

```typescript
const fn = () => import('xxx')
const [task, start] = useAsyncTask(fn)

// 等同于fn.then
task.then(console.log)
// fn不会执行，直到调用start
start()
```
