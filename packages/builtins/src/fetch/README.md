# fetch

## 用法

1. 引入包。

`package.json`

```json
{
  "dependencies": {
    "fetch": "workspace:*",
    "result": "workspace:*"
  }
}
```

2. 使用以下函数发起不同类型的请求。

```typescript
import { Fetch } from 'fetch'

Fetch.get()
Fetch.post()
Fetch.put()
Fetch.delete()
Fetch.patch()
```

参数与axios对应的方法保持一致。

3. 内设接口超时时间为10秒，要设置其他全局参数直接在`axios`全局实例上修改即可。
