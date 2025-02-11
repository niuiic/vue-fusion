```typescript
const queryXApi = () => Promise.resolve(1)
const queryYApi = () => Promise.reject(1)
const queryZApi = () => Promise.resolve(1)

// 并发发送请求，并限制最多同时执行两个，防止后端卡顿
// queryYApi被rejected，则concurrent会throw error
const [result1, result2, result3] = await concurrent([queryXApi, queryYApi, queryZApi], 2)
```
