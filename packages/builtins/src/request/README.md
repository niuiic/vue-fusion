# request

## 用法

使用以下方式发起请求。

```typescript
import { Request } from 'builtins'

const request = new Request({ timeout: 10000 })
request.get()
request.post()
request.rawGet()
request.rawPost()
```

一般情况下全局存在一个`request`变量即可。
